import { ID, Query } from 'appwrite';
import { databases, appwriteConfig, client } from './config';

export interface Message {
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  receiverId: string;
  content: string;
  attachments?: string[];
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessageContent: string;
  lastMessageTime: string;
  unreadCount: number;
}

export class ChatService {
  /**
   * Get or create a conversation between two users
   * @param userId1 First user's ID
   * @param userId2 Second user's ID
   * @returns The conversation object
   */
  async getOrCreateConversation(userId1: string, userId2: string) {
    try {
      // Always sort user IDs to ensure consistent conversation IDs
      const sortedUserIds = [userId1, userId2].sort();
      
      // Check if a conversation already exists
      const existingConversations = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.messageCollectionId,
        [
          Query.equal('participants', [sortedUserIds[0], sortedUserIds[1]])
        ]
      );
      
      if (existingConversations.documents.length > 0) {
        return existingConversations.documents[0];
      }
      
      // Create a new conversation
      const newConversation = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.messageCollectionId,
        ID.unique(),
        {
          participants: sortedUserIds,
          lastMessageContent: '',
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0,
          createdAt: new Date().toISOString()
        }
      );
      
      return newConversation;
    } catch (error) {
      console.error("Error getting/creating conversation:", error);
      throw error;
    }
  }

  /**
   * Send a message to a user
   * @param message The message data to send
   * @returns The created message object
   */
  async sendMessage(message: Omit<Message, 'timestamp' | 'read'>) {
    try {
      // Get or create conversation
      const conversation = await this.getOrCreateConversation(
        message.senderId,
        message.receiverId
      );
      
      // Create the message
      const newMessage = await databases.createDocument(
        appwriteConfig.databaseId,
        'messages', // Sub-collection for individual messages
        ID.unique(),
        {
          ...message,
          conversationId: conversation.$id,
          timestamp: new Date().toISOString(),
          read: false
        }
      );
      
      // Update the conversation with last message info
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.messageCollectionId,
        conversation.$id,
        {
          lastMessageContent: message.content.substring(0, 50) + (message.content.length > 50 ? '...' : ''),
          lastMessageTime: new Date().toISOString(),
          unreadCount: conversation.unreadCount + 1
        }
      );
      
      return newMessage;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  /**
   * Get all messages in a conversation
   * @param conversationId The conversation ID
   * @param limit Number of messages to return
   * @param offset Pagination offset
   * @returns List of messages in the conversation
   */
  async getMessages(conversationId: string, limit: number = 50, offset: number = 0) {
    try {
      const messages = await databases.listDocuments(
        appwriteConfig.databaseId,
        'messages',
        [
          Query.equal('conversationId', conversationId),
          Query.orderDesc('timestamp'),
          Query.limit(limit),
          Query.offset(offset)
        ]
      );
      
      return messages.documents.reverse(); // Return in chronological order
    } catch (error) {
      console.error("Error getting messages:", error);
      throw error;
    }
  }

  /**
   * Get all conversations for a user
   * @param userId The user's ID
   * @returns List of conversations the user is part of
   */
  async getUserConversations(userId: string) {
    try {
      const conversations = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.messageCollectionId,
        [
          Query.search('participants', userId),
          Query.orderDesc('lastMessageTime')
        ]
      );
      
      return conversations.documents;
    } catch (error) {
      console.error("Error getting user conversations:", error);
      throw error;
    }
  }

  /**
   * Mark all messages in a conversation as read
   * @param conversationId The conversation ID
   * @param userId The ID of the user marking as read
   * @returns Status of the operation
   */
  async markConversationAsRead(conversationId: string, userId: string) {
    try {
      // Get all unread messages sent to this user
      const unreadMessages = await databases.listDocuments(
        appwriteConfig.databaseId,
        'messages',
        [
          Query.equal('conversationId', conversationId),
          Query.equal('receiverId', userId),
          Query.equal('read', false)
        ]
      );
      
      // Mark each message as read
      const updatePromises = unreadMessages.documents.map(message => 
        databases.updateDocument(
          appwriteConfig.databaseId,
          'messages',
          message.$id,
          { read: true }
        )
      );
      
      await Promise.all(updatePromises);
      
      // Reset unread count in conversation
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.messageCollectionId,
        conversationId,
        { unreadCount: 0 }
      );
      
      return { status: 'success', message: 'Conversation marked as read' };
    } catch (error) {
      console.error("Error marking conversation as read:", error);
      throw error;
    }
  }

  /**
   * Subscribe to real-time updates for a specific conversation
   * @param conversationId The conversation to subscribe to
   * @param callback Function to call when new messages arrive
   * @returns Unsubscribe function
   */
  subscribeToConversation(conversationId: string, callback: (message: any) => void) {
    try {
      const unsubscribe = client.subscribe(
        `databases.${appwriteConfig.databaseId}.collections.messages.documents`,
        (response) => {
          // Filter events for this conversation
          if (response.payload.conversationId === conversationId) {
            callback(response.payload);
          }
        }
      );
      
      return unsubscribe;
    } catch (error) {
      console.error("Error subscribing to conversation:", error);
      throw error;
    }
  }

  /**
   * Subscribe to typing indicators for a conversation
   * @param conversationId The conversation to watch
   * @param callback Function to call when typing status changes
   * @returns Unsubscribe function
   */
  subscribeToTypingIndicators(conversationId: string, callback: (data: any) => void) {
    try {
      const channelId = `typing-${conversationId}`;
      
      const unsubscribe = client.subscribe(
        channelId,
        (response) => {
          callback(response.payload);
        }
      );
      
      return unsubscribe;
    } catch (error) {
      console.error("Error subscribing to typing indicators:", error);
      throw error;
    }
  }

  /**
   * Send typing indicator for a conversation
   * @param conversationId The conversation ID
   * @param userId User who is typing
   * @param isTyping Whether the user is currently typing
   */
  async sendTypingIndicator(conversationId: string, userId: string, isTyping: boolean) {
    try {
      const channelId = `typing-${conversationId}`;
      
      // Use Appwrite Functions to broadcast the typing status
      // This would require creating a serverless function in Appwrite
      // For now, we'll just outline the functionality
      
      return { status: 'success' };
    } catch (error) {
      console.error("Error sending typing indicator:", error);
      throw error;
    }
  }
} 
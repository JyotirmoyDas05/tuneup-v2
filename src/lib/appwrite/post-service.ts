import { ID, Query } from 'appwrite';
import { databases, appwriteConfig, storage } from './config';

export interface EventPost {
  title: string;
  description: string;
  eventDate: string;
  location: string;
  genre: string[];
  requirements: string;
  budget?: string;
  organizerId: string;
  organizerName: string;
  images?: string[];
  status: 'open' | 'filled' | 'cancelled';
}

export interface Application {
  eventId: string;
  musicianId: string;
  musicianName: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
}

export interface SocialPost {
  userId: string;
  userName: string;
  userImage?: string;
  content: string;
  images?: string[];
  video?: string;
  audio?: string;
  tags?: string[];
  likes: number;
  comments: number;
  createdAt: string;
}

export class PostService {
  // Create a new event post
  async createEvent(eventData: EventPost) {
    try {
      const newEvent = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.eventCollectionId,
        ID.unique(),
        {
          ...eventData,
          status: 'open',
          createdAt: new Date().toISOString(),
          applications: 0
        }
      );
      
      return newEvent;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  }

  // Get all events with pagination
  async getEvents(limit: number = 10, offset: number = 0, filters?: { [key: string]: string | string[] }) {
    try {
      let queries = [
        // Sort by creation date descending
        Query.orderDesc('createdAt'),
        // Limit results
        Query.limit(limit),
        // Offset for pagination
        Query.offset(offset)
      ];
      
      // Add filters if provided
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            queries.push(Query.any(key, value));
          } else {
            queries.push(Query.equal(key, value));
          }
        });
      }
      
      const events = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.eventCollectionId,
        queries
      );
      
      return events.documents;
    } catch (error) {
      console.error("Error getting events:", error);
      throw error;
    }
  }

  // Get event by ID
  async getEventById(eventId: string) {
    try {
      const event = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.eventCollectionId,
        eventId
      );
      
      return event;
    } catch (error) {
      console.error("Error getting event:", error);
      throw error;
    }
  }
  
  // Get events by organizer ID
  async getEventsByOrganizer(organizerId: string) {
    try {
      const events = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.eventCollectionId,
        [
          Query.equal('organizerId', organizerId),
          Query.orderDesc('createdAt')
        ]
      );
      
      return events.documents;
    } catch (error) {
      console.error("Error getting organizer events:", error);
      throw error;
    }
  }
  
  // Update event details
  async updateEvent(eventId: string, eventData: Partial<EventPost>) {
    try {
      const updatedEvent = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.eventCollectionId,
        eventId,
        eventData
      );
      
      return updatedEvent;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  }
  
  // Delete event
  async deleteEvent(eventId: string) {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.eventCollectionId,
        eventId
      );
      
      return { status: 'success', message: 'Event deleted successfully' };
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  }
  
  // Apply to an event
  async applyToEvent(application: Application) {
    try {
      // Create application document
      const newApplication = await databases.createDocument(
        appwriteConfig.databaseId,
        'applications', // Assuming this collection exists or will be created
        ID.unique(),
        {
          ...application,
          status: 'pending',
          date: new Date().toISOString()
        }
      );
      
      // Increment application count in event
      const event = await this.getEventById(application.eventId);
      await this.updateEvent(application.eventId, {
        applications: (event.applications || 0) + 1
      });
      
      return newApplication;
    } catch (error) {
      console.error("Error applying to event:", error);
      throw error;
    }
  }
  
  // Create social post
  async createSocialPost(postData: Omit<SocialPost, 'likes' | 'comments'>) {
    try {
      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        ID.unique(),
        {
          ...postData,
          likes: 0,
          comments: 0,
          createdAt: new Date().toISOString()
        }
      );
      
      return newPost;
    } catch (error) {
      console.error("Error creating social post:", error);
      throw error;
    }
  }
  
  // Get social feed
  async getSocialFeed(limit: number = 20, offset: number = 0) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [
          Query.orderDesc('createdAt'),
          Query.limit(limit),
          Query.offset(offset)
        ]
      );
      
      return posts.documents;
    } catch (error) {
      console.error("Error getting social feed:", error);
      throw error;
    }
  }
  
  // Like a post
  async likePost(postId: string, userId: string) {
    try {
      // Check if user already liked the post
      const likeCheck = await databases.listDocuments(
        appwriteConfig.databaseId,
        'post_likes', // Assuming this collection exists or will be created
        [
          Query.equal('postId', postId),
          Query.equal('userId', userId)
        ]
      );
      
      if (likeCheck.documents.length > 0) {
        return { status: 'error', message: 'Post already liked by this user' };
      }
      
      // Create like record
      await databases.createDocument(
        appwriteConfig.databaseId,
        'post_likes',
        ID.unique(),
        {
          postId,
          userId,
          createdAt: new Date().toISOString()
        }
      );
      
      // Get post and increment like count
      const post = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId
      );
      
      // Update post like count
      const updatedPost = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId,
        {
          likes: (post.likes || 0) + 1
        }
      );
      
      return updatedPost;
    } catch (error) {
      console.error("Error liking post:", error);
      throw error;
    }
  }
} 
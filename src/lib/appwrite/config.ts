import { Client, Account, Databases, Storage, Functions, Avatars } from 'appwrite';

// Initialize the Appwrite client
export const client = new Client();

// Set the endpoint and project ID
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // Your Appwrite API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Your Appwrite Project ID

// Export service instances
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
export const avatars = new Avatars(client);

// Database and collection IDs
export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID as string,
  eventCollectionId: process.env.NEXT_PUBLIC_APPWRITE_EVENT_COLLECTION_ID as string,
  postCollectionId: process.env.NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID as string,
  messageCollectionId: process.env.NEXT_PUBLIC_APPWRITE_MESSAGE_COLLECTION_ID as string,
  
  // Storage bucket IDs
  storage: {
    profileImages: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_PROFILE_IMAGES as string,
    eventImages: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_EVENT_IMAGES as string,
    postMedia: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_POST_MEDIA as string,
    chatAttachments: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_CHAT_ATTACHMENTS as string,
  }
}; 
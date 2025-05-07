import { ID, Models } from 'appwrite';
import { account, appwriteConfig, databases } from './config';

export type UserType = 'musician' | 'band' | 'studio' | 'cafe' | 'organizer';

export interface NewUser {
  email: string;
  password: string;
  name: string;
  userType?: UserType;
  location?: string;
  bio?: string;
  genres?: string[];
  socialLinks?: {
    website?: string;
    instagram?: string;
    twitter?: string;
    spotify?: string;
    youtube?: string;
  };
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface UpdateUserData {
  name?: string;
  userType?: UserType;
  location?: string;
  bio?: string;
  genres?: string[];
  socialLinks?: {
    website?: string;
    instagram?: string;
    twitter?: string;
    spotify?: string;
    youtube?: string;
  };
  availability?: {
    days?: string[];
    times?: string[];
  };
  profileImage?: string;
}

export class AuthService {
  // Create a new user account
  async createAccount(user: NewUser) {
    try {
      // Create account in Appwrite Auth
      const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      );

      // If account creation successful, create user profile document
      if (newAccount.$id) {
        // Create user profile with additional information
        const newUser = await this.createUserProfile({
          accountId: newAccount.$id,
          email: user.email,
          name: user.name,
          userType: user.userType || 'musician',
          location: user.location || '',
          bio: user.bio || '',
          genres: user.genres || [],
          socialLinks: user.socialLinks || {},
        });
        
        return newUser;
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  // Create user profile in database
  async createUserProfile(userData: any) {
    try {
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        userData
      );
      
      return newUser;
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }

  // Sign in user
  async login(user: LoginUser) {
    try {
      const session = await account.createEmailSession(
        user.email,
        user.password
      );
      
      return session;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }

  // Sign out user
  async logout() {
    try {
      const session = await account.deleteSession('current');
      return session;
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const currentAccount = await account.get();
      
      if (!currentAccount) throw Error;
      
      // Get user profile from database
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [
          // Query to find user document by accountId
          databases.queries.equal('accountId', currentAccount.$id)
        ]
      );
      
      if (!currentUser.documents.length) {
        throw Error;
      }
      
      return {
        account: currentAccount,
        profile: currentUser.documents[0],
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(userId: string, userData: UpdateUserData) {
    try {
      const updatedUser = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        userId,
        userData
      );
      
      return updatedUser;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  // OAuth signin (Google)
  async signInWithGoogle() {
    try {
      const session = await account.createOAuth2Session(
        'google',
        `${window.location.origin}/profile`,
        `${window.location.origin}/login`
      );
      
      return session;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  }

  // OAuth signin (GitHub)
  async signInWithGitHub() {
    try {
      const session = await account.createOAuth2Session(
        'github',
        `${window.location.origin}/profile`,
        `${window.location.origin}/login`
      );
      
      return session;
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      throw error;
    }
  }
} 
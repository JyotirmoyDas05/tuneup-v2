// Export all services and configuration
export * from './config';
export { AuthService } from './auth-service';
export { PostService } from './post-service';
export { StorageService } from './storage-service';
export { ChatService } from './chat-service';

// Initialize services for easy import
import { AuthService } from './auth-service';
import { PostService } from './post-service';
import { StorageService } from './storage-service';
import { ChatService } from './chat-service';

// Create instances of all services
export const authService = new AuthService();
export const postService = new PostService();
export const storageService = new StorageService();
export const chatService = new ChatService(); 
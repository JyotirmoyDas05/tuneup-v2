import { ID, Models } from 'appwrite';
import { storage, appwriteConfig } from './config';

export type FileUploadResponse = {
  fileId: string;
  fileUrl: string;
  uploadedFile: Models.File;
};

export type ImagePreview = {
  fileId: string;
  originalUrl: string;
  thumbnailUrl?: string;
  previewUrl?: string;
};

export class StorageService {
  /**
   * Upload a file to a specific storage bucket
   * @param file - The file to upload
   * @param bucketId - The ID of the storage bucket
   * @param customId - Optional custom file ID
   * @returns The file details including ID and URL
   */
  private async uploadToBucket(file: File, bucketId: string, customId?: string): Promise<FileUploadResponse> {
    try {
      // Generate unique file ID if not provided
      const fileId = customId || ID.unique();
      
      // Upload file to storage
      const uploadedFile = await storage.createFile(
        bucketId,
        fileId,
        file
      );
      
      // Get file preview URL
      const fileUrl = this.getFilePreview(bucketId, fileId);
      
      return {
        fileId,
        fileUrl,
        uploadedFile
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  /**
   * Upload a profile image with optimized previews
   * @param file - The profile image file
   * @param userId - User ID for custom file naming
   * @returns The profile image details with various sizes
   */
  async uploadProfileImage(file: File, userId: string): Promise<ImagePreview> {
    try {
      const customId = `profile_${userId}_${ID.unique()}`;
      const result = await this.uploadToBucket(file, appwriteConfig.storage.profileImages, customId);
      
      return {
        fileId: result.fileId,
        originalUrl: this.getFilePreview(appwriteConfig.storage.profileImages, result.fileId),
        thumbnailUrl: this.getFilePreview(appwriteConfig.storage.profileImages, result.fileId, 150, 150),
        previewUrl: this.getFilePreview(appwriteConfig.storage.profileImages, result.fileId, 500, 500)
      };
    } catch (error) {
      console.error("Error uploading profile image:", error);
      throw error;
    }
  }

  /**
   * Upload event images with optimized previews
   * @param files - Array of image files
   * @param eventId - Event ID for organization
   * @returns Array of image details
   */
  async uploadEventImages(files: File[], eventId: string): Promise<ImagePreview[]> {
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const customId = `event_${eventId}_${ID.unique()}`;
        const result = await this.uploadToBucket(file, appwriteConfig.storage.eventImages, customId);
        
        return {
          fileId: result.fileId,
          originalUrl: this.getFilePreview(appwriteConfig.storage.eventImages, result.fileId),
          thumbnailUrl: this.getFilePreview(appwriteConfig.storage.eventImages, result.fileId, 300, 200),
          previewUrl: this.getFilePreview(appwriteConfig.storage.eventImages, result.fileId, 800, 600)
        };
      });
      
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading event images:", error);
      throw error;
    }
  }

  /**
   * Upload media files for social posts
   * @param files - Array of media files (images, videos, audio)
   * @param postId - Post ID for organization
   * @returns Array of media file details
   */
  async uploadPostMedia(files: File[], postId: string): Promise<FileUploadResponse[]> {
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const customId = `post_${postId}_${ID.unique()}`;
        return await this.uploadToBucket(file, appwriteConfig.storage.postMedia, customId);
      });
      
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading post media:", error);
      throw error;
    }
  }

  /**
   * Upload chat attachments
   * @param files - Array of attachment files
   * @param chatId - Chat/Conversation ID
   * @returns Array of attachment details
   */
  async uploadChatAttachments(files: File[], chatId: string): Promise<FileUploadResponse[]> {
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const customId = `chat_${chatId}_${ID.unique()}`;
        return await this.uploadToBucket(file, appwriteConfig.storage.chatAttachments, customId);
      });
      
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading chat attachments:", error);
      throw error;
    }
  }

  /**
   * Get file preview URL
   * For images, you can pass width and height to get a resized preview
   */
  getFilePreview(bucketId: string, fileId: string, width?: number, height?: number): string {
    try {
      // For images that need resizing
      if (width && height) {
        return storage.getFilePreview(
          bucketId,
          fileId
        ).toString() + `?width=${width}&height=${height}`;
      }
      
      // For original file preview
      return storage.getFilePreview(
        bucketId,
        fileId
      ).toString();
    } catch (error) {
      console.error("Error getting file preview:", error);
      throw error;
    }
  }

  /**
   * Delete a file from any storage bucket
   * @param bucketId - The bucket ID where the file is stored
   * @param fileId - The ID of the file to delete
   * @returns Success status
   */
  async deleteFile(bucketId: string, fileId: string) {
    try {
      await storage.deleteFile(bucketId, fileId);
      return { status: 'success', message: 'File deleted successfully' };
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  /**
   * Get list of files from a specific bucket
   * @param bucketId - The bucket to list files from
   * @param limit - Number of files to return
   * @param offset - Pagination offset
   * @returns List of files in the bucket
   */
  async listFiles(bucketId: string, limit: number = 10, offset: number = 0) {
    try {
      const files = await storage.listFiles(
        bucketId,
        undefined, // No queries needed
        limit,
        offset
      );
      
      return files;
    } catch (error) {
      console.error("Error listing files:", error);
      throw error;
    }
  }
} 
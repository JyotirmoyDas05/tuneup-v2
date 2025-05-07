# Appwrite Integration for TuneUP

This directory contains all the necessary services and configurations to integrate Appwrite into the TuneUP application.

## Setup Instructions

### 1. Create an Appwrite Account and Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/) and sign up for an account
2. Create a new project for TuneUP
3. Note your Project ID from the project dashboard

### 2. Set Up Database

1. In your Appwrite project, go to Databases and create a new database
2. Note your Database ID
3. Create the following collections in your database:

#### User Collection Setup
To set up the `users` collection in Appwrite, follow these steps:

1. Log in to your Appwrite account and navigate to the Databases section.
2. Click on the "Create Collection" button and enter `users` as the collection name.
3. Define the attributes as follows:
   - `accountId`: A required string attribute that is indexed for faster queries. To set this as an index, click on the "Add Index" button next to the attribute and select "Text" as the index type.
   - `email`: A required string attribute that is indexed for faster queries. To set this as an index, click on the "Add Index" button next to the attribute and select "Text" as the index type.
   - `name`: A required string attribute for the user's name.
   - `userType`: A required string attribute that specifies the user's type (musician, band, studio, cafe, organizer).
   - `location`: An optional string attribute for the user's location.
   - `bio`: An optional string attribute for the user's bio.
   - `genres`: An optional array attribute using the **string** type (Appwrite's "Text" attribute) for musical genres. Enable the "array" option when creating the attribute.
   - `socialLinks`: An optional **object** attribute that will store nested social media information. In Appwrite's database system, objects are created by defining nested attributes:
     1. **Create the socialLinks parent attribute**:
        - Attribute ID: `socialLinks`
        - Type: **string** (Appwrite will automatically store nested structures as JSON strings)
        - Size: 1000 (to accommodate longer JSON strings)
        - Required: No
        - Array: No
        
     2. **Create individual social platform attributes** (Appwrite will treat these as nested properties):
        - `website`:
          - Type: **url** (validates proper URL format)
          - Required: No
          - Default: None
          - Index: No
        - `instagram`:
          - Type: **url** 
          - Required: No
          - Example Value: `https://www.instagram.com/username/`
          - Index: No
        - `twitter`:
          - Type: **url**
          - Required: No
          - Example Value: `https://twitter.com/username`
          - Index: No
        - `spotify`:
          - Type: **url**
          - Required: No
          - Example Value: `https://open.spotify.com/artist/artistid`
          - Index: No
        - `youtube`:
          - Type: **url**
          - Required: No
          - Example Value: `https://www.youtube.com/@channelname`
          - Index: No

     **Important Appwrite Notes**:
     - The object structure will be stored as a JSON string in the document
     - When querying, use dot notation: `socialLinks.website`
     - URL type ensures proper validation of all social media links
     - For searchability, consider creating a separate string attribute for handles if needed
     - Appwrite will automatically validate URL formats on write operations

     **Example of how data will be stored**:
     ```json
     "socialLinks": {
       "website": "https://artistwebsite.com",
       "instagram": "https://instagram.com/artisthandle",
       "spotify": "https://open.spotify.com/artist/123456"
     }
     ```

     **Pro Tip**: If you want to store both URLs and handles separately:
     1. Create a `socialHandles` object attribute
     2. Add string attributes for each platform handle (e.g., `instagramHandle`)
     3. Use the URL fields for validation and the handle fields for display
   - `profileImage`: A string attribute for storing the user's profile image ID.
4. Save the collection to apply the changes.

For more detailed instructions on setting up collections in Appwrite, refer to the [Appwrite documentation](https://appwrite.io/docs/databases).

#### Event Collection
- Create a collection called `events` with:
  - `title` (string) - Required
  - `description` (string) - Required
  - `eventDate` (string) - Required
  - `location` (string) - Required
  - `genre` (string[]) - Required array
  - `requirements` (string) - Required
  - `budget` (string) - Optional
  - `organizerId` (string) - Required, indexed
  - `organizerName` (string) - Required
  - `images` (string[]) - Optional array for image IDs
  - `status` (string) - Required (open, filled, cancelled)
  - `applications` (number) - Required
  - `createdAt` (string) - Required

#### Post Collection (Social Media Posts)
**Purpose**: Store user-generated content similar to social media posts  
**Collection Name**: `posts`

| Attribute    | Type       | Required | Indexed | Description & Appwrite Notes                                                                 |
|--------------|------------|----------|---------|---------------------------------------------------------------------------------------------|
| `userId`     | string     | Yes      | Yes     | **Index Reason**: Frequent queries for "all posts by user". Appwrite indexes support equality queries and sorting.         |
| `userName`   | string     | Yes      | No      | Display name for immediate rendering without user lookup. Stored denormalized for performance.             |
| `userImage`  | string     | No       | No      | Profile image ID from Storage. Can be null if user hasn't uploaded an image.                              |
| `content`    | string     | Yes      | No      | Text content (280 character limit recommended). Consider full-text search index if needed.                |
| `images`     | string[]   | No       | No      | Array of Storage image IDs. Appwrite handles arrays natively - max 100,000 elements.                      |
| `video`      | string     | No       | No      | Single video file ID from Storage. Use separate attribute for clear type distinction.                     |
| `audio`      | string     | No       | No      | Audio file ID for voice notes/podcast-style posts. Store duration separately if needed.                   |
| `tags`       | string[]   | No       | No      | Hashtags/categories. For search, consider a search index instead of array queries.                        |
| `likes`      | number     | Yes      | No      | Counter updated with Appwrite's `increment()` function for atomic updates.                                |
| `comments`   | number     | Yes      | No      | Track comment count separately for performance. Actual comments stored in different collection.           |
| `createdAt`  | string     | Yes      | Yes     | **Index Reason**: Sort posts chronologically. Use ISO date strings. Index allows descending sort queries. |

**Indexing Strategy**:
- `userId` index: Key (ASC), Type: Key
- `createdAt` index: Key (DESC), Type: Key
- Max 3 indexes used (under Appwrite's 1000 index limit)
- No full-text search indexes shown here (add separately if needed)

**Example Query Patterns**:
1. Get latest posts: `database.listDocuments(..., orderDesc: 'createdAt')`
2. Get user's posts: `database.listDocuments(..., filters: ['userId={USER_ID}'])`

#### Message Collections (Chat System)

##### Conversations Collection
**Purpose**: Track active chat threads between users  
**Collection Name**: `conversations`

| Attribute             | Type       | Required | Indexed | Appwrite-specific Considerations                                                                 |
|-----------------------|------------|----------|---------|--------------------------------------------------------------------------------------------------|
| `participants`        | string[]   | Yes      | Yes     | **Index Reason**: Find conversations by participant. Appwrite array indexes allow membership queries. |
| `lastMessageContent`  | string     | Yes      | No      | Preview text - keep under 150 chars. Not indexed as content search isn't needed.                           |
| `lastMessageTime`     | string     | Yes      | Yes     | **Index Reason**: Sort conversations by recent activity. Use ISO format.                                  |
| `unreadCount`         | number     | Yes      | No      | Updated atomically with `increment()/decrement()`. Reset to 0 on conversation open.                       |
| `createdAt`           | string     | Yes      | No      | Initial conversation timestamp. Not indexed as we use lastMessageTime for sorting.                        |

##### Messages Collection
**Purpose**: Store individual chat messages  
**Collection Name**: `messages`

| Attribute         | Type       | Required | Indexed | Appwrite Implementation Notes                                                 |
|-------------------|------------|----------|---------|-------------------------------------------------------------------------------|
| `conversationId`  | string     | Yes      | Yes     | **Index Reason**: Primary query path. All messages fetched by conversation.   |
| `senderId`        | string     | Yes      | Yes     | **Index Reason**: Potential "messages from user" queries.                     |
| `senderName`      | string     | Yes      | No      | Denormalized for display without user lookup.                                 |
| `senderAvatar`    | string     | No       | No      | Optional avatar override (uses Storage ID)                                    |
| `receiverId`      | string     | Yes      | Yes     | **Index Reason**: Combined with timestamp for message history queries.        |
| `content`         | string     | Yes      | No      | Actual message text. Consider encryption for sensitive data.                  |
| `attachments`     | string[]   | No       | No      | Array of Storage IDs. Limit file types based on Storage bucket configuration. |
| `timestamp`       | string     | Yes      | Yes     | **Index Reason**: Message ordering. Use ISO format for reliable sorting.      |
| `read`            | boolean    | Yes      | No      | Update using `patchDocument()` when message is viewed.                        |

**Indexing Strategy**:
- Composite indexes not needed - Appwrite automatically optimizes single-field indexes
- Each indexed field counts toward the 1000 index limit per collection
- Timestamp indexes use DESC order for "newest first" default sorting

**Appwrite Query Examples**:
```javascript
// Get conversation messages
database.listDocuments('messages', [
  Query.equal('conversationId', 'CONVERSATION123'),
  Query.orderDesc('timestamp')
]);

// Check unread conversations
database.listDocuments('conversations', [
  Query.greaterThan('unreadCount', 0),
  Query.orderDesc('lastMessageTime')
]);
```

**Key Appwrite Limitations to Note**:
1. Indexed array fields (like participants) only support "contains" queries
2. Boolean fields can't be indexed - use 1/0 integers if needing to index read status
3. Each index entry counts toward document storage size
4. Indexes take ~1 minute to become active after creation

### 3. Set Up Storage

1. In your Appwrite project, the following storage buckets have been created:

#### Profile Images Bucket (`profile_images`)
- **Purpose**: Store user profile pictures
- **Max File Size**: 10MB
- **Allowed Extensions**: .jpg, .jpeg, .png, .gif
- **Security Features**: 
  - Encryption: Enabled
  - Antivirus: Enabled
  - File Security: Enabled
- **Permissions**:
  - `read("users")`: Only authenticated users can view
  - `create("users")`: Only authenticated users can upload
  - `update("users")`: Only authenticated users can update
  - `delete("users")`: Only authenticated users can delete

#### Event Images Bucket (`event_images`)
- **Purpose**: Store event-related images
- **Max File Size**: 10MB
- **Allowed Extensions**: .jpg, .jpeg, .png, .gif
- **Security Features**:
  - Encryption: Enabled
  - Antivirus: Enabled
  - File Security: Enabled
- **Permissions**:
  - `read("any")`: Public read access
  - `create("users")`: Only authenticated users can upload
  - `update("users")`: Only authenticated users can update
  - `delete("users")`: Only authenticated users can delete

#### Post Media Bucket (`post_media`)
- **Purpose**: Store social media post content (images, audio, video)
- **Max File Size**: 30MB
- **Allowed Extensions**: .jpg, .jpeg, .png, .gif, .mp3, .wav, .mp4, .mov
- **Security Features**:
  - Encryption: Enabled
  - Antivirus: Enabled
  - File Security: Enabled
- **Permissions**:
  - `read("any")`: Public read access
  - `create("users")`: Only authenticated users can upload
  - `update("users")`: Only authenticated users can update
  - `delete("users")`: Only authenticated users can delete

#### Chat Attachments Bucket (`chat_attachments`)
- **Purpose**: Store chat message attachments
- **Max File Size**: 10MB
- **Allowed Extensions**: .jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .mp3
- **Security Features**:
  - Encryption: Enabled
  - Antivirus: Enabled
  - File Security: Enabled
- **Permissions**:
  - `read("users")`: Only authenticated users can view
  - `create("users")`: Only authenticated users can upload
  - `update("users")`: Only authenticated users can update
  - `delete("users")`: Only authenticated users can delete

### File Security Notes
1. Individual file permissions can be set using the `fileSecurity` feature
2. For files above 20MB:
   - Antivirus scanning is skipped
   - Encryption is skipped
   - Compression is skipped
3. Use the StorageService class methods to handle file operations with proper error handling

### Usage Example
```typescript
import { storageService } from '@/lib/appwrite';

// Upload profile image
const uploadProfileImage = async (file: File) => {
  try {
    const result = await storageService.uploadProfileImage(file, 'user123');
    console.log('Profile image uploaded:', result);
  } catch (error) {
    console.error('Error uploading profile image:', error);
  }
};

// Upload event image
const uploadEventImage = async (file: File, eventId: string) => {
  try {
    const result = await storageService.uploadFile(file, `events/${eventId}`);
    console.log('Event image uploaded:', result);
  } catch (error) {
    console.error('Error uploading event image:', error);
  }
};
```

### 4. Configure Authentication

1. In your Appwrite project, go to Auth
2. Enable Email/Password authentication
3. Set up OAuth providers (optional but recommended):
   - Google
4. Configure redirect URLs for your application (e.g., http://localhost:3000/auth/callback for development)

### 5. Set Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID=your_user_collection_id
NEXT_PUBLIC_APPWRITE_EVENT_COLLECTION_ID=your_event_collection_id
NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID=your_post_collection_id
NEXT_PUBLIC_APPWRITE_MESSAGE_COLLECTION_ID=your_message_collection_id
NEXT_PUBLIC_APPWRITE_STORAGE_PROFILE_IMAGES=your_profile_images
NEXT_PUBLIC_APPWRITE_STORAGE_EVENT_IMAGES=your_event_images
NEXT_PUBLIC_APPWRITE_STORAGE_POST_MEDIA=your_post_media
NEXT_PUBLIC_APPWRITE_STORAGE_CHAT_ATTACHMENTS=your_chat_attachments
```

Replace all the `your_*` values with the actual IDs from your Appwrite project.

## Available Services

- `AuthService`: Handles user authentication, registration, and profile management
- `PostService`: Manages events, social posts, and applications
- `StorageService`: Handles file uploads and retrievals
- `ChatService`: Manages real-time messaging between users

## Usage Example

```typescript
import { authService, postService, storageService, chatService } from '@/lib/appwrite';

// Authentication
const createUser = async () => {
  const newUser = await authService.createAccount({
    email: 'user@example.com',
    password: 'securePassword123',
    name: 'John Doe',
    userType: 'musician'
  });
  console.log('User created:', newUser);
};

// File upload
const uploadProfileImage = async (file) => {
  const userId = 'current-user-id';
  const result = await storageService.uploadProfileImage(file, userId);
  console.log('Image uploaded:', result);
};

// Create event
const createNewEvent = async () => {
  const event = await postService.createEvent({
    title: 'Jazz Night',
    description: 'Looking for jazz musicians for a cafe event',
    eventDate: '2023-10-15',
    location: 'New York',
    genre: ['jazz', 'blues'],
    requirements: 'Experience with live performances',
    organizerId: 'current-user-id',
    organizerName: 'Blue Note Cafe',
    status: 'open'
  });
  console.log('Event created:', event);
};
``` 
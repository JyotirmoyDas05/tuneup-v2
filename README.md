# TuneUp V2
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/JyotirmoyDas05/tuneup-v2)

TuneUP is a dual-purpose web platform designed for musicians and music organizers. It functions as a marketplace for hiring musical talent (singers, instrumentalists, bands, etc.) while incorporating social media features for networking and collaboration in the music industry.

## Features

*   **User Profiles**: Dedicated profiles for Musicians, Bands, Studios, Cafés, and Organizers with bios, media portfolios, reviews, and social links.
*   **Posting & Hiring System**: Organizers can create listings for talent, and musicians can apply or book events. Includes application chat and status updates.
*   **Social Feed**: Users can post updates, photos, videos, and engage with content through likes, comments, and reposts.
*   **Discovery & Filtering**: Advanced search and filtering options by genre, city, instruments, availability, etc.
*   **Real-time Chat System**: Integrated chat for seamless communication between users.
*   **OAuth Integration**: Secure sign-in with Google and GitHub.
*   **Responsive Design**: Modern UI with dynamic animations for an engaging user experience.

## Tech Stack

*   **Frontend**:
    *   Next.js 15 (with App Router)
    *   React 19
    *   TypeScript
    *   Tailwind CSS
    *   Shadcn UI & Park UI
    *   GSAP (GreenSock Animation Platform) for animations
    *   Framer Motion
*   **Backend & Storage**:
    *   Appwrite (Cloud or Self-Hosted)
        *   Appwrite Auth for authentication
        *   Appwrite Databases for data storage
        *   Appwrite Storage for file management
        *   Appwrite Functions for serverless logic (potential)
        *   Appwrite Realtime for live updates
*   **Deployment**: Vercel (recommended, based on project files)

## Prerequisites

Before you begin, ensure you have the following installed:
*   Node.js (v18 or higher recommended)
*   npm (v9 or higher) or yarn
*   An Appwrite project (Cloud or self-hosted).

## Appwrite Setup

To run this project, you need to set up an Appwrite backend. Follow these general steps (refer to `src/lib/appwrite/README.md` in this repository for detailed instructions):

1.  **Create Appwrite Project**:
    *   Sign up or log in to your Appwrite console.
    *   Create a new project. Note the Project ID.

2.  **Set Up Databases**:
    *   Create a new database in your Appwrite project. Note the Database ID.
    *   Create the following collections with the specified attributes (see `src/lib/appwrite/README.md` for attribute details):
        *   `users`: For user profiles.
        *   `events`: For event listings.
        *   `posts`: For social media-like posts.
        *   `conversations`: For chat conversation metadata.
        *   `messages`: For individual chat messages.
        *   `(Optional)` `applications`: For event applications.
        *   `(Optional)` `post_likes`: For tracking post likes.

3.  **Set Up Storage**:
    *   Create the following storage buckets:
        *   `profile_images`: For user profile pictures.
        *   `event_images`: For event-related images.
        *   `post_media`: For social media post content (images, audio, video).
        *   `chat_attachments`: For chat message attachments.
    *   Configure permissions for each bucket as detailed in `src/lib/appwrite/README.md`.

4.  **Configure Authentication**:
    *   Enable Email/Password authentication.
    *   (Optional) Set up OAuth providers like Google and GitHub.
    *   Configure valid client-side redirect URLs for your application (e.g., `http://localhost:3000` for development, and your production domain for success/failure OAuth redirects).

## Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables, replacing the placeholder values with your actual Appwrite project details:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1 # Or your self-hosted endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id

NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID=users_collection_id
NEXT_PUBLIC_APPWRITE_EVENT_COLLECTION_ID=events_collection_id
NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID=posts_collection_id
NEXT_PUBLIC_APPWRITE_MESSAGE_COLLECTION_ID=conversations_collection_id # (or your chosen name for conversation metadata)
# Add other collection IDs if you named them differently or created more, e.g., for individual messages if 'messages' collection is separate

# Storage Bucket IDs
NEXT_PUBLIC_APPWRITE_STORAGE_PROFILE_IMAGES=profile_images_bucket_id
NEXT_PUBLIC_APPWRITE_STORAGE_EVENT_IMAGES=event_images_bucket_id
NEXT_PUBLIC_APPWRITE_STORAGE_POST_MEDIA=post_media_bucket_id
NEXT_PUBLIC_APPWRITE_STORAGE_CHAT_ATTACHMENTS=chat_attachments_bucket_id
```

## Installation & Running the App

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/jyotirmoydas05/tuneup-v2.git
    cd tuneup-v2
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    The application will be available at `http://localhost:3000`.

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts a production server (after building).
*   `npm run lint`: Lints the codebase using ESLint.

## Project Structure

```
tuneup-v2/
├── public/                   # Static assets (images, fonts)
├── src/
│   ├── app/                  # Next.js App Router (pages, layouts, route handlers)
│   ├── components/           # Reusable UI components (Shadcn, Park UI, custom)
│   ├── contexts/             # React Context API providers (e.g., AuthContext)
│   ├── hooks/                # Custom React Hooks
│   ├── lib/                  # Core libraries, utilities, Appwrite services
│   │   ├── animation/        # GSAP animation utilities
│   │   └── appwrite/         # Appwrite SDK configuration and service classes
│   ├── sections/             # Larger, page-specific sections/components
│   └── services/             # (Potentially older client-side service definitions)
├── memory-bank/              # Project context and planning documents
├── .env.local.example        # Example environment variables (rename to .env.local)
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies and scripts
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

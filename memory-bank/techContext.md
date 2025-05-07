# TuneUP - Technical Context

## Technology Stack

### Frontend
- **Framework**: React 18 with Next.js 15
- **Styling**: Tailwind CSS with ShadCN UI components
- **Animations**: GSAP (GreenSock Animation Platform)
  - ScrollTrigger for scroll-based animations
  - SmoothScroll for enhanced scrolling experience
- **Deployment**: Vercel

### Backend
- **Platform**: Appwrite Pro Plan
- **Services Used**:
  - Appwrite Auth SDK for authentication
  - Appwrite Collections for database
  - Appwrite Storage for media files
  - Appwrite Functions for serverless tasks
  - Appwrite Realtime API for live updates
  - Appwrite CDN for image transformations

## Development Setup
- TypeScript for type-safe code
- ESLint for code quality
- Next.js app router for routing
- Vercel for CI/CD pipeline

## Technical Constraints
- Must maintain compatibility with Appwrite's APIs and services
- Animations should be performant on both mobile and desktop devices
- Media files should utilize Appwrite's built-in CDN and transformation capabilities
- Static UI components should remain unchanged unless explicitly approved

## Dependencies
- React 18+
- Next.js 15
- Tailwind CSS
- ShadCN UI
- GSAP with ScrollTrigger and SmoothScroll plugins
- Appwrite SDK

## Performance Considerations
- Optimize GSAP animations for smooth performance
- Implement proper image loading and optimization
- Ensure responsive design across device sizes
- Consider code splitting for better initial load times

## Security Implementation
- OAuth via Google, GitHub using Appwrite Auth
- JWT-based access control
- Rate limiting via Appwrite Functions
- Role-based permissions (musician, organizer, admin) 
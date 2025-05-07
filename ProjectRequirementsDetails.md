# TuneUP – Project Requirements Document (PRD)

## 🧾 Project Summary
**TuneUP** is a dual-purpose web platform for musicians and music organizers. It acts as a marketplace (for hiring talent like singers, instrumentalists, bands, etc.) and also includes social media-like features for networking and collaboration.

---

## 🛠 Tech Stack

- **Frontend**: React 18 with Next.js 15, Tailwind CSS, ShadCN UI
- **Backend & Storage**: [Appwrite Pro Plan](https://appwrite.io/)
- **Media Management**: Appwrite Storage with built-in image transformation
- **Deployment**: Vercel
- **Animations & UI Dynamics**: GSAP (`ScrollTrigger`, `SmoothScroll`)
- **Media Delivery**: Appwrite CDN

---

## 🎯 Project Goals

1. Provide a unified platform for musicians and organizers to connect and transact.
2. Combine marketplace features with social media interactivity.
3. Deliver a smooth, visually engaging user experience via animations and responsive UI.
4. Make the backend secure, scalable, and developer-friendly with Appwrite.

---

## ✅ Immediate Priorities (Sprint 1)

### 🔥 1. Animation Integration using GSAP (Priority)
- Integrate **GSAP ScrollTrigger** and **SmoothScroll** features into the landing page.
- Reference **Context7 MCP documentation** for optimized animation logic.
- Goals:
  - Animate hero sections, text blocks, and SVG assets on scroll.
  - Implement parallax and fade-in effects.
  - Maintain performance on both mobile and desktop.

### ⚠️ Note:
> Existing **landing page and static UI sections are complete and should NOT be modified unless explicitly requested.**

---

## 🗃 Functional Modules

### 🧑‍🎤 2. User Profiles
- User types: Musician, Band, Studio, Café, Organizer
- Public profile pages with:
  - Bio, media portfolio (audio/video/images), tags
  - Reviews, ratings, performance history
  - Social Links

### 📢 3. Posting & Hiring System
- Organizers can create listings/events requiring talent.
- Musicians can apply/book events.
- Includes application chat, status updates, calendar integration.

### 🧭 4. Social Feed
- Post music updates, photos, videos
- Like, comment, repost (basic Twitter-like feed)
- Follow/unfollow logic
- Moderation tools (report/block)

### 🔎 5. Discovery & Filtering
- Filters by genre, city, instruments, availability
- Search with fuzzy matching (Appwrite’s Functions or client logic)

### 💬 6. Chat System
- Real-time chat (Appwrite Realtime API)
- Typing indicators, unread messages
- Potential future integration with WebRTC (video calls)

---

## 🔐 Authentication & Security

- OAuth via Google, GitHub (Appwrite Auth)
- JWT-based access control
- Rate limiting via Appwrite Functions
- Role-based permissions (musician, organizer, admin)

---

## 💾 Appwrite Usage Overview

| Feature                  | Implementation                             |
|--------------------------|---------------------------------------------|
| Auth                     | Appwrite Auth SDK                          |
| Database                 | Appwrite Collections (relational modeling) |
| File Storage             | Appwrite Storage                           |
| Functions                | Serverless tasks (notifications, moderation)|
| Realtime/Subscription    | Appwrite Realtime API                      |
| Image Transformations    | Appwrite's built-in CDN                    |

---

## 📦 Deployment

- CI/CD via Vercel

---

## 🗓 Roadmap Highlights

### Phase 1 – Static + Animated UI (Current)
- Finalize GSAP animations on landing
- Integrate GSAP ScrollTrigger across all scroll-based elements
- Test responsiveness & performance

### Phase 2 – Core Feature Backend
- Configure Appwrite backend with collections and roles
- Connect Auth and Database APIs
- Upload & display media files from Appwrite Storage

### Phase 3 – Social + Marketplace Integration
- Enable posting, hiring, and chat
- Launch MVP social feed and discoverability

---

## 🚧 Future Considerations

- Analytics dashboard for musicians (views, engagement)
- Admin panel with moderation tools
- AI-based artist recommendations
- Mobile PWA version

---

## ✍️ Change Management

- All modifications to existing landing pages must be approved.
- Backend architecture updates require re-review with Appwrite compatibility in mind.

---


# TuneUp V2

A modern music streaming and artist management platform built with Next.js, TypeScript, and MongoDB.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Environment Variables

Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tuneup-v2
```

2. Install all dependencies (frontend and backend):
```bash
npm run install-all
```

Or install frontend and backend separately:
```bash
npm run install:frontend
npm run install:backend
```

## Running the Application

1. Start the backend server:
```bash
npm run dev:backend
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev:frontend
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Available Scripts

### Installation
- `npm run install-all` - Install dependencies for both frontend and backend
- `npm run install:frontend` - Install frontend dependencies only
- `npm run install:backend` - Install backend dependencies only

### Development
- `npm run dev:frontend` - Start frontend development server
- `npm run dev:backend` - Start backend development server

### Production
- `npm run build:frontend` - Build frontend for production
- `npm run build:backend` - Build backend for production
- `npm run start:frontend` - Start frontend production server
- `npm run start:backend` - Start backend production server

## Project Structure

```
tuneup-v2/
├── frontend/          # Next.js frontend application
├── backend/           # Express.js backend application
├── package.json       # Root package.json for project-wide scripts
└── README.md         # This file
```

## Features

- User authentication (register/login)
- Artist profiles
- Music streaming
- User management
- Modern UI with responsive design

## Technologies Used

- Frontend:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Framer Motion

- Backend:
  - Node.js
  - Express.js
  - TypeScript
  - MongoDB
  - JWT Authentication

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License.

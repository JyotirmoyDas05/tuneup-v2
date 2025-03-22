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
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

## Running the Application

### Development Mode

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

### Production Deployment

1. Build the frontend and backend for production:
```bash
# Build the frontend
cd frontend
npm run build

# Build the backend
cd ../backend
npm run build
```

2. Start the production servers:
```bash
# Start the backend server
cd backend
npm start

# Start the frontend server
cd ../frontend
npm start
```

For a more streamlined approach, you can use the root scripts:
```bash
# Build both frontend and backend
npm run build

# Start both frontend and backend in production mode
npm run start
```

## Available Scripts

### Installation
- `npm run install-all` - Install dependencies for both frontend and backend
- `npm run install:frontend` - Install frontend dependencies only
- `npm run install:backend` - Install backend dependencies only

### Development
- `npm run dev:frontend` - Start frontend development server
- `npm run dev:backend` - Start backend development server
- `npm run dev` - Start both frontend and backend development servers

### Production
- `npm run build:frontend` - Build frontend for production
- `npm run build:backend` - Build backend for production
- `npm run build` - Build both frontend and backend for production
- `npm run start:frontend` - Start frontend production server
- `npm run start:backend` - Start backend production server
- `npm run start` - Start both frontend and backend production servers

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

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

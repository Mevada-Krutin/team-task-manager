# Team Task Manager (MERN Stack)

A premium, full-stack collaborative task management application built for efficiency and visual excellence.

## Features
- **Project Management**: Create and manage multiple projects.
- **Kanban Task Board**: Intuitive "To Do", "In Progress", and "Done" columns.
- **Role-Based Access**: Creator of a project is the Admin; others are Members.
- **Task Assignment**: Assign tasks to specific team members.
- **Interactive Dashboard**: Global overview of your projects and task status.
- **Premium UI**: Glassmorphism, dark mode, and smooth animations.

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Authentication**: JWT (JSON Web Tokens) with Bcrypt password hashing.

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB instance (Local or Atlas)

### 2. Backend Setup
1. Navigate to the `backend` folder.
2. Run `npm install`.
3. Create/edit the `.env` file with your `MONGO_URI` and `JWT_SECRET`.
4. Run `npm start` (or `nodemon index.js` if installed).

### 3. Frontend Setup
1. Navigate to the `frontend` folder.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the browser at `http://localhost:5173`.

## Deployment Guide (Railway)

### 1. Preparation
- Ensure your MongoDB URI is accessible (e.g., MongoDB Atlas).
- Change `baseURL` in `frontend/src/api/index.js` to your deployed backend URL.

### 2. Backend Deployment
1. Create a new project on Railway.
2. Connect your GitHub repository.
3. Select the `backend` directory.
4. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT=5000`.

### 3. Frontend Deployment
1. Create a new service on Railway.
2. Connect your GitHub repository.
3. Select the `frontend` directory.
4. Add environment variable: `VITE_API_URL` (if applicable) or ensure the API utility points to the backend.

## Submission Requirements
- **Live URL**: [Pending Deployment]
- **GitHub**: [Pending Upload]
- **Demo**: [Pending Recording]

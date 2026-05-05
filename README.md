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

## Deployment Guide (Vercel)

### 1. Preparation
- Ensure your MongoDB URI is accessible (e.g., MongoDB Atlas).
- Ensure `frontend/src/api/index.js` is configured to use `import.meta.env.VITE_API_URL`.

### 2. Backend Deployment
1. Create a new project on Vercel.
2. Connect your GitHub repository.
3. In the **General** settings, set the **Root Directory** to `backend`.
4. In **Build & Development Settings**, ensure the framework is set to **Express**.
5. Add **Environment Variables**:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secure secret for tokens.
6. Deploy the project.

### 3. Frontend Deployment
1. Create a new project on Vercel.
2. Connect your GitHub repository.
3. In the **General** settings, set the **Root Directory** to `frontend`.
4. In **Build & Development Settings**:
   - Framework Preset: **Vite**.
   - Output Directory: `dist`.
5. Add **Environment Variables**:
   - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://your-backend.vercel.app`).
6. Deploy the project.

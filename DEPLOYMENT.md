# Deployment Guide

This application is set up for easy deployment on platforms like Render, Vercel, or Netlify.

## prerequisites

- **Backend URL**: You need to deploy your backend first to get its URL (e.g., `https://my-school-app-backend.onrender.com`).
- **Frontend**: You will deploy the React app separately.

## Backend Deployment (e.g., Render.com)

1.  Push your code to GitHub.
2.  Create a new **Web Service** on Render.
3.  Connect your repository.
4.  **Root Directory**: `backend`
5.  **Build Command**: `npm install`
6.  **Start Command**: `node server.js`
7.  **Environment Variables**:
    - `MONGO_URI`: Your MongoDB connection string.
    - `NODE_ENV`: `production`

## Frontend Deployment (Render Static Site)

1.  Create a new **Static Site** on Render.
2.  Connect your repository.
3.  **Root Directory**: `frontend`
4.  **Build Command**: `npm run build`
5.  **Publish Directory**: `build`
6.  **Environment Variables**:
    - `REACT_APP_API_URL`: The URL of your deployed backend (e.g., `https://school-management-backend.onrender.com`).

> [!IMPORTANT]
> You **MUST** set the `REACT_APP_API_URL` environment variable in your frontend deployment settings. If you don't, the frontend will try to connect to localhost and fail.

## Local Development

- The app works locally out of the box.
- It defaults to `http://localhost:5000` for the backend if no environment variable is set.

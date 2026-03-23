# Student Course Management System

A full-stack web application built with React, Node.js, Express, and MySQL. This project demonstrates authentication, CRUD operations, relational database design, and deployment readiness.

## Features
- User registration and login using JWT authentication
- Student CRUD operations
- Course CRUD operations
- Enrollment CRUD operations
- React frontend connected to Express backend
- MySQL database with primary and foreign keys

## Technologies Used
- Frontend: React + Vite + Axios + React Router
- Backend: Node.js + Express
- Database: MySQL
- Authentication: JWT + bcryptjs

## Project Structure
- `frontend/` - React application
- `backend/` - Express API
- `backend/schema.sql` - Database schema

## Setup Instructions

### 1. Database Setup
Create a MySQL database using the `backend/schema.sql` file.

### 2. Backend Setup
```bash
cd backend
npm install
copy .env.example .env
```
Update the `.env` file with your MySQL username, password, and JWT secret.

Run backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Base URL
Frontend expects backend at:
```bash
http://localhost:5000/api
```

## Deployment Suggestion
- Frontend: Vercel or Netlify
- Backend: Render or Railway
- Database: Railway MySQL or another cloud MySQL service

## Submission Checklist
- Public deployed URL
- GitHub repository link
- README included
- Documentation PDF included

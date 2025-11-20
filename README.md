PlateForward — Surplus Food Donation Network

A MERN-stack platform connecting food donors, receivers, and volunteers to reduce food waste.

🚀 Overview

PlateForward is a full-stack web application designed to reduce surplus food waste by connecting donors with receivers (NGOs, shelters, individuals) and volunteers who help with pickup/delivery.
The platform enables users to post food donations, browse available donations, track pickups, and streamline the process of redistributing surplus food.

🧩 Features
👤 User Roles

Donor – Post food donations (with images), manage their listings

Receiver – View available donations, request for food

Volunteer – Support pickups and deliveries

Admin – Manage users & monitor system activity (optional future)

🍲 Donation Module

Create donation posts

Upload images using Multer + Cloudinary

Track donation status (available / claimed / completed)

View donor-specific donation history

🔐 Authentication

JWT-based authentication

Role-based access control

Secure user signup/login

🌐 Frontend

React + Context API

Responsive dashboard for each user role

Real-time form validation and API integration

🗄 Backend

Node.js + Express

MongoDB with Mongoose

REST API structure (donations, users, auth, uploads)

🛠️ Tech Stack
Frontend

React

React Router

Context API

Axios

TailwindCSS / Custom CSS

Backend

Node.js + Express

MongoDB + Mongoose

JWT Authentication

Multer + Cloudinary for image upload

Tools & Deployment

Vercel for frontend (optional)

Railway / Render / Vercel Serverless for backend

Cloudinary for storing images

📁 Project Structure
Backend (Node + Express)
/backend
│── /config
│   └── cloudinary.js
│── /controllers
│── /middlewares
│── /models
│── /routes
│── server.js

Frontend (React)
/frontend
│── /src
│   ├── /Components
│   ├── /Pages
│   ├── /Context
│   ├── App.jsx
│   ├── main.jsx
│── package.json

🔧 Installation & Setup
1. Clone the repo
git clone https://github.com/yourusername/plateforward.git
cd plateforward

🌐 Backend Setup
cd backend
npm install

Environment Variables

Create a .env file:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

Start backend
npm run dev

💻 Frontend Setup
cd frontend
npm install
npm run dev

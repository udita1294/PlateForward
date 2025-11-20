**⭐PlateForward — Surplus Food Donation Network**

PlateForward is a MERN-stack platform designed to reduce surplus food waste by connecting donors, receivers, and volunteers. Users can post donations, request food, and assist in deliveries to ensure excess food reaches people in need.

**🚀 Overview**

PlateForward provides a modern, digital workflow for surplus food redistribution:

Donor → Creates and manages donation posts

Receiver → Views and requests available donations

Volunteer → Helps with pickup and delivery

Admin (Future) → Manages users and system data

**🧩 Features**
**👤 User Roles**

Donor dashboard

Receiver dashboard

Volunteer workflow

Admin panel (future)

**🍲 Donation Module**

Create donation posts

Upload images using Multer + Cloudinary

Track donation status (Available → Claimed → Completed)

View donation history

**🔐 Authentication**

JWT-based authentication

Secure login & signup

Role-based access control

Password encryption

**🎨 Frontend**

React with Context API

Axios for API integration

Responsive UI design

**🛠 Backend**

Node.js + Express

MongoDB + Mongoose

Multer + Cloudinary file uploads

**🛠️ Tech Stack**
**🎯 Frontend**

React

React Router

Context API

TailwindCSS / Custom CSS

Axios

**⚙️ Backend**

Node.js

Express

MongoDB + Mongoose

JWT Auth

Multer + Cloudinary

**🧰 Tools**

Vercel (Frontend hosting)

Render  (Backend hosting)

Cloudinary (Image storage)

**📁 Project Structure**
**🗄️ Backend**
backend/
│── config/
│   └── cloudinary.js
│── controllers/
│── middlewares/
│── models/
│── routes/
└── server.js

**💻 Frontend**
frontend/
│── src/
│   ├── Components/
│   ├── Pages/
│   ├── Context/
│   ├── App.jsx
│   └── main.jsx
└── package.json

**⚡ Installation**
**📥 Clone the Repository**
git clone https://github.com/yourusername/plateforward.git
cd plateforward

🌐 Backend Setup
📦 Install Dependencies
cd backend
npm install

⚙️ Setup Environment Variables (.env)
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

▶️ Start Backend
npm run dev

💻 Frontend Setup
cd frontend
npm install
npm run dev

# 🍽️ PlateForward — Smart Surplus Food Donation Platform

PlateForward is a full-stack **MERN** application that connects **food donors, receivers, volunteers, and administrators** to efficiently redistribute surplus food.  
The platform uses **location-based tracking, real-time notifications, and an admin analytics dashboard** to minimize food waste and maximize social impact.

## Live Link : https://plate-forward-one.vercel.app/

---

## 🌟 Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control (Donor, Receiver, Volunteer, Admin)

---

### 🍱 Donation Management
- Create, view, and manage food donations
- Upload food images using Multer + Cloudinary
- Donation status lifecycle:
  - Pending → Accepted → Completed → Reported
- Quantity, food type, pickup date & time support

---

### 📍 Location-Based Tracking
- Store donation pickup location (address, latitude, longitude)
- Donor location displayed on interactive maps
- Accurate location data improves volunteer routing

---

### 🗺️ Map Integration
- Integrated **Leaflet / Google Maps**
- View donation locations visually
- Volunteers can get **turn-by-turn directions** via Google Maps

---

### 🔔 Real-Time Notifications
- Implemented using **Socket.IO**
- Instant alerts when:
  - Donation is accepted
  - Volunteer is assigned
  - Status updates occur
- Improves coordination and response time

---

### 📊 Admin Dashboard
- View total donations and platform statistics
- Monitor completed, pending, and reported donations
- Manage users (view roles & activity)
- Delete or report inappropriate donations

---

### 📱 Responsive UI
- Fully mobile-responsive design
- Optimized for desktop, tablet, and mobile screens
- Clean and consistent UI layout

---

## 🧰 Tech Stack

### Frontend
- React
- React Router
- Context API
- Axios
- Leaflet / Google Maps
- Chart.js
- Tailwind CSS / Custom CSS

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Socket.IO
- Multer & Cloudinary




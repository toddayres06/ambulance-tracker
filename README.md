# EMS Sync - Ambulance Scheduling & GPS Tracking App 🚑

A full-stack, role-based ambulance scheduling and GPS tracking platform designed to streamline emergency medical services operations.

---

## 🚀 Live Demo

🔗 [View the Live App](https://emssync.netlify.app)  
📹 [Watch the Project Walkthrough (Loom)](https://www.loom.com/share/bc26063a6e984f36883d1fae893c2980?sid=d3f68a6c-561d-4d0c-be3a-56b77331fe93)

---

## 🧠 About This Project

This app was built to solve a real-world problem in EMS scheduling and dispatching. It includes:

- Admin role to manage employees, roles, and shifts
- Dispatcher role to assign ambulances and track GPS location
- EMT role to view assigned shifts and respond to updates
- Real-time ambulance tracking
- Secure login with role-based access
- Clean UI built for clarity and speed in the field

Built in ~150 hours as a capstone-style project and personal showcase.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, Prisma ORM, Supabase (PostgreSQL)
- **Authentication:** JWT with role-based access
- **Deployment:** Netlify (frontend), Render (backend)
- **Tools:** GitHub, Loom

---

## 🧪 Features

- 🚨 Role-based login for Admin / Dispatcher / EMT
- 🗓️ Shift scheduling and role assignments
- 📍 Real-time ambulance GPS location tracking (simulated)
- 🔒 Secure, protected routes by role
- ⚙️ Admin panel to manage staff and schedules

---

## 📁 Folder Structure
ambulance-tracker/
│
├── backend/
│ ├── controllers/
│ ├── prisma/
│ ├── routes/
│ ├── index.js
│
├── src/
│ ├── App.jsx
│ ├── components/
│ └── ...

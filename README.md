# EduStack
EduStack is a modern, full-stack educational platform built with the MERN stack, optimized using Vite, and powered by integrations like Clerk, Stripe, and Cloudinary. It enables students and educators to collaborate through an intuitive interface with secure authentication, seamless payments, and media management.

## 🚀 Features
🔐 Clerk Auth – Secure login & user management

💸 Stripe Payments – Seamless purchase experience

☁️ Cloudinary Media – Optimized content delivery

📚 Course Management – Upload, manage, enroll

🎓 Student Dashboard – Track enrolled courses, progress

## 🚀 Tech Stack
### 💻 Frontend
- React (via Vite)

- React Router

- Clerk for authentication

- Stripe for payments

- Axios for API requests

### 🌐 Backend
- Node.js

- Express

- MongoDB + Mongoose

- Stripe API integration

- Cloudinary for image/video uploads

## 📁 Project Structure
```bash
EduStack/
├── client/             # Vite + React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── assets/
│       ├── context/
│       ├── main.jsx
│       └── App.jsx
├── server/             # Express backend
│   ├── config/         # DB, Stripe, Cloudinary config
│   ├── controllers/    # Route logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Custom middleware (e.g., auth)
│   └── server.js
├── .env
├── README.md
└── package.json

```
## 🧑‍💻 Getting Started
1. Clone the Repository
```bash
git clone https://github.com/Dsmita03/EduStack.git
```
2. Setup the Backend
```bash
cd server
npm install
```
Create a .env file in /server with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret
CLERK_SECRET_KEY=your_clerk_secret
```
Start the backend server:

```bash
npm start
```
3. Setup the Frontend
```bash
cd client
npm install
npm run dev
```
Update your Clerk front-end config (likely in main.jsx or App.jsx) with your CLERK_PUBLISHABLE_KEY.

### 🔐 Authentication – Clerk
- Secure and modern auth with Clerk

- Supports OAuth, email/password, magic links, and more

- Session management and user roles

📌 Add your Clerk environment variables:

```env
CLERK_PUBLISHABLE_KEY=your_frontend_key
CLERK_SECRET_KEY=your_backend_key
```
## 🌐 Live URL
Backend API- https://edustack-nywp.onrender.com

## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. For major changes, open an issue first to discuss what you would like to change.


# 🛒 Ecommerce MERN Stack - TypeScript

A full-featured E-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js) and fully typed with **TypeScript**.

## ✨ Features

- **Authentication**: JWT-based login/register with secure cookies.
- **Profiles**: User profiles with avatar uploads via Cloudinary.
- **Product Management**: Search, filter by category/price, and product reviews.
- **Shopping Cart**: Fully functional cart with persistent state.
- **Payments**: Integrated **Stripe** for secure credit card processing.
- **Admin Dashboard**:
  - Manage Products (Create, Update, Delete)
  - Manage Orders (Update status, View details)
  - Manage Users (Change roles, Delete)
  - View Sales statistics
- **Forgot Password**: Email integration via Nodemailer/SMTP for password recovery.

## 🚀 Tech Stack

- **Frontend**: React, Vite, Redux Toolkit, Tailwind CSS (or Custom CSS), Lucide Icons.
- **Backend**: Node.js, Express, TypeScript, Mongoose.
- **Database**: MongoDB.
- **Storage**: Cloudinary (for images).
- **Payment**: Stripe.

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Ecommerce
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a file at `backend/config/config.env` and fill in the following:
   ```env
   PORT=4000
   DB_URL=mongodb://localhost:27017/Ecommerce
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=5d
   COOKIE_EXPIRE=5
   CLOUDINARY_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   STRIPE_API_KEY=your_stripe_key
   STRIPE_SECRET_KEY=your_stripe_secret
   SMPT_SERVICE=gmail
   SMPT_MAIL=your_email@gmail.com
   SMPT_PASSWORD=your_app_password
   ```

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the frontend root:
   ```env
   VITE_API_BASE_URL=http://localhost:4000
   ```

---

## 🏗️ Development

### Seed Database
To populate your database with sample products and categories from DummyJSON:
```bash
cd backend
npm run seed
```

### Run the Application
You will need two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🧪 Seeder Accounts
After running the seed script, you can use these credentials:

- **Admin Account**: `admin@gmail.com` / `password123`
- **User Account**: `user@gmail.com` / `password123`

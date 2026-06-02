# ShopEZ - MERN Ecommerce Platform

A modern, full-stack ecommerce application built with React, Node.js, Express, and MongoDB. Features a customer storefront and admin dashboard for managing products, orders, and users.

## ✨ Features

### Customer Features
- **User Authentication**: Register and login with email/password
- **Shopping**: Browse products with real-time filtering and search
- **Shopping Cart**: Add/remove items, persistent cart per user
- **Product Details**: View full product information including price, category, and description
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Admin Features
- **Admin Dashboard**: Overview of users, products, and orders
- **Product Management**: 
  - Add new products with validation and live preview
  - Edit existing products
  - Delete products with confirmation
  - Filter products by category, gender, and price
  - Search functionality
- **Order Management**: Track and update order statuses (Ordered → Packed → Shipped → Delivered)
- **User Management**: View all users with cart counts and role information
- **Admin-Only Routes**: Protected routes that redirect non-admin users

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.6 - UI library
- **React Router DOM** - Client-side routing
- **Vite** 8.0.12 - Build tool and dev server
- **Axios** - HTTP client for API calls
- **CSS** - Inline styling (no external CSS frameworks)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication tokens

## 📁 Project Structure

```
SHOPEZ/
├── client/                          # Legacy frontend (not actively used)
├── frontend/                        # Main React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Main navigation
│   │   │   ├── AdminNavbar.jsx     # Admin navigation
│   │   │   ├── Banner.jsx
│   │   │   ├── ProductCard.jsx     # Product display card
│   │   │   └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Homepage
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Register.jsx        # Registration page
│   │   │   ├── Products.jsx        # Products listing
│   │   │   ├── Cart.jsx            # Shopping cart
│   │   │   ├── Profile.jsx         # User profile
│   │   │   ├── AdminDashboard.jsx  # Admin home
│   │   │   ├── AllOrders.jsx       # Order management
│   │   │   ├── Users.jsx           # User management
│   │   │   ├── AdminProducts.jsx   # Product management
│   │   │   └── NewProduct.jsx      # Add new product
│   │   ├── services/
│   │   │   └── api.js              # API calls
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   └── package.json
└── server/                          # Node.js/Express backend
    ├── config/
    │   └── db.js                   # MongoDB connection
    ├── controllers/
    │   ├── userController.js       # User logic
    │   ├── productController.js    # Product logic
    │   ├── orderController.js      # Order logic
    │   └── adminController.js      # Admin logic
    ├── middleware/
    │   └── authMiddleware.js       # Authentication middleware
    ├── models/
    │   ├── user.js                 # User schema
    │   ├── product.js              # Product schema
    │   └── order.js                # Order schema
    ├── routes/
    │   ├── userRoutes.js
    │   ├── productRoutes.js
    │   ├── orderRoutes.js
    │   └── adminRoutes.js
    ├── index.js                    # Server entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB running locally or MongoDB Atlas connection string

### Installation

1. **Clone the repository**
   ```bash
   cd SHOPEZ
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

**Backend Setup (server/index.js):**
- Ensure MongoDB is running on `mongodb://localhost:27017/shopez` or update the connection string
- Server runs on `http://localhost:8000`

**Frontend Setup (frontend/.env - optional):**
- API base URL is configured in `frontend/src/services/api.js`
- Default: `http://localhost:8000/api`

## 🏃 Running the Project

### Terminal 1: Start Backend
```bash
cd server
npm start
```
Backend will run on `http://localhost:8000`

### Terminal 2: Start Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173` (Vite default)

## 🔐 Login Credentials

### Admin Account (Hardcoded)
- **Email**: `admin@shopez.com`
- **Password**: `admin123`
- **Dashboard**: `/admin`

### Test Customer Accounts
- **Email**: `sai@gmail.com`
- **Password**: `password123`

- **Email**: `varun@gmail.com`
- **Password**: `password123`

(Or create a new account via Register page)

## 📊 Database

### Collections

**Users**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: String // "user" or "admin"
}
```

**Products**
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  category: String,
  image: String (URL),
  gender: String, // "Unisex", "Men", "Women"
  description: String
}
```

**Orders**
```javascript
{
  _id: ObjectId,
  user: ObjectId (User reference),
  items: Array,
  totalPrice: Number,
  status: String,
  createdAt: Date
}
```

## 💾 Local Storage

The frontend uses localStorage for:
- **User**: `"user"` - Current logged-in user object
- **Token**: `"token"` - JWT authentication token
- **Cart**: `"cart_${email}"` - Per-user shopping cart (e.g., `"cart_sai@gmail.com"`)
- **Products**: `"products"` - Global product catalog
- **Order Statuses**: `"orderStatuses"` - Admin order status tracking

## 🎨 Design & Theme

### Customer Pages
- **Colors**: Light theme with black text
- **Layout**: Clean, minimal design

### Admin Pages
- **Primary Background**: `#374151` (Dark gray)
- **Navigation Bar**: `#020617` (Very dark)
- **Cards**: `#111111` (Black)
- **Accent Color**: `#f59e0b` (Orange)
- **Text**: `lightgray`
- **Status Colors**:
  - Success: `#10b981` (Green)
  - Error: `#ef4444` (Red)
  - Info: `#3b82f6` (Blue)

## 📝 API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Add new product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |
| GET | `/api/users` | Get all users (admin) |
| GET | `/api/orders` | Get all orders (admin) |

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Admin-only route protection
- Protected API endpoints with middleware
- Per-user cart isolation

## 🐛 Troubleshooting

### Backend connection fails
- Ensure MongoDB is running: `mongod`
- Check MongoDB connection string in `server/index.js`
- Verify port 8000 is not in use

### Frontend shows blank page
- Check browser console for errors
- Ensure frontend can reach backend (`http://localhost:8000`)
- Try clearing cache: `npm cache clean --force`

### "Cannot find module" errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Cart not persisting
- Check if localStorage is enabled in browser
- Verify user is logged in (check localStorage "user" key)

## 📦 Default Products

The application includes 18 pre-loaded products:
- Mobiles: iPhone 15 Pro, Samsung Galaxy S24, OnePlus 12
- Laptops: Gaming Laptop, MacBook Pro 16, Dell XPS 13
- Electronics: Wireless Headphones, Smart Watch, Tablet
- Fashion: Running Shoes, Casual T-Shirt, Women's Jeans
- Sports: Cricket Bat, Basketball, Yoga Mat
- Grocery: Protein Powder, Coffee Beans
- Watches: Silver Watch, Women's Watch
- Accessories: Phone Case

## 🚀 Future Enhancements

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Customer order history
- [ ] Email notifications
- [ ] Image upload (instead of URL)
- [ ] Pagination for products
- [ ] Advanced search and filters
- [ ] Customer support chat
- [ ] Analytics dashboard for admins

## 📝 Notes

- Admin accounts are hardcoded (not recommended for production)
- Use proper environment variables for sensitive data
- Implement proper image storage (AWS S3, Cloudinary, etc.)
- Add email verification for registrations
- Implement rate limiting for API endpoints
- Add comprehensive error handling


## 👤 Author

Created as a learning project for MERN stack development.

---

**Made with ❤️ for ecommerce excellence**

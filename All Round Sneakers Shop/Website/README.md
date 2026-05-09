# All Around Sneakers - Pure HTML/CSS/JavaScript Website

## Overview
Your sneaker shop is now fully functional with HTML, CSS, and JavaScript - no PHP or XAMPP required!

## Features

### Authentication System
- ✅ **Pure JavaScript login** - No server needed
- ✅ **User registration** with Customer/Seller roles
- ✅ **Session management** using localStorage
- ✅ **Remember me** functionality
- ✅ **Role-based redirects**

### Website Pages
- **index.html** - Login page (dark theme)
- **signup.html** - Registration page (dark theme)
- **home.html** - Main dashboard (protected)
- **sneakers.html** - Shop page
- **Add cart page.html** - Shopping cart
- **checkout.html** - Checkout process
- **about.html** - About us
- **contact.html** - Contact page
- **sellers page.html** - Seller dashboard
- **admin.html** - Admin panel

### Design Features
- ✅ **Consistent dark theme** across all pages
- ✅ **Modern UI** with gradients and animations
- ✅ **Responsive design** for mobile and desktop
- ✅ **Professional navigation** with search
- ✅ **Shopping cart** functionality
- ✅ **Product filtering** and sorting

---

## Quick Start

### Option 1: Open Directly
1. Open File Explorer
2. Navigate to the `Website` folder
3. Double-click `index.html`

### Option 2: Use Live Server (Recommended)
1. Install **Live Server** extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Website opens at `http://localhost:5500/index.html`

---

## Default Login

| Username | Password | Role |
|----------|-----------|-------|
| `admin` | `admin123` | Administrator |

---

## How It Works

### Authentication Flow
```
index.html (login) → JavaScript validation → localStorage → Redirect based on role
```

### User Data Storage
- **Users**: Stored in `localStorage` (browser's local storage)
- **Cart**: Stored in `localStorage`
- **Products**: Hardcoded in `app.js`
- **Sessions**: Temporary browser session

### Security Notes
- This is a **demo/educational** version
- Passwords are stored in plain text (for demo purposes)
- In production, use server-side authentication and database

---

## File Structure

```
Website/
├── index.html          # Login page
├── signup.html         # Registration page  
├── home.html           # Main dashboard
├── sneakers.html       # Shop page
├── Add cart page.html  # Shopping cart
├── checkout.html       # Checkout
├── about.html          # About page
├── contact.html        # Contact page
├── sellers page.html   # Seller dashboard
├── admin.html          # Admin panel
├── styles.css          # Main stylesheet
├── app.js             # Product/cart logic
├── auth.js            # Authentication system
└── README.md          # This file
```

---

## Testing

### 1. Test Login
- Go to `index.html`
- Login with `admin` / `admin123`
- Should redirect to `home.html`

### 2. Test Registration
- Go to `signup.html`
- Create a new account
- Login with new credentials

### 3. Test Shopping
- Browse sneakers
- Add items to cart
- Checkout

### 4. Test Different Roles
- Create admin, seller, and customer accounts
- Test role-based redirects

---

## Customization

### Add New Products
Edit `app.js` → Find `products` array → Add new product objects

### Change Colors
Edit `styles.css` → Modify CSS variables at the top

### Add New Pages
1. Create new HTML file
2. Include same CSS and JS files
3. Add navigation link

---

## Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox  
- ✅ Safari
- ✅ Edge

---

## Need Help?
- Check browser console for errors (F12 → Console)
- Ensure all files are in the same folder
- Use Live Server for best experience

---

**Enjoy your All Around Sneakers website!** 🎉

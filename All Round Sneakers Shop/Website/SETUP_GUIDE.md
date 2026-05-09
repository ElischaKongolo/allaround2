# All Around Sneakers - PHP/SQL Authentication Setup Guide

## Overview
Your sneaker shop now has a complete PHP and MySQL authentication system with:
- Secure user login with password hashing
- User registration (Customer & Seller roles)
- "Remember Me" functionality
- Session management
- SQL database for storing users, products, carts, and orders

---

## Prerequisites
1. **XAMPP** or **WAMP** installed (includes Apache, PHP, MySQL)
2. Web browser

### Download XAMPP:
- Windows: https://www.apachefriends.org/download.html

---

## Setup Instructions

### Step 1: Install XAMPP
1. Download and install XAMPP
2. Start **Apache** and **MySQL** from the XAMPP Control Panel

### Step 2: Move Project Files
1. Copy the entire `Website` folder to:
   ```
   C:\xampp\htdocs\AllAroundSneakers\
   ```

### Step 3: Create Database
1. Open browser and go to: `http://localhost/phpmyadmin`
2. Click **"New"** to create a database
3. Name it: `allaround_sneakers`
4. Click **"Create"**

### Step 4: Import Database Schema
1. Select the `allaround_sneakers` database
2. Click **"Import"** tab
3. Choose File: Select `database.sql` from the Website folder
4. Click **"Go"** to import

### Step 5: Configure Database Connection (Optional)
If your MySQL has a password, edit `config.php`:
```php
define('DB_PASSWORD', 'your_mysql_password');
```

---

## Default Login Credentials

### Admin Account
- **Username:** `admin`
- **Password:** `admin123`
- **Email:** `admin@allaroundsneakers.com`

---

## Access Your Website

Open browser and navigate to:
```
http://localhost/AllAroundSneakers/index.html
```

---

## File Structure

```
Website/
├── index.html          # Login page (entry point)
├── signup.html         # Registration page
├── signup.php          # Registration handler
├── login.php           # Login authentication
├── logout.php          # Logout handler
├── config.php          # Database connection
├── check_session.php   # Session checker (AJAX)
├── database.sql        # Database schema
├── home.html           # Main dashboard (after login)
├── sneakers.html       # Shop page
├── Add cart page.html  # Shopping cart
├── checkout.html       # Checkout page
├── about.html          # About page
├── contact.html        # Contact page
├── sellers page.html   # Seller dashboard
├── admin.html          # Admin panel
├── styles.css          # Shared styles
├── app.js              # Shared JavaScript
└── SETUP_GUIDE.md      # This file
```

---

## Features

### Authentication
- ✅ Secure password hashing (bcrypt)
- ✅ Session management
- ✅ "Remember Me" cookies (30 days)
- ✅ Role-based access (Customer, Seller, Admin)

### Database Tables
- `users` - User accounts
- `products` - Sneaker inventory
- `cart` - Shopping cart items
- `orders` - Order history
- `order_items` - Order details
- `password_resets` - Password reset tokens
- `user_sessions` - Remember me sessions

---

## Troubleshooting

### "Connection failed" error
- Check if MySQL is running in XAMPP Control Panel
- Verify database name in `config.php` matches the one in phpMyAdmin

### "404 Not Found" error
- Ensure files are in `C:\xampp\htdocs\AllAroundSneakers\`
- Access via `http://localhost/AllAroundSneakers/index.html`

### Login not working
- Clear browser cookies and cache
- Check that database was imported correctly
- Verify `users` table has the admin user

---

## Security Notes

1. **Change default admin password** after first login
2. Use strong passwords for all accounts
3. Keep XAMPP updated
4. Don't use this setup for production without additional security measures

---

## Next Steps

1. Add more products to the database via phpMyAdmin
2. Customize the email templates
3. Add email verification for new registrations
4. Implement password reset functionality

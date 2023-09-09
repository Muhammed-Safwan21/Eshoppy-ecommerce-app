# EShoppy eCommerce App

> eCommerce platform built with the MERN stack & Redux.

 It is a full-featured shopping cart with Razorpay , PayPal & credit/debit payments.

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- Razorpay / PayPal / credit card integration
- Database seeder (products & users)

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` 
- Create a PayPal account and obtain your `Client ID` 
- Create a Razorpay account and obtain your `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV =development
PORT =5000
MONGO_URI = ADD_YOUR_URI
JWT_SECRET = ADD_YOUR_SECRET
PAYPAL_CLIENT_ID =YOUR_PAYPAL_ID
RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID
RAZORPAY_SECRET_KEY=YOUR_RAZORPAY_SECRET_KEY
PAGINATION_LIMIT = 8

```

Change the JWT_SECRET and PAGINATION_LIMIT to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

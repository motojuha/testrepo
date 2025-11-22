# Inventory Management System

A web application for managing inventory sales items. Users can add new items, delete items, and browse their inventory.

## Features

- 📦 Add new inventory items (name, price, quantity)
- 🗑️ Delete existing items
- 📋 Browse and view all items in inventory
- 💾 Pre-loaded with test items in local database

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### Add New Item
1. Fill in the item name, price, and quantity in the form
2. Click "Add Item"
3. The item will appear in the inventory list below

### Delete Item
1. Find the item you want to delete in the inventory list
2. Click the "Delete" button on the item card
3. Confirm the deletion

### Browse Items
All inventory items are displayed in a card grid layout showing:
- Item name
- Price
- Quantity in stock

## API Endpoints

- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get single item by ID
- `POST /api/items` - Add new item
- `DELETE /api/items/:id` - Delete item by ID

## Test Data

The application comes pre-loaded with sample inventory items:
- Laptop ($999.99, qty: 10)
- Mouse ($25.50, qty: 50)
- Keyboard ($75.00, qty: 30)
- Monitor ($299.99, qty: 15)
- USB Cable ($9.99, qty: 100)

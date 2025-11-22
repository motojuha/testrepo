# Inventory Management System

A simple web application for managing inventory sales items. Users can add new items, delete items, and browse their inventory.

## Features

- 📦 Add new inventory items with name, quantity, price, and description
- 🗑️ Delete items from inventory
- 📋 Browse all items in a clean, responsive interface
- 💾 SQLite database for persistent storage
- 🎨 Modern, user-friendly UI

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Usage

Start the server:
```bash
npm start
```

Open your browser and navigate to: `http://localhost:3000`

## Test Data

The application includes sample test data that is automatically loaded on first run:
- Laptop ($999.99, Quantity: 10)
- Mouse ($19.99, Quantity: 50)
- Keyboard ($49.99, Quantity: 30)
- Monitor ($299.99, Quantity: 15)
- Headphones ($79.99, Quantity: 25)

## API Endpoints

- `GET /api/items` - Get all items
- `POST /api/items` - Add a new item
- `DELETE /api/items/:id` - Delete an item by ID

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: SQLite (better-sqlite3)
- **Frontend**: HTML, CSS, JavaScript

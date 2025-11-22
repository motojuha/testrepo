const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory database with test items
let inventory = [
  { id: 1, name: 'Laptop', price: 999.99, quantity: 10 },
  { id: 2, name: 'Mouse', price: 25.50, quantity: 50 },
  { id: 3, name: 'Keyboard', price: 75.00, quantity: 30 },
  { id: 4, name: 'Monitor', price: 299.99, quantity: 15 },
  { id: 5, name: 'USB Cable', price: 9.99, quantity: 100 }
];

let nextId = 6;

// API Routes

// GET all items
app.get('/api/items', (req, res) => {
  res.json(inventory);
});

// GET single item by id
app.get('/api/items/:id', (req, res) => {
  const item = inventory.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// POST new item
app.post('/api/items', (req, res) => {
  const { name, price, quantity } = req.body;
  
  if (!name || price === undefined || quantity === undefined) {
    return res.status(400).json({ error: 'Name, price, and quantity are required' });
  }
  
  const parsedPrice = parseFloat(price);
  const parsedQuantity = parseInt(quantity);
  
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    return res.status(400).json({ error: 'Price must be a valid number greater than or equal to 0' });
  }
  
  if (isNaN(parsedQuantity) || parsedQuantity < 0) {
    return res.status(400).json({ error: 'Quantity must be a valid number greater than or equal to 0' });
  }
  
  const newItem = {
    id: nextId++,
    name,
    price: parsedPrice,
    quantity: parsedQuantity
  };
  
  inventory.push(newItem);
  res.status(201).json(newItem);
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = inventory.findIndex(i => i.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const deleted = inventory.splice(index, 1);
  res.json({ message: 'Item deleted successfully', item: deleted[0] });
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Inventory Management Server running on http://localhost:${PORT}`);
});

const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = 3000;

// Initialize database
const db = new Database('inventory.db');

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image_url TEXT
  )
`);

// Insert test data
const insertTestData = () => {
  const count = db.prepare('SELECT COUNT(*) as count FROM items').get();
  if (count.count === 0) {
    const insert = db.prepare('INSERT INTO items (name, quantity, price, description, image_url) VALUES (?, ?, ?, ?, ?)');
    insert.run('Laptop', 10, 999.99, 'High-performance laptop for business', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400');
    insert.run('Mouse', 50, 19.99, 'Wireless optical mouse', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400');
    insert.run('Keyboard', 30, 49.99, 'Mechanical keyboard with RGB', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400');
    insert.run('Monitor', 15, 299.99, '27-inch 4K display', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400');
    insert.run('Headphones', 25, 79.99, 'Noise-cancelling headphones', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400');
    console.log('Test data inserted successfully');
  }
};

insertTestData();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes

// Get all items
app.get('/api/items', (req, res) => {
  try {
    const items = db.prepare('SELECT * FROM items ORDER BY id DESC').all();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Add new item
app.post('/api/items', (req, res) => {
  try {
    const { name, quantity, price, description, image_url } = req.body;
    
    if (!name || quantity === undefined || price === undefined) {
      return res.status(400).json({ error: 'Name, quantity, and price are required' });
    }
    
    if (typeof quantity !== 'number' || isNaN(quantity) || quantity < 0 || !Number.isInteger(quantity)) {
      return res.status(400).json({ error: 'Quantity must be a non-negative integer' });
    }
    
    if (typeof price !== 'number' || isNaN(price) || price < 0) {
      return res.status(400).json({ error: 'Price must be a non-negative number' });
    }
    
    const insert = db.prepare('INSERT INTO items (name, quantity, price, description, image_url) VALUES (?, ?, ?, ?, ?)');
    const result = insert.run(name, quantity, price, description || '', image_url || '');
    
    const newItem = db.prepare('SELECT * FROM items WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 1) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }
    
    const deleteStmt = db.prepare('DELETE FROM items WHERE id = ?');
    const result = deleteStmt.run(id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Inventory Management Server running on http://localhost:${PORT}`);
});

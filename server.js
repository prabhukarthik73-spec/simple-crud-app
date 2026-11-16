const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON requests and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory array to store items (no database as requested)
let items = [
  { id: 1, name: 'Book', price: 250 },
  { id: 2, name: 'Pen', price: 25 }
];

let nextId = 3;

// REST API Endpoints

// 1. GET /api/items - Read all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// 2. POST /api/items - Create a new item
app.post('/api/items', (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined || price === null || isNaN(Number(price))) {
    return res.status(400).json({ error: 'Valid name and price are required.' });
  }

  const newItem = {
    id: nextId++,
    name: String(name).trim(),
    price: Number(price)
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// 3. PUT /api/items/:id - Update an existing item
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  const { name, price } = req.body;

  if (name !== undefined) {
    item.name = String(name).trim();
  }
  if (price !== undefined && price !== null && !isNaN(Number(price))) {
    item.price = Number(price);
  }

  res.json(item);
});

// 4. DELETE /api/items/:id - Delete an item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  const deletedItem = items.splice(index, 1)[0];
  res.json({ message: 'Item deleted successfully.', item: deletedItem });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

// Serve the frontend
app.use(express.static('public'));

// Add a new customer
app.post('/customers', (req, res) => {
  const { name, email, phone } = req.body;
  db.run(
    'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Add a new test/calibration item
app.post('/items', (req, res) => {
  const { customer_id, description } = req.body;
  db.run(
    'INSERT INTO items (customer_id, description) VALUES (?, ?)',
    [customer_id, description],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Simulate payment
app.post('/payments', (req, res) => {
  const { customer_id, amount } = req.body;
  db.run(
    'INSERT INTO payments (customer_id, amount) VALUES (?, ?)',
    [customer_id, amount],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, status: 'Paid' });
    }
  );
});

// Add feedback
app.post('/feedback', (req, res) => {
  const { customer_id, message } = req.body;
  db.run(
    'INSERT INTO feedback (customer_id, message) VALUES (?, ?)',
    [customer_id, message],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

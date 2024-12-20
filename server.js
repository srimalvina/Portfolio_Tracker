const db = require('./db');

// Add a stock
app.post('/stocks', (req, res) => {
  const { name, ticker, quantity, buyPrice } = req.body;
  const query = 'INSERT INTO stocks (name, ticker, quantity, buy_price) VALUES (?, ?, ?, ?)';
  db.query(query, [name, ticker, quantity, buyPrice], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('Stock added successfully');
  });
});

// Get all stocks
app.get('/stocks', (req, res) => {
  const query = 'SELECT * FROM stocks';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});

// Update a stock
app.put('/stocks/:id', (req, res) => {
  const { id } = req.params;
  const { name, ticker, quantity, buyPrice } = req.body;
  const query = 'UPDATE stocks SET name = ?, ticker = ?, quantity = ?, buy_price = ? WHERE id = ?';
  db.query(query, [name, ticker, quantity, buyPrice, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Stock updated successfully');
  });
});

// Delete a stock
app.delete('/stocks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM stocks WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Stock deleted successfully');
  });
});

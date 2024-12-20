const { fetchStockPrice } = require('./stockPrices');

app.get('/portfolio-value', async (req, res) => {
  const query = 'SELECT * FROM stocks';
  db.query(query, async (err, results) => {
    if (err) return res.status(500).send(err);

    let totalValue = 0;

    for (const stock of results) {
      const price = await fetchStockPrice(stock.ticker);
      totalValue += stock.quantity * price;
    }

    res.status(200).json({ totalValue });
  });
});

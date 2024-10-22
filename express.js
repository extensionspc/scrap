const express = require('express');
const scrapeGoldPrices = require('./api/index'); // Import the scraping function

const app = express();
const port = process.env.PORT || 3000;

// Route to trigger the scraper
app.get('/api', scrapeGoldPrices);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const scrapeGoldPrices = require('./scrape'); // Your scrape function

const app = express();
const port = process.env.PORT || 3000;

app.get('/', scrapeGoldPrices);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

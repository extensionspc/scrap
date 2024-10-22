const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const { data } = await axios.get('https://goldrate.qa//');
    const $ = cheerio.load(data);

    const prices = [];
    $('table tr').each((index, element) => {
      const tds = $(element).find('td');
      const karat = $(tds[0]).text().trim();
      const priceQAR = $(tds[1]).text().trim();
      const priceUSD = $(tds[2]).text().trim();

      // Only push valid rows
      if (karat && priceQAR && priceUSD) {
        prices.push({
          karat,
          priceQAR,
          priceUSD
        });
      }
    });

    res.status(200).json(prices);  // Respond with the prices array
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).json({ error: 'Failed to scrape data' });
  }
};

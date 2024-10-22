const axios = require('axios');
const cheerio = require('cheerio');

const scrapeGoldPrices = async (req, res) => {
  try {
    const { data } = await axios.get('https://goldpriceqatar.com/');
    const $ = cheerio.load(data);

    const prices = [];
    $('table tr').each((index, element) => {
      const tds = $(element).find('td');
      prices.push({
        karat: $(tds[0]).text().trim(),
        priceQAR: $(tds[1]).text().trim(),
        priceUSD: $(tds[2]).text().trim(),
      });
    });

    // Return the prices as a JSON response
    res.json(prices);
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).send('Error scraping data');
  }
};

module.exports = scrapeGoldPrices;

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

    // Send the prices data as a simple HTML response
    res.send(`
      <h1>Gold Prices</h1>
      <ul>
        ${prices.map(price => `<li>${price.karat} - QAR: ${price.priceQAR}, USD: ${price.priceUSD}</li>`).join('')}
      </ul>
    `);
  } catch (error) {
    res.status(500).send('Error scraping data');
  }
};

module.exports = scrapeGoldPrices;

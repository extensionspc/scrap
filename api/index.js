const axios = require('axios');
const cheerio = require('cheerio');

const scrapeGoldPrices = async () => {
  try {
    const { data } = await axios.get('https://goldpriceqatar.com/');
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

    console.log(prices);
  } catch (error) {
    console.error('Error scraping data:', error);
  }
};

scrapeGoldPrices();

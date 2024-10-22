const puppeteer = require('puppeteer');

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://goldrate.qa/', { waitUntil: 'networkidle0' });

    const data = await page.evaluate(() => {
      const prices = [];
      document.querySelectorAll('table tr').forEach((row) => {
        const tds = row.querySelectorAll('td');
        if (tds.length > 0) {
          prices.push({
            karat: tds[0].innerText.trim(),
            priceQAR: tds[1].innerText.trim(),
            priceUSD: tds[2].innerText.trim(),
          });
        }
      });
      return prices;
    });

    await browser.close();
    res.status(200).json(data); // Return scraped data as JSON response
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).json({ error: 'Failed to scrape data' });
  }
}

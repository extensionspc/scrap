const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto('https://goldrate.qa', {
      waitUntil: 'networkidle2',
    });

    // Scraping logic
    const data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tr'));
      return rows.map(row => {
        const columns = row.querySelectorAll('td');
        return {
          karat: columns[0] ? columns[0].innerText : '',
          priceQAR: columns[1] ? columns[1].innerText : '',
          priceUSD: columns[2] ? columns[2].innerText : '',
        };
      });
    });

    // Return scraped data
    res.status(200).json(data);
  } catch (error) {
    console.error("Error scraping data: ", error);
    res.status(500).json({ error: "Failed to scrape data" });
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

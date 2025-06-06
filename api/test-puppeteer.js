import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export const handler = async (req, res) => {
  try {
    const executablePath = await chromium.executablePath;

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();

    await browser.close();

    res.json({ success: true, title });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

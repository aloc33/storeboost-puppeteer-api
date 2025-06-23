import express from 'express';
import puppeteer from 'puppeteer';

const router = express.Router();

router.get('/test-puppeteer', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    await browser.close();

    res.json({ success: true, title });
  } catch (error) {
    console.error('Puppeteer error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

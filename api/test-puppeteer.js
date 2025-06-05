import express from 'express';
import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';

const router = express.Router();

router.get('/api/test-puppeteer', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: executablePath(), // 👈 use the Puppeteer-bundled Chromium
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    await browser.close();

    res.json({ success: true, title });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

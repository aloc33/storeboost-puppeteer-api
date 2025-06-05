import chromium from 'chrome-aws-lambda';
import express from 'express';

const router = express.Router();

router.get('/api/test-puppeteer', async (req, res) => {
  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();

    res.json({ success: true, title });
  } catch (error) {
    res.json({ success: false, error: error.message });
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
});

export default router;

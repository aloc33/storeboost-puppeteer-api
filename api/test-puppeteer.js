import puppeteer from 'puppeteer';

export async function handler(req, res) {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
      // ✅ DO NOT SET executablePath
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();

    await browser.close();

    res.json({ success: true, title });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
}

import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const screenshot = await page.screenshot({ fullPage: true, encoding: 'base64' });
    const title = await page.title();

    await browser.close();

    return res.json({
      title,
      screenshot,
      url,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Screenshot failed', message: err.message });
  }
});

app.get('/', (req, res) => res.send('Storeboost Puppeteer API is live'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

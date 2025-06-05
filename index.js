import express from 'express';
import testPuppeteer from './api/test-puppeteer.js';

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Storeboost Puppeteer API is live');
});

app.get('/api/test-puppeteer', testPuppeteer);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

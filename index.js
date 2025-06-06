import express from 'express';
import { handler } from './api/test-puppeteer.js';

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/api/test-puppeteer', handler);

app.get('/', (_, res) => {
  res.send('Storeboost Puppeteer API is live');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

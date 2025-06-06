import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import handler from './api/test-puppeteer.js'; // ✅ changed from named import to default import

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/api/test-puppeteer', handler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

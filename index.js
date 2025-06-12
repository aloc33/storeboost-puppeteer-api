import express from 'express';
import testRouter from './api/test-puppeteer.js';

const app = express();
const PORT = process.env.PORT || 10000;

app.use('/api', testRouter);

app.get('/', (req, res) => {
  res.send('Storeboost Puppeteer API is live');
});

app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});

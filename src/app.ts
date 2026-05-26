import express from 'express';
import logRouter from './modules/logs/log.routes.js';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/logs', logRouter);

export default app;

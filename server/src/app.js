import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import startupRoutes from './routes/startup.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRoutes);
app.use('/api/startups', startupRoutes);

app.use('/api/*', (_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

export default app;

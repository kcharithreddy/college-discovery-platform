import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import collegeRoutes from './routes/colleges';
import savedRoutes from './routes/saved';

const app = express();
const port = Number(process.env.PORT || 4000);
const allowedOrigin = true;

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'college-discovery-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/saved', savedRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(port, () => console.log(`API running on http://localhost:${port}`));

import express from 'express';
import cors from 'cors';
import { config } from './config';
import authRoutes from './routes/auth';
import collegeRoutes from './routes/colleges';
import savedRoutes from './routes/saved';
import { apiLimiter, bodyErrorHandler, securityHeaders } from './security';

const app = express();

// Don't advertise the framework, and trust exactly the configured number of proxies
// (e.g. 1 on Render/Railway) so rate limits see the real client IP and can't be spoofed.
app.disable('x-powered-by');
app.set('trust proxy', config.trustProxy);

app.use(securityHeaders);
app.use(cors({ origin: config.clientUrls, credentials: true, methods: ['GET', 'POST', 'DELETE'] }));
app.use(express.json({ limit: '100kb' }));
app.use('/api', apiLimiter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'college-discovery-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/saved', savedRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(bodyErrorHandler);
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // Log details on the server only; never send internals (stack traces, SQL) to the client.
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(config.port, () => console.log(`API running on http://localhost:${config.port}`));

import "../instrument.mjs"; //importing this file will initialize Sentry for error monitoring
import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import {clerkMiddleware} from '@clerk/express'
import { functions, inngest } from './config/inngest.js';
import { serve } from 'inngest/express';
import chatRoutes from './routes/chat.route.js';

import * as Sentry from "@sentry/node"

const app = express();
app.use(express.json()); //this middleware allows to parse JSON request bodies req.body

app.use(clerkMiddleware());

app.get('/debug-sentry', (req, res) => {
  throw new Error("Test Sentry error");
});

app.get('/', (req, res) => {
  res.send('Hello World1!')
})

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app)

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== 'production') {
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port: ${ENV.PORT}`)
    })
  } 
  } catch (error) {
    console.error("Error starting the server: ", error);
    process.exit(1);
  }
}

startServer();
export default app;
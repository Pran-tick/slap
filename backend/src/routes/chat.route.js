import express from 'express';
import { getStreamToken } from '../controllers/chat.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Define your chat routes here
router.get("/token", protectRoute, getStreamToken)

export default router;

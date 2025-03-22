import express, { Router, Request, Response } from 'express';
import { login, register } from '../controllers/authController';

const router: Router = express.Router();

// Explicitly type the request handlers with RequestHandler
router.post('/register', register as express.RequestHandler);
router.post('/login', login as express.RequestHandler);

export default router; 
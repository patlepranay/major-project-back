import express from "express";
const router = express.Router();

import { generateOTP, verifyOTP } from '../controllers/otp.js';

router.get('/generate/:id', generateOTP);
router.post('/verify', verifyOTP);



export default router; 
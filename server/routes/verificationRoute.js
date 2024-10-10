import express from 'express';
import { verifyOtp,sendOtp } from '../controllers/verificationController.js';


const router = expree.Router();

router.post('/getOtp',sendOtp);
router.post('/verify',verifyOtp);

export default router
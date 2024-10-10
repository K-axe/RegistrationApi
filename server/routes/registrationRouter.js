import express from 'express';
import { registerBusiness,registerOwner } from '../controllers/registrationController.js';

const router = express.Router();

router.post('/business',registerBusiness);
router.post('/owner',registerOwner);

export default router
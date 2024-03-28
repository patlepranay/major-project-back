import express from 'express';

import { addPrescription, getAppointmentPrescriptionById } from '../controllers/prescription.js';

const router = express.Router();


router.post('/add', addPrescription);
router.get('/get/:id', getAppointmentPrescriptionById);

export default router;
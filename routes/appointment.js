import express from 'express';

import { bookAppointment, endAppointment, getAppointmentById, addPrescriptionToAppointment, getAppointmentForDoctorsId, approveAppointmentById, getAppointmentForPatientId, deleteAppointmentById } from '../controllers/appointment.js';

import auth from "../middleware/auth.js";


const router = express.Router();

router.get('/get/:id', auth, getAppointmentById);
router.get('/doctor/:id', auth, getAppointmentForDoctorsId);
router.get('/patient/:id', auth, getAppointmentForPatientId);
router.post('/book', auth, bookAppointment);
router.patch('/update/:id', auth, approveAppointmentById);
router.patch('/addPrescription', auth, addPrescriptionToAppointment);
router.delete('/delete/:id', auth, deleteAppointmentById);
router.patch('/end/:id', auth, endAppointment)

export default router;
import express from 'express';
import mongoose from 'mongoose';

import Prescription from '../models/prescription.js';
import Appointment from '../models/appointment.js'


const router = express.Router();


export const addPrescription = async (req, res) => {
    const { doctorId, patientId, medicine } = req.body;


    try {

        const prescription = await Prescription.create({ doctorId: doctorId, patientId: patientId, medicine: medicine });
        res.status(200).json(prescription);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAppointmentPrescriptionById = async (req, res) => {
    try {

        const { id } = req.params;
        const { prescriptionId } = await Appointment.findById({ _id: id });
        const prescription = await Prescription.findById({ _id: prescriptionId });
        res.status(200).json(prescription);
    } catch (error) {
        res.status(404).json(error)
    }
}





export default router;
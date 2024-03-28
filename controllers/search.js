import express from 'express';
import mongoose from 'mongoose';

import Doctor from '../models/userDoctor.js';
import Patient from '../models/userPatient.js';


const router = express.Router();


export const doctorSearch = async (req, res) => {
    try {
        const doctorList = await Doctor.find({}, 'name specialization');
        res.status(200).json(doctorList);
    }
    catch (error) {
        res.status(404).json(error);
    }
}

export const patientSearch = async (req, res) => {
    try {
        const patientList = await Patient.find({}, 'name');

        res.status(200).json(patientList);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;
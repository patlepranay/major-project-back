import express from 'express';
import mongoose from 'mongoose';

import UserData from '../models/userData.js';
import Patient from '../models/userPatient.js';
import Doctor from '../models/userDoctor.js';
import userData from '../models/userData.js';


const router = express.Router();


export const addUserData = async (req, res) => {
    try {

        const { height, weight, address, qualification, dob, experience, knownDiseases } = req.body;

        const { id, type } = req.params;
        if (type == 'doctor') {
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No appointment with id: ${id}`);
            const userData = await UserData.create({ height: height, weight: weight, address: address, qualification: qualification, experience: experience, dob: dob, knownDiseases: knownDiseases });
            const doctor = await Doctor.findById({ _id: id });
            doctor.userDataId = userData._id;
            doctor.profileStatus = true;
            await Doctor.findByIdAndUpdate(id, doctor, { new: true })
            res.status(200).json(userData);
        }
        else {
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No appointment with id: ${id}`);
            const userData = await UserData.create({ height: height, weight: weight, address: address, qualification: qualification, experience: experience, dob: dob, knownDiseases: knownDiseases });
            const patient = await Patient.findById({ _id: id });
            patient.userDataId = userData._id;
            patient.profileStatus = true;
            const patientData = await Patient.findByIdAndUpdate(id, patient, { new: true })

            res.status(200).json(userData);
        }
    }
    catch (error) {
        res.status(404).json(error);
    }
};

export const getUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await UserData.findById(id);
        res.status(200).json(userData);
    } catch (error) {
        res.status(404).json(error);
    }
}


export default router;
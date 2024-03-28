import express from 'express';
import mongoose from 'mongoose';

import Doctor from '../models/userDoctor.js';
import Patient from '../models/userPatient.js';

import Appointment from '../models/appointment.js';

const router = express.Router();

export const getAppointmentById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No appointment with id: ${id}`);
    try {
        const appointment = await Appointment.findById({ _id: id });
        res.status(200).json(appointment);
    } catch (error) {
        console.log(error);
        res.status(404).json();
    }
}


export const bookAppointment = async (req, res) => {
    const { doctorId, patientId, time, date } = req.body;
    try {
        const appointment = await Appointment.create({ doctorId, patientId, time, date, approvalStatus: false, attendedStatus: false, prescriptionId: '' });
        res.status(200).json(appointment);
    }
    catch (error) {
        console.log(error);
        res.status(404).json();
    }
};


export const getAppointmentForDoctorsId = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.find({ doctorId: id });
        res.status(200).json(appointment);
    }
    catch (error) {
        console.log(error);
        res.status(404).json();
    }
};


export const getAppointmentForPatientId = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.find({ patientId: id });
        res.status(200).json(appointment);
    }
    catch (error) {
        console.log(error);
        res.status(404).json();
    }
};

export const approveAppointmentById = async (req, res) => {

    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    appointment.approvalStatus = true;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No appointment with id: ${id}`);
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, appointment, { new: true });
        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.log(error);
    }
}

export const deleteAppointmentById = async (req, res) => {

    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No appointment with id: ${id}`);
        await Appointment.findByIdAndRemove(id);
        res.status(200).json({ message: "Appointment disapproved or cancelled" });
    } catch (error) {
        console.log(error);
    }
}

export const addPrescriptionToAppointment = async (req, res) => {
    const { appointmentId, prescriptionId } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(appointmentId) || !mongoose.Types.ObjectId.isValid(prescriptionId))
            return res.status(404).send(`Invalid Id ${id}`);
        const appointment = await Appointment.findById(appointmentId);
        appointment.prescriptionId = prescriptionId;
        const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, appointment, { new: true });
        res.status(200).json(updatedAppointment);
    }
    catch (error) {
        console.log(error);
    }
}

export const endAppointment = async (req, res) => {

    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Invalid Id ${id}`);
        const appointment = await Appointment.findById(id);
        appointment.attendedStatus = true;
        await Appointment.findByIdAndUpdate(id, { attendedStatus: true }, { new: true });
        res.status(200).json("Updated");
    }
    catch (error) {
        console.log(error);
    }
}
export default router;
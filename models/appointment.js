import mongoose from 'mongoose';

const appointmentScheme = mongoose.Schema({
    doctorId: String,
    patientId: String,
    time: String,
    date: String,
    approvalStatus: Boolean,
    attendedStatus: Boolean,
    prescriptionId: String
})

var Appointment = mongoose.model('Appointment', appointmentScheme);

export default Appointment;
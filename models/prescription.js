import mongoose from 'mongoose';

const prescriptionSchema = mongoose.Schema({
    doctorId: String,
    patientId: String,
    medicine: [{ name: String, days: String, description: String }]
})

var Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
import mongoose from "mongoose";

const userDoctorSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    type: {
        type: String, required: true
    },
    specialization: { type: String, required: true },
    profileStatus: { type: Boolean, required: true },
    userDataId: String
});

export default mongoose.model("UserDoctor", userDoctorSchema);
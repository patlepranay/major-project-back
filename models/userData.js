import mongoose from "mongoose";

const userDataSchema = mongoose.Schema({
    address: String,
    weight: String,
    height: String,
    knownDiseases: String,
    qualification: String,
    dob: String,
    experience: String
});

export default mongoose.model("UserData", userDataSchema);
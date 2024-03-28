import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv';

import prescriptionRoutes from './routes/prescription.js';
import userPatientRoutes from './routes/userPatient.js';
import userDoctorRoutes from './routes/userDoctor.js';
import searchRoutes from './routes/search.js';
import appointmentRoutes from './routes/appointment.js';
import emailRoutes from './routes/email.js';
import otpRoutes from './routes/otp.js';
import userDataRoutes from './routes/userData.js'

const app = express();
app.use(cors());
dotenv.config();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use('/prescription', prescriptionRoutes);
app.use("/user/patient", userPatientRoutes);
app.use("/user/doctor", userDoctorRoutes);
app.use("/search", searchRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/email", emailRoutes);
app.use("/otp", otpRoutes);
app.use("/userData", userDataRoutes);

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ks1.o35j3.mongodb.net/MajorProject?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    });
});


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => server.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
import express from 'express';
import mongoose from 'mongoose';
import Patient from '../models/userPatient.js'
import otplib from 'otplib';
const authenticator = otplib.authenticator;



import Prescription from '../models/prescription.js'
import nodemailer from 'nodemailer';





const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';


const router = express.Router();


export const generateOTP = async (req, res) => {
    try {
        const { id } = req.params;
        const email = await Patient.find({ _id: id }, 'email');
        const token = authenticator.generate(id);


        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: ,
        //         pass: 
        //     }
        // });

        // var mailOptions = {
        //     from: ,
        //     to: email[0].email,
        //     subject: 'OTP for appointment',
        //     text: token
         
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });


        res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        console.log(error);
    }
}


export const verifyOTP = async (req, res) => {
    const { otp, id } = req.body;

    try {
        const isValid = authenticator.check(otp, id);

        if (isValid) {
            const prescriptions = await Prescription.find({ patientId: id });
            res.status(200).json(prescriptions);
        }

    } catch (error) {
        console.log(error)

    }
}


export default router;
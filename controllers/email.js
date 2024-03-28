import express from 'express';
import nodemailer from 'nodemailer';
import Patient from '../models/userPatient.js';


const router = express.Router();

export const sendEmail = async (req, res) => {
    const { patientId, callerId } = req.body;

    const email = await Patient.find({ _id: patientId }, 'email');


    // try {
    //     var transporter = nodemailer.createTransport({
    //         service: 'gmail',
    //         auth: {
    //             user: ,
    //             pass: 
    //         }
    //     });

    //     var mailOptions = {
    //         from: ,
    //         to: email[0].email,
    //         subject: 'Doctor Caller Id',
    //         text: callerId
                  
    //     };

    //     transporter.sendMail(mailOptions, function (error, info) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log('Email sent: ' + info.response);
    //         }
    //     });

    // } catch (error) {
    // }
}

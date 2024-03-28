import express from "express";
const router = express.Router();

import { sendEmail } from "../controllers/email.js";

router.post("/send", sendEmail);
// router.post("/signup", signup);

export default router; 
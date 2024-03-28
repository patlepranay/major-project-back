import express from "express";
const router = express.Router();

import { doctorSearch, patientSearch } from "../controllers/search.js";

router.get("/doctor", doctorSearch);
router.get("/patient", patientSearch);

export default router; 
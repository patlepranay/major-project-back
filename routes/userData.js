import express from "express";
const router = express.Router();

import { addUserData, getUserData } from "../controllers/userData.js";

router.post("/add/:type/:id", addUserData);
router.get("/get/:id", getUserData)


export default router; 
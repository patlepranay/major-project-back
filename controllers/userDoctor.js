import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserDoctor from "../models/userDoctor.js";

const secret = 'test';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await UserDoctor.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id, type: oldUser.type, }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signup = async (req, res) => {
    const { email, password, firstName, lastName, specialization } = req.body;

    try {
        const oldUser = await UserDoctor.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserDoctor.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, type: "doctor", profileStatus: false, specialization });

        const token = jwt.sign({ email: result.email, id: result._id, type: result.type, profileStatus: result.profileStatus }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};
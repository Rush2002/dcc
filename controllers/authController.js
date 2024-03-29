import { newUser, userModel } from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const loginController = async (req, res) => {
    const {email,password,role} = req.body;

    if (!email || !password || !role) {
        return res.status(400).send("Bad Request");
    }

    try {
        const user = await userModel.findOne({email:email});

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(user.role);
        if (!passwordMatch || user.role!=role) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.json({"token":token,"role":role});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}


export const newUserController = async (req,res) => {
    const {name,email,mobile_no,role,password} = req.body;
    if (!name || !email || !mobile_no || !role || !password ) {
        console.log(name,email,mobile_no,role,password);
        return res.status(400).send("Bad request");
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await newUser(name,email,mobile_no,hashedPassword,role);
        console.log(user);
        res.send("user created successfully");
    } catch (error) {
        res.status(500).send("Bad request");
    }
}



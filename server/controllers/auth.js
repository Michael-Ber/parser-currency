import Users from "../models/Users.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const registration = async (req, res) => {
    try {
        if (!req.body) return res.json({ "message": "Not enough data" });
        const { username, pwd } = req.body;
        const isUsed = await Users.findOne({ username });
        if (isUsed) return res.json({ "message": "This user is already exists" });
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pwd, salt);
        const newUser = await new Users({ username, password: hash });
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        await newUser.save();
        return res.json({ newUser, message: `${username}, you were successfully registered`, token })
    } catch (error) {
        res.json({ "message": "Error while registration", error })
    }
}

export const login = async (req, res) => {
    try {
        const { username, pwd } = req.body;
        const userExist = await Users.findOne({ username });
        if (!userExist) return res.json({ message: "No such a user", error: 'name' });
        const correctPwd = bcrypt.compareSync(pwd, userExist.password);
        if (!correctPwd) return res.json({ message: "Incorrect password", error: 'pwd' });
        const token = jwt.sign(
            { id: userExist._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        return res.json({ message: `${userExist.username}, you are successfully logged in`, user: userExist, token })
    } catch (error) {
        res.json({ "message": "Error while registration", error })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await Users.findById(req.userId);
        if (!user) return res.json({ message: "No such a user" });
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        return res.json({ message: "OK", user, token })
    } catch (error) {
        res.json({ message: 'Error while authorization' })
    }
}
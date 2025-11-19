import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";   

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phone, address } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing details" });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            address
        });

        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: generateToken(user)
        });

    } catch (error) {
        console.error("Register error : ", error);
        res.status(500).json({ message: "Server Error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing details" });
        }

        // FIXED — use findOne
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // FIXED — compare with user.password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: generateToken(user)
        });

    } catch (error) {
        console.error("Login error : ", error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getUserProfile = async (req, res) => {
    res.json({ user: req.user });
}

export { registerUser, loginUser, getUserProfile };

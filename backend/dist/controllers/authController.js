"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const generateToken = (userId) => {
    // Get JWT settings from environment variables with fallbacks
    const expiryTime = process.env.JWT_EXPIRES_IN || '7d';
    const secretKey = process.env.JWT_SECRET || 'fallback-secret-key-for-development-only';
    // Create the payload
    const payload = { id: userId.toString() };
    // Bypass TypeScript checking for this line
    // @ts-expect-error - The jsonwebtoken types have inconsistencies that cause false errors
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: expiryTime });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        console.log('Registration attempt:', { username, email }); // Debug log
        // Check if user already exists
        const existingUser = yield User_1.User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            console.log('User already exists:', email); // Debug log
            return res.status(400).json({
                message: 'User with this email or username already exists'
            });
        }
        // Create new user
        const user = yield User_1.User.create({
            username,
            email,
            password
        });
        console.log('User created successfully:', user._id); // Debug log
        // Generate token using the MongoDB ObjectId
        const token = generateToken(user._id);
        console.log('Token generated:', token.substring(0, 20) + '...'); // Debug log - only show part of token for security
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error); // Debug log
        const customError = error;
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: customError.message
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', email); // Debug log
        // Find user by email
        const user = yield User_1.User.findOne({ email }).exec();
        if (!user) {
            console.log('User not found:', email); // Debug log
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // Check password
        const isPasswordValid = yield user.comparePassword(password);
        if (!isPasswordValid) {
            console.log('Invalid password for user:', email); // Debug log
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // Generate token
        const token = generateToken(user._id);
        console.log('Login successful, token generated:', token.substring(0, 20) + '...'); // Debug log
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error('Login error:', error); // Debug log
        const customError = error;
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: customError.message
        });
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map
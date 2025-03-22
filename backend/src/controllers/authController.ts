import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Types } from 'mongoose';

// Define proper error type
interface CustomError extends Error {
  message: string;
  code?: number;
}

const generateToken = (userId: Types.ObjectId): string => {
  // Get JWT settings from environment variables with fallbacks
  const expiryTime = process.env.JWT_EXPIRES_IN || '7d';
  const secretKey = process.env.JWT_SECRET || 'fallback-secret-key-for-development-only';
  
  // Create the payload
  const payload = { id: userId.toString() };
  
  // Bypass TypeScript checking for this line
  // @ts-expect-error - The jsonwebtoken types have inconsistencies that cause false errors
  return jwt.sign(payload, secretKey, { expiresIn: expiryTime });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    console.log('Registration attempt:', { username, email }); // Debug log

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log('User already exists:', email); // Debug log
      return res.status(400).json({
        message: 'User with this email or username already exists'
      });
    }

    // Create new user
    const user = await User.create({
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
  } catch (error) {
    console.error('Registration error:', error); // Debug log
    const customError = error as CustomError;
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: customError.message
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email); // Debug log

    // Find user by email
    const user = await User.findOne({ email }).exec();
    if (!user) {
      console.log('User not found:', email); // Debug log
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
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
  } catch (error) {
    console.error('Login error:', error); // Debug log
    const customError = error as CustomError;
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: customError.message
    });
  }
};
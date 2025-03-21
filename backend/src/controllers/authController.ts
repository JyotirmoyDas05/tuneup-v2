import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
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
    const user = new User({
      username,
      email,
      password
    });

    await user.save();
    console.log('User created successfully:', user._id); // Debug log

    // Generate token
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
  } catch (error: any) {
    console.error('Registration error:', error); // Debug log
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email); // Debug log

    // Find user by email
    const user = await User.findOne({ email });
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
  } catch (error: any) {
    console.error('Login error:', error); // Debug log
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};
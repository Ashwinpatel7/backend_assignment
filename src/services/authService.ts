import bcrypt from 'bcrypt';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { createError } from '../middleware/errorHandler';
import { UserResponse } from '../types';

export class AuthService {
  static async signup(name: string, email: string, password: string, role: 'user' | 'admin' = 'user') {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw createError('Email already registered', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    const userResponse: UserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return { user: userResponse, token };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw createError('Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw createError('Invalid credentials', 401);
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    const userResponse: UserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return { user: userResponse, token };
  }

  static async requestPasswordReset(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw createError('Email not found', 404);
    }

    // In a real application, you would generate a reset token and send email
    // For this demo, we'll just return a success message
    return { message: 'Password reset instructions sent to your email' };
  }
}
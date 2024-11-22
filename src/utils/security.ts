import { serialize, parse } from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const COOKIE_NAME = 'auth_token';

export const createToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const setCookie = (
  name: string,
  value: string,
  options: Record<string, any> = {}
): string => {
  return serialize(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    ...options,
  });
};

export const parseCookies = (cookieHeader: string): Record<string, string> => {
  return parse(cookieHeader || '');
};

export const clearAuthCookie = (): string => {
  return setCookie(COOKIE_NAME, '', { maxAge: -1 });
};

// XSS Prevention
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// CSRF Token Generation
export const generateCSRFToken = (): string => {
  return jwt.sign({ timestamp: Date.now() }, JWT_SECRET, { expiresIn: '1h' });
};
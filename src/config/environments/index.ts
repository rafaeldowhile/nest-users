import * as dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGO_URL = process.env.DB_HOST;
export const JWT_API_SECRET = process.env.JWT_API_SECRET;

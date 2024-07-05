import dotenv from 'dotenv';
dotenv.config();

export const SECRET: string = process.env.SECRET || "12345678901234567890123456789012";
export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || "452985478462667";
export const CLOUDINARY_API_SECRET: string =
  process.env.CLOUDINARY_API_SECRET || "0TyHrnVK_R8DXqgU9kRDSwYBrI4";
export const CLOUDINARY_CLOUD_NAME: string =
  process.env.CLOUDINARY_CLOUD_NAME || "dhxvopzik";
export const DATABASE_URL: string = "mongodb+srv://dhimazpdt:b645DZSLcyla7ysI@belajar-backend.awfhlks.mongodb.net/?retryWrites=true&w=majority&appName=belajar-backend";

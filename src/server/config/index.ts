import * as dotenv from "dotenv";

dotenv.config();

export const dbCredentials = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE
};

export const jwtCredentials = {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES
};
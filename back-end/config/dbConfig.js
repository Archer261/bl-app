import dotenv from 'dotenv';

dotenv.config();
const dbConfig = {
    url: process.env.BUCKET_URL, // MongoDB connection URL
    database: process.env.BUCKET_DB_NAME, // Name of your database
    imgBucket: process.env.BUCKET_IMG_NAME, // Name of your GridFS bucket for storing images
};

export default dbConfig;
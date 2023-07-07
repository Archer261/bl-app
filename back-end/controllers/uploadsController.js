import express from 'express';
import cloudinary from 'cloudinary'
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary'



// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: async (req, file) => 'png', // or any desired format
        public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Unique filename
    },
});

// Configure multer upload
const upload = multer({ storage: storage });

export const uploadImage = async (req, res) => {
    try {
        upload.single('image');
        // Image upload successful, send the response or perform additional operations
        res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to save image' });
    }

};
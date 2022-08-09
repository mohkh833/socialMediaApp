import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },

    filename: function (req: any, file: any, cb: any) {
        const fullName =
        uuidv4().replace(/-/g, "") + path.extname(file.originalname)
        cb(null, fullName) 
    },
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};

const upload = multer({storage: storage, fileFilter : fileFilter});

export default upload
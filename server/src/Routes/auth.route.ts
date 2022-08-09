import express from 'express'
import { body } from 'express-validator'
import * as controllers from "../Controllers/auth.controller"
import upload from "../storage/storage";

const router = express.Router()
router.post('/register',
    upload.single('images')
    ,body('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
    body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars along'),
    controllers.register
)

router.post('/login', controllers.login)

router.post('/logout', controllers.logout)

export default router
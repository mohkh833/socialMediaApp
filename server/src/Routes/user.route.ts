import express from 'express'
import * as controllers from "../Controllers/user.controller"
import { body } from 'express-validator'
import * as verify from "../middleware/auth.middleware";
import upload from "../storage/storage";
const router = express.Router()

router.put('/:id',
    verify.verifyUser,
    upload.single('images'),
    // body('email').isEmail().withMessage('Invalid Email').normalizeEmail().optional({nullable: true}),
    // body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars along').optional({nullable: true}),
    controllers.update
)

router.get('/:id',
    controllers.getUser
)

router.get("/",
    controllers.getAllUsers,
    verify.verifyAdmin
)

export default router
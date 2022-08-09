import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import { validationResult } from "express-validator";
const userModel = new UserModel();

export const update = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const user = await userModel.update(req.body,req.params.id,req.file?.path);
        res.json({
            status: "success",
            data: { ...user },
            message: "User updated successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const user = await userModel.getUser(req.params.id)

        res.json({
            status:"success",
            data:user,
            message: "User Found"
        })
    } catch(err){
        next(err)
    }
}

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const users = await userModel.getAllUsers()

        res.json({
            status:"success",
            data:{...users},
            message: "Users Found"
        })
    } catch(err){
        next(err)
    }
}


import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import AuthModel from "../models/auth.model";
import { IGetUserAuthInfoRequest } from "../interface/request.interface";

const authModel = new AuthModel();

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    
    try {
        let newUser = await authModel.register(req.body,req.file?.path);
        res.status(201).json({
            status: "success",
            data: newUser,
            message: "User registered successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await authModel.login(req.body);
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "the username and password do not match please try again",
            });
        }

        const accessToken = jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );
        return res.json({
            status: "success",
            data: { ...user, accessToken },
            message: "user authenticated successfully",
        });
    } catch (err) {
        return next(err);
    }
};

export const logout = async(
    req:IGetUserAuthInfoRequest,
    res:Response,
    next:NextFunction
) => {
    try{
        delete req.user
        res.status(200).json({
            status: 'Bye!'
        });
    } catch(err){
        return next(err);
    }
}

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Error from "../interface/error.interface";
import { IGetUserAuthInfoRequest } from "../interface/request.interface";

const handleUnauthorizedError = (next: NextFunction, message: string) => {
  const error: Error = new Error(message);
  error.status = 401;
  next(error);
};

const verifyToken = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json(err);
      req.user = user;
      next();
    });
  } else
    return handleUnauthorizedError(next, "Login Error, Please login again");
};

export const verifyAdmin = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      handleUnauthorizedError(next, "You are not allowed to do this");
    }
  });
};

export const verifyUser = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.userId || req.user.isAdmin || req.user.id == req.params.id ) {
      next();
    } else {
      handleUnauthorizedError(next, "You are not allowed to do this");
    }
  });
};

module.exports = { verifyAdmin, verifyUser };

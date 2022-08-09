import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import CommentModel from "../models/comment.model";

const comment = new CommentModel();

export const createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array()[0].msg });
    try {
        const savedComment = await comment.create(req.body);
        res.status(201).json({
            status: "success",
            data: savedComment,
            message: "comment created successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const getCommentById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { commentId } = req.params;
    try {
        const returnedComment = await comment.getComment(+commentId);

        if (!returnedComment) return res.status(404).json("Not Found");

        res.status(200).json({
            status: "success",
            data: returnedComment,
            message: "comment returned successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const editComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { commentId } = req.params;
    const content = req.body.comment_content;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let editedComment = await comment.edit(+commentId, req.body);
        if (editComment == null)
            res
                .status(401)
                .json({ status: "error", message: "comment can't be found" });

        res.status(200).json({
            status: "success",
            data: editedComment,
            message: "comment returned successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    try {
        let Deletedcomment = await comment.delete(+commentId);
        if (!Deletedcomment)
            return res
                .status(401)
                .json({ status: "error", message: "comment can't be found" });

        res.status(200).json("Deleted Successfully");
    } catch (err) {
        res.status(500).json(err);
    }
};

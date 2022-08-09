import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import PostModel from "../models/post.model";

const prisma = new PrismaClient();

const postModel = new PostModel();

export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        req.body.user_id = +req.body.user_id  
        const savedPost = await postModel.create(req.body,req.file?.path);
        res.status(201).json({
            status: "success",
            data: savedPost,
            message: "Post created successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const getPostComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { postId } = req.params;

    try {
        const postComment = await postModel.getPostComment(+postId);
        res.status(200).send(postComment);
    } catch (err) {
        next(err);
    }
};

export const getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const posts = await postModel.getAllPosts();

        if (posts == null) return res.status(404).send("posts not found");

        res.status(200).json({
            status: "success",
            data: posts,
            message: "Post returned successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const getPostByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;
    try {
        const posts = await postModel.getPostByUserId(+userId);
        if (posts.length == 0) return res.status(404).json("Not found");
        res.status(200).json({
            status: "success",
            data: posts,
            message: "Post returned successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const editPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(req.file)
    const { postId } = req.params;
    console.log(postId)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let post = await postModel.editPost(+postId, req.body,req.file?.path);

        if (!post) return res.status(404).json("NOT FOUND");

        
        res.status(200).json({
            status: "success",
            data: post,
            message: "Post updated successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { postId } = req.params;
    try {
        let post = await postModel.deletePost(+postId);

        if (!post) return res.status(404).json("NOT FOUND");

        res.status(200).json({
            status: "success",
            message: "Post deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const searchPost = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const title = req.body.title
    try{
        let result = await postModel.searchPost(title)

        if(!result) return res.status(404).json("NOT FOUND");

        res.status(200).json({
            status: "success",
            data: result,
            message: "Post found successfully",
        });

    } catch(err){
        next(err)
    }
}

export const getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { postId } = req.params;
    try {
        const post = await postModel.getpost(+postId);
        if (!post) return res.status(404).json("Not found");
        res.status(200).json({
            status: "success",
            data: post,
            message: "Post returned successfully",
        });
    } catch (err) {
        next(err);
    }
};

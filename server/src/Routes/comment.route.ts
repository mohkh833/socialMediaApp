import express from "express";

import { body } from "express-validator";

import * as controllers from "../Controllers/comment.controller"

import * as verify from "../middleware/auth.middleware";
const router = express.Router();

router.post(
    "/",
    controllers.createComment
);

router.get("/:commentId", controllers.getCommentById);

router.put("/:commentId",
        controllers.editComment
);

router.delete("/:commentId", controllers.deleteComment);

export default router
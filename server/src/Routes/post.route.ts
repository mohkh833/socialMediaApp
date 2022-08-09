import express , {Request, Response}from "express";
import { body } from "express-validator";
import * as controllers from "../Controllers/post.controller"
import * as verify from "../middleware/auth.middleware";
import upload from "../storage/storage";

const router = express.Router();

router.post(
  "/",
  upload.single('images')
  ,
  body("content")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars along"),
  controllers.createPost
);

router.get("/", controllers.getAllPosts)

router.get("/getPostComment/:postId", controllers.getPostComment);

router.get("/getByUser/:userId", verify.verifyUser, controllers.getPostByUserId)

router.get("/:postId", controllers.getPostById)

router.put("/:postId",
  upload.single('images'),
    controllers.editPost
)

router.delete("/:postId",  controllers.deletePost)

router.post("/search", controllers.searchPost)

// router.post("/imageUpload", upload.single('images'), (req:Request, res:Response) => {
//   console.log(req.file)
//   res.status(201).json({
//     status: "success",
//     message: "User registered successfully",
// });
// })

export default router

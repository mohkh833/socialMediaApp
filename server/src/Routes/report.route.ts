import express from "express";

import { body } from "express-validator";

import * as controllers from "../Controllers/report.controller"
import * as verify from "../middleware/auth.middleware";

const router = express.Router();

router.post("/post",
    body("content")
        .isLength({ min: 2 })
        .withMessage("must be at least 2 chars along"),
    controllers.reportPost
)

router.post("/comment",
    body("content")
        .isLength({ min: 2 })
        .withMessage("must be at least 2 chars along"),
    controllers.reportComment
)

router.get("/:reportId", verify.verifyAdmin,controllers.getReportById)

router.get("/", verify.verifyAdmin,controllers.getAllReports)


export default router

import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ReportModel from "../models/report.model";

const report = new ReportModel();

export const reportPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const ReportedPost = await report.reportPost(req.body);
        res.status(201).json({
            status: "success",
            data: ReportedPost,
            message: "post reported successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const reportComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const ReportedComment = await report.reportComment(req.body);
        res.status(201).json({
            status: "success",
            data: ReportedComment,
            message: "comment reported successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const getReportById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { reportId } = req.params;
    try {
        const returnedReport = await report.getReportById(+reportId);

        if (!returnedReport)
            res
                .status(404)
                .json({ status: "error", message: "report can't be found" });

        res.status(200).json({
            status: "success",
            data: returnedReport,
            message: "report returned successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const getAllReports = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const reports = await report.getAllReports();

        if (!reports)
            res
                .status(404)
                .json({ status: "error", message: "reports can't be found" });

        res.status(200).json({
            status: "success",
            data: reports,
            message: "report returned successfully",
        });
    } catch (err) {
        next(err);
    }
};

import { PrismaClient } from "@prisma/client";
import Report from "../types/report.type";

const prisma = new PrismaClient();

class ReportModel {
    async reportPost(report: Report): Promise<any> {
        try {
            const savedReport = await prisma.report.create({ data: report });
            return savedReport;
        } catch (err) {
            throw new Error(`Error at reporting posts ${(err as Error).message}`);
        }
    }

    async reportComment(report: Report): Promise<any> {
        try {
            const savedReport = await prisma.report.create({ data: report });
            return savedReport;
        } catch (err) {
            throw new Error(`Error at reporting comments ${(err as Error).message}`);
        }
    }

    async getReportById(reportId: number): Promise<any> {
        try {
            const report = await prisma.report.findUnique({
                where: {
                    id: reportId,
                },
                include: {
                    ReportedComment: true,
                    ReportedPost: true,
                },
            });
            if (!report) return null;
            return report;
        } catch (err) {
            throw new Error(`Error at returning report ${(err as Error).message}`);
        }
    }

    async getAllReports(): Promise<any> {
        try {
            const allReports = await prisma.report.findMany({
                include: {
                    ReportedPost: true,
                    ReportedComment: true,
                },
            });

            if (!allReports) return null;

            const reportedPosts = allReports.filter(report => report.ReportedComment == null)

            const reportedComments = allReports.filter(report => report.ReportedPost == null)

            return {reportedPosts, reportedComments};
            
        } catch (err) {
            throw new Error(`Error at returning reports ${(err as Error).message}`);
        }
    }
}

export default ReportModel;

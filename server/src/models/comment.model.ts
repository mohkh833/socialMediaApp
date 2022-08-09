import { PrismaClient } from "@prisma/client";
import Comment from "../types/comment.type";

const prisma = new PrismaClient();

class CommentModel {

    async checkcomment(commentId: number) {
        const checkcomment = await prisma.comment.findUnique({
            where: {
                id: +commentId,
            },
        });
        if(checkcomment!=null) return checkcomment
        return null
    }

    async create(comment: Comment): Promise<any> {
        try {
            const savedComment = await prisma.comment.create({ data: comment });
            return savedComment;
        } catch (err) {
            throw new Error(`Error at creating comment ${(err as Error).message}`);
        }
    }

    async getComment(commentId: number): Promise<any> {
        try {
            const comment = await prisma.comment.findUnique({
                where: {
                    id: commentId,
                },
                include: {
                    CommentedPost: true,
                },
            });

            if (!comment) return null;

            return comment;
        } catch (err) {
            throw new Error(`Error at creating comment ${(err as Error).message}`);
        }
    }

    async edit(commentId: number, comment: Comment): Promise<any> {
        try {
            // const checkcomment = await prisma.comment.findUnique({
            //     where: {
            //         id: +commentId,
            //     },
            // });

            const checkcomment = await this.checkcomment(commentId)

            if (!checkcomment) return null;

            let updateComment = await prisma.comment.update({
                where: {
                    id: +commentId,
                },
                data: {
                    content: comment.content,
                },
            });

            return updateComment;
        } catch (err) {
            throw new Error(`Error at creating comment ${(err as Error).message}`);
        }
    }

    async delete(commentId: number): Promise<any> {
        try {
            
            const checkcomment = await this.checkcomment(commentId)
            
            if (!checkcomment) return null;

            await prisma.comment.delete({
                where: {
                    id: +commentId,
                },
            });

            return "Deleted Successfully";
        } catch (err) {
            throw new Error(`Error at creating comment ${(err as Error).message}`);
        }
    }
}

export default CommentModel;

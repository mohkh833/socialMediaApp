import { PrismaClient } from "@prisma/client";
import Post from "../types/post.type";
import {deleteFile}  from "../utils/file";
const prisma = new PrismaClient();
import { v2 as cloudinary } from 'cloudinary'
class PostModel {

    async checkPost(postId : any)  {
        const checkpost = await prisma.post.findUnique({
            where: {
                id: +postId,
            },
        });
        if(checkpost!=null) return checkpost
        return null
    }
    async create(post: Post, image: any): Promise<any> {
        try {
            post.postImg = "empty"
            if(image!="" && image!= null && image!=undefined)
                post.postImg = image
            const savedPost = await prisma.post.create({ data: post });
            return savedPost;
        } catch (err) {
            throw new Error(`Error at creating posts ${(err as Error).message}`);
        }
    }

    async getPostComment(postId: number): Promise<any> {
        try {
            const postComment = await prisma.post.findUnique({
                where: {
                    id: +postId,
                },
                include: {
                    comments: {
                        include: {
                            CommentWriter: {
                                select: {
                                    id: true,
                                    name: true,
                                    imgUrl: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },
            });
            return postComment;
        } catch (err) {
            throw new Error(`Error at geting post ${(err as Error).message}`);
        }
    }

    async getAllPosts(): Promise<any> {
        try {
            const posts = await prisma.post.findMany({
                orderBy:{
                    createdAt: 'asc'
                },
                include: {
                    
                    postWriter: {
                        select: {
                            id: true,
                            name: true,
                            imgUrl: true,
                            email: true,
                        },
                        
                    },
                    
                    comments: {
                        select:{
                            id:true,
                            content:true,
                            CommentWriter:true
                        },
                        orderBy:{
                            createdAt: 'asc'
                        }
                    },
                },
            });
            if(posts.length ==0 ) return null;
            return posts;
        } catch (err) {
            throw new Error(`Error at geting posts ${(err as Error).message}`);
        }
    }

    async getPostByUserId(userId: number): Promise<any> {
        try {
            const posts = await prisma.post.findMany({
                where: {
                    user_id: +userId,
                },
            });
            return posts;
        } catch (err) {
            throw new Error(`Error at geting post ${(err as Error).message}`);
        }
    }

    async editPost(postId: number, post: Post, image: any): Promise<any> {
        try {
            const checkpost = await this.checkPost(postId)

            if (!checkpost) return null;

            if(image!=null){
                post.postImg = image
            }


            let updatedPost = await prisma.post.update({
                where: {
                    id: +postId,
                },
                data: post,
            });

            return updatedPost;
        } catch (err) {
            throw new Error(`Error at updating post ${(err as Error).message}`);
        }
    }

    async deletePost(postId: number): Promise<any> {
        try {
            const checkpost = await this.checkPost(postId)

            if (!checkpost) return null;

            // if(checkpost.postImg!=null){
            //     const imgId : string= checkpost.postImg.split("/").pop()?.split(".")[0]!;
            //     console.log(imgId)
            //     await  cloudinary.uploader.destroy(imgId, function(error:any,result:any) {
            //         console.log(result) })
            // }

            await prisma.post.delete({
                where: {
                    id: postId,
                },
            });

            return "Post deleted successfully";
        } catch (err) {
            throw new Error(`Error at deleting post ${(err as Error).message}`);
        }
    }

    async searchPost(text: string) : Promise<any>{
        try{
            
            let result = await prisma.post.findMany({
                where: {
                    title: {
                        contains: text,
                        mode: 'insensitive',
                    },
                }
            })

            
            if(result.length==0) return null
            return result
        } catch(err){
            throw new Error(`Error at deleting post ${(err as Error).message}`);
        }
    }

    async getpost(postId: number): Promise<any> {
        try {
            
            const post = await prisma.post.findUnique({
                where: {
                    id: +postId,
                },
            });
            if(!post) return null;
            return post;
        } catch (err) {
            throw new Error(`Error at geting post ${(err as Error).message}`);
        }
    }
}
export default PostModel;

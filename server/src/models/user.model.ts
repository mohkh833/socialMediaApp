import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import User from "../types/user.type";
import { deleteFile } from "../utils/file";
const prisma = new PrismaClient();

const hashPassword = (password: string) => {
    const salt = parseInt(process.env.PASS_SEC as string, 10);
    return bcrypt.hashSync(`${password}${process.env.pepper}`, salt);
};

class UserModel {

    async update(u: User, id: string, image: any): Promise<any> {
        let user = {
            email: u.email,
            name: u.name,
            password: u.password,
            imgUrl: image,
        };

        const checkUser = await prisma.user.findUnique({
            where: {
                id: +id,
            },
        });

        let userId = +id;
        if (user.password) {
            user.password = hashPassword(user.password as string);
        }
        try {
            if (user.email != undefined) {
                let Checkemail = await prisma.user.findUnique({
                    where: {
                        email: user.email,
                    },
                });

                if (Checkemail) throw new Error("Error at used email");
            }
            let user_updated = { ...user };
            await prisma.user.update({
                where: {
                    id: userId,
                },
                data: user_updated,
            });

            let updatedUser = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            return updatedUser;
        } catch (err) {
            throw new Error(`Error at updating users ${(err as Error).message}`);
        }
    }

    async getUser(id: String): Promise<any> {
        try {
            let user = await prisma.user.findUnique({
                where: {
                    id: +id,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    imgUrl: true,
                    isAdmin: true,
                },
            });

            if (!user) throw new Error("Couldn't Find User");

            return user;
        } catch (err) {
            throw new Error(`Error at retrieve user ${(err as Error).message}`);
        }
    }

    async getAllUsers(): Promise<any> {
        try {
            let users = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    imgUrl: true,
                    isAdmin: true,
                },
            });
            if (!users) throw new Error("Couldn't Find User");

            return users;
        } catch (err) {
            throw new Error(`Error at retrieving users ${(err as Error).message}`);
        }
    }
}

export default UserModel;

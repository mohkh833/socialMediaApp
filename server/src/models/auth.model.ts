import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import User from "../types/auth.type";


const prisma = new PrismaClient();

const hashPassword = (password: string) => {
    const salt = parseInt(process.env.PASS_SEC as string, 10);
    return bcrypt.hashSync(`${password}${process.env.pepper}`, salt);
};

class AuthModel {
    async register(u: User, image: any ): Promise<any> {
        
        let newUser = {
            email: u.email,
            name: u.name,
            password: u.password,
            imgUrl: u.imgUrl,
        };

        if(image=="")
            newUser.imgUrl = ""
        newUser.imgUrl= image

        newUser.password = hashPassword(newUser.password as string);

        try {
            const email = await prisma.user.findUnique({
                where: {
                    email: newUser.email,
                },
            });

            if (email == null) {
                const savedUser = await prisma.user.create({
                    data: {
                        email: newUser.email,
                        name: newUser.name,
                        password: newUser.password,
                        imgUrl: newUser.imgUrl,
                        isAdmin: false,
                    },
                });
                return savedUser;
            } else throw new Error("Error at used email");
        } catch (err) {
            throw new Error(`Error at registering users ${(err as Error).message}`);
        }
    }

    async login(u:User) : Promise<any>{
        try{
            const user = await prisma.user.findFirst({
                where: {
                    email:u.email
                }
            })
            if(!user){
                return null
            }
            else {
                
                const isPasswordValid = bcrypt.compareSync(
                    `${u.password}${process.env.pepper}`,
                    user.password
                )

                if (!isPasswordValid) {
                    return null
                } 
                else {
                    const {password, ...other} = user
                    return {...other}
                }
            }
            }catch(err){
                throw new Error(`Error at auth user ${(err as Error).message}`);
            }
    }
}

export default AuthModel;

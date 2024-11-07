import { hashPassword, comparePasswords } from "@/utils/auth";
import { generateToken, verifyToken } from "@/utils/token";
import prisma from "@/prisma";

export async function POST_login(req) {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, password: true, role: true }
        });
        if (!user) {
            return {
                status: 404,
                message: "User not found"
            };
        }
        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
            return {
                status: 401,
                message: "Invalid credentials"
            };
        }
        const token = generateToken({ id: user.id, role: user.role });
        return {
            status: 200,
            message: "Login successful",
            token
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "Internal server error"
        };
    }    
}
import { prisma } from "../config/prismaClient.js"
import jwt from 'jsonwebtoken'

export const findUserByEmail = async (email) => {
    const user = await prisma.user.findFirst({
        where:{email : email}
    })
    return user
}

export const createUser = async (username, email, hashPassword, role) =>{
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashPassword,role
        }
    })
    return newUser
}

export const createToken = async (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d'
    })
    return token
}


export const findUserById = async (id) => {
    const user = await prisma.user.findFirst({
        where:{id : id}
    })
    return user
}

export const editUser = async(email, hashPassword, username) => {
    const reesult = await prisma.user.update(
        {
            where: {email : email},
            data: {
                username,
                password : hashPassword
            }
        }
    )
    return reesult
}


import createError from 'http-errors'
import { createToken, createUser, findUserByEmail } from '../service/auth.service.js'
import bcrypt from 'bcrypt'

export async function registerController(req, res, next){
    const {username, email, role, password} = req.body

    try {
        const user = await findUserByEmail(email)
        if(user){
            throw createError(400,"Email already exist")
        }
        const hashPassword = await bcrypt.hash(password,5)
        const newUser =await createUser(username,email,hashPassword,role)
        res.status(201).json({
            message: "Register Success",
            user: {
                id: newUser.id,
                username: newUser.user,
                email: newUser.email,
                role: newUser.role
            }
        })

    }catch(error){
       next(error)
    }
}


export async function loginController (req, res, next) {
    const {email, password} = req.body
    try{
        const user = await findUserByEmail(email)
        const isMatch = await bcrypt.compare(password, user.password)
        if(!user || !isMatch){
            throw createError(401, "Invalid User")
        }
        const token = await createToken(user)
        res.status(201).json({
            message: "Login Success",
            token: token,
            user: {
                id: user.id,
                username: user.user,
                email: user.email,
                role: user.role
            }
        })
    }catch(error){
        next(error)

    }
}
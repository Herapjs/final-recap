import bcrypt from 'bcrypt'
import { editUser } from '../service/auth.service.js'


export function getMeController (req, res){
    const {id, usernsme, email, role} = req.user
    res.status(200).json({id, usernsme, email, role})
}

export async function editMeController(req, res, next) {
    const { email } = req.user
    const { username, password } = req.body
    try {
        const hashPassword = await bcrypt.hash(password, 5)
        await editUser(email, username, hashPassword)
        res.status(200).json({ message: "Profile updated" })

    } catch (error) {
        next(error)
    }
    res.send("edit me")
}


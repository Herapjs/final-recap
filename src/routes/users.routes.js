import express from "express"
import authCheck from "../middlewares/authen.middlewares.js"
import { editMeController, getMeController } from "../controller/users.controller.js"

const userRouter = express.Router()

userRouter.get("/me", authCheck, getMeController)

userRouter.put("/me", authCheck, editMeController)

export default userRouter
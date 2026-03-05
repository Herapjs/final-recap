import express from "express"
import authCheck from "../middlewares/authen.middlewares.js"
import { deleteDesertsController, getDessertsController, postDessertsController } from "../controller/dessert.controller.js"

const dessertsRouter = express.Router()

dessertsRouter.get("/", authCheck, getDessertsController)

dessertsRouter.post("/", authCheck ,postDessertsController)
dessertsRouter.delete("/:id", authCheck, deleteDesertsController)

export default dessertsRouter
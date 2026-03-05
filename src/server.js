import "dotenv/config";
import express from 'express'
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/users.routes.js";
import dessertsRouter from "./routes/dessert.routes.js";
import errHandler from "./middlewares/errHandler.js";


const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/desserts", dessertsRouter)
app.use("/reviews", (req, res) => {
    res.send("หิวข้าวแล้ว")
})

app.use(errHandler)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

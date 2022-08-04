import express from "express"
import mongoose from "mongoose";
import userRouts from "./routs/userRout.js";
import projectRout from "./routs/projectRout.js";
import orderRout from "./routs/oredrRout.js";
import cors from "cors"
const app = express()
app.use(cors())
const PORT = 4000
app.use(express.json())
app.use(userRouts)
app.use(projectRout)
app.use(orderRout)
const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://yaroslav:yaroslav17@creatory.1wboc.mongodb.net/?retryWrites=true&w=majority")
        app.listen(PORT, () => {
            console.log(`server start in http://localhost:${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
import express from "express";
import {create, getAll, getCategory} from "../controller/ProjectController.js";
import cheakAuth from "../utils/cheakAuth.js"

const projectRout = express.Router()
projectRout.post("/project/create", cheakAuth, create)
projectRout.get("/project", getAll)
projectRout.get("/project/:category", getCategory)
export default projectRout
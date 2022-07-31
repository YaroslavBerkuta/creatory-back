import express from "express";
import {create, login} from "../controller/UserController.js";
import {registerValidator, loginValidator} from "../validator/user.js";

const userRouts = express.Router()
userRouts.post("/user/register", registerValidator, create)
userRouts.post("/user/login", loginValidator, login)
export default userRouts
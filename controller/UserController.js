import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {validationResult} from "express-validator";
import UserSchema from "../model/User.js";

export const create = async (req, res) => {
    try {
        const error = validationResult(req)
        const {name, password, email} = req.body
        if (!error.isEmpty()) {
            return res.status(400).json({
                message: "Невірні дані", errors: error.array()
            })
        }
        const oldUser = await UserSchema.findOne({email})
        if (oldUser) {
            return res.status(100).json({
                message: "Користувач уже існує увійдуть в акаунт"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const doc = new UserSchema({
            name, email, password: hashPassword
        })
        const user = await doc.save()
        const token = jwt.sign(
            {user_id: user._id, userRules: user.rules},
            "privet",
            {
                expiresIn: "30d",
            }
        );

        return res.status(200).json({...user._doc, token})
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не вдалося зареіструвати користувача"
        })
    }
}


export const login = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({
                message: "Невірні дані", errors: error.array()
            })
        }
        const {email, password} = req.body
        const user = await UserSchema.findOne({email})
        if (!user) {
            return res.status(404).json({
                message: "користувач не знайдений"
            })
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(404).json({
                message: "Не вірний пароль"
            })
        }
        const token = jwt.sign(
            {user_id: user._id, userRules: user.rules},
            "privet",
            {
                expiresIn: "30d",
            }
        );
        res.status(200).json({
            message: `ви успішно увійшли в акаунт`,
            token
        })
    } catch (e) {
        console.log(e)
    }

}
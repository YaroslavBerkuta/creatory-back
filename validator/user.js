import {body} from "express-validator";

export const registerValidator = [body("email").isEmail(), body("password", "Не коректний пароль або email").isLength({min: 5}), body('name').isString()]
export const loginValidator = [
    body("email").isEmail(),
    body("password", "Не коректний логін або пароль").isLength({min: 5})
]
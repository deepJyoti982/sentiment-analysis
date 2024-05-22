import { check } from "express-validator";


export class UserValidator {
    constructor() { };

    registerUser(): object {
        return [
            check('name')
                .trim()
                .not()
                .isEmpty()
                .withMessage("name is required!")
                .isByteLength({ min: 3 })
                .withMessage("name should contain atleast 3 characters."),
            check('email')
                .trim()
                .not()
                .isEmpty()
                .withMessage("email is required!")
                .isEmail()
                .withMessage("Invalid email id!"),
            check('password')
                .trim()
                .not()
                .isEmpty()
                .withMessage("password is required!")
                .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$/)
                .withMessage('Password should contain atleast one number, one special character, one capital letter, one small letter and minimum length should be 6 and maximum length should be 16.')
        ]
    }

    userLogin(): object {
        return [
            check('user_email')
                .trim()
                .not()
                .isEmpty()
                .withMessage("user email is required!")
                .isEmail()
                .withMessage("invalid email id"),
            check('password')
                .trim()
                .not()
                .isEmpty()
                .withMessage("password is required!")
                .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$/)
                .withMessage("Password should contain atleast one number, one special character, one capital letter, one small letter and minimum length should be 6 and maximum length should be 16.")
        ]
    }
}
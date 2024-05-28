import express, { Request, Response, NextFunction } from 'express';
import { UserController } from '../controller/userController';
import { UserValidator } from '../middleware/userMiddleware';
import { validatorCls } from '../../../helper/commonMiddleware';


/* Instance of Classes */
const userController = new UserController();
const userMiddleware = new UserValidator();
const commonValidator = new validatorCls();


const router = express.Router();
let middlewares = [];
const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => global.HELPER.methodNotAllowedStatusBuild(res, 'method not allowed.');


middlewares = [
    commonValidator.validateFormData,
    userMiddleware.registerUser(),
    commonValidator.checkForErrors
]
router.route('/register-user')
    .post(middlewares, userController.registerUser)
    .all(methodNotAllowed)


middlewares = [
    commonValidator.validateFormData,
    userMiddleware.userLogin(),
    commonValidator.checkForErrors
]
router.route('/login')
    .post(middlewares, userController.userLogin)
    .all(methodNotAllowed)




export { router as userRoute }
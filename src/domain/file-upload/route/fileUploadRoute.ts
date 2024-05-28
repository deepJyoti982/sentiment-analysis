import express, { Request, Response, NextFunction } from 'express';
import { FileUploadController } from '../controller/fileUploadController';
import { FileUploadValidator } from '../middleware/fileUploadMiddleware';
import { validatorCls } from '../../../helper/commonMiddleware';


/* Instances of Classes */
const fileUploadController = new FileUploadController();
const fileUploadMiddleware = new FileUploadValidator();
const commonValidator = new validatorCls();


const router = express.Router();
let middlewares = [];
const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => global.HELPER.methodNotAllowedStatusBuild(res, 'method not allowed.');


middlewares = [
    commonValidator.validateFormData,
    commonValidator.validateToken,
    fileUploadMiddleware.fileUpload(),
    commonValidator.checkForErrors
]
router.route('/file-upload')
    .post(middlewares, fileUploadController.uploadFile)
    .all(methodNotAllowed)


middlewares = [
    commonValidator.validateToken
]
router.route('/get-files')
    .get(middlewares, fileUploadController.getFile)
    .all(methodNotAllowed)


export { router as fileUploadRoute }
import express, { Request, Response, NextFunction } from 'express';
import { SentimentController } from '../controller/sentimentController';
import { SentimentValidator } from '../middleware/sentimentMiddleware';
import { validatorCls } from '../../../helper/commonMiddleware';


/* Instance of Classes */
const sentimentController = new SentimentController();
const sentimentValidator = new SentimentValidator();
const commonValidator = new validatorCls();


const router = express.Router();
let middlewares = [];
const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => global.HELPER.methodNotAllowedStatusBuild(res, 'method not allowed.');


middlewares = [
    commonValidator.validateFormData,
    commonValidator.validateToken,
    sentimentValidator.sentimentAnalysis(),
    commonValidator.checkForErrors
]
router.route('/sentiment-analysis')
    .post(middlewares, sentimentController.userSentiment)
    .all(methodNotAllowed)




export { router as sentimentRouter };
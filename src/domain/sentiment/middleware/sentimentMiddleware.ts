import { check } from "express-validator";


export class SentimentValidator {
    constructor() { };

    sentimentAnalysis(): object {
        return [
            check('user_text')
                .trim()
                .not()
                .isEmpty()
                .withMessage("user text is required!")
        ]
    }
}
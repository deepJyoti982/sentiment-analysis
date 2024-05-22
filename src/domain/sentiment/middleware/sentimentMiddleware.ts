import { check } from "express-validator";


export class SentimentValidator {
    constructor() { };

    sentimentAnalysis(): object {
        return [
            check('user_text')
                .trim()
                .not()
                .isEmpty()
                .withMessage("user text is required!"),
            check('file')
                .not()
                .isEmpty()
                .withMessage("File is required!")
                .custom((value, { req }) => {
                    if (typeof value !== 'string') {
                        if (value.length > 1) {
                            throw new Error("Upload one file at a time.")
                        }
                        if (value[0].originalFilename !== "" && value[0].size !== 0) {
                            let fileExtnsn = value[0].originalFilename.split('.').pop();
                            if (['png', 'jpg', 'jpeg', 'mp3', 'mp4'].includes(fileExtnsn) !== true) {
                                throw new Error("File extension should be 'png', 'jpg', 'jpeg', 'mp3', 'mp4' only.")
                            }
                            if (value[0].size > process.env.MAX_FILE_SIZE) {
                                throw new Error("Maximum file size should be 10mb.")
                            }
                            return true;
                        }
                    }
                    throw new Error("Please upload a file.")
                })
        ]
    }
}
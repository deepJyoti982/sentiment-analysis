import fs from 'fs';
import Sentiment from 'sentiment';
import { Request, Response } from "express";
import sentimentModel from "../model/sentimentModel";



export class SentimentController {
    sentiment: Sentiment
    constructor() {
        this.sentiment = new Sentiment();
    };


    /* userSentiment = async (req: Request, res: Response) => {
        try {
            const { user_text, file } = req.body;
            
            fs.readFile(file[0].path, { encoding: 'base64' }, function (err, data) {
                if (err) {
                    return global.HELPER.badRequestStatusBuild(res, "Something went wrong!")
                }


                let fileBuffer = Buffer.from(data, "base64");
                console.log(fileBuffer)
                // fs.writeFileSync("new-img.jpg", fileBuffer)
            })

            // console.log("decoded_file:", decodedBinaryFile)
        } catch (error) {
            console.log(error);
        }
    } */


    /* userSentient = async (req: Request, res: Response) => {
        try {
            const user_text = req.body.text;
            const score = this.sentiment.analyze(user_text);
            let user_sentiment = '';

        } catch (error) {
            console.log(error);
        }
    } */
}
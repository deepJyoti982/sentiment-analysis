import Sentiment from 'sentiment';
import { Request, Response } from "express";
import sentimentModel from "../model/sentimentModel";
import { ISaveSentiment } from '../interface/sentimentInterface';



export class SentimentController {
    sentiment: Sentiment
    constructor() {
        this.sentiment = new Sentiment();
    };


    userSentiment = async (req: Request, res: Response) => {
        try {
            const user_text = req.body.user_text;
            let loginDetails = req.body.loginDetails;

            const sentiment_analyze = this.sentiment.analyze(user_text);
            let user_sentiment = '';
            if (sentiment_analyze.score > 0) {
                user_sentiment = 'Positive';
            } else if (sentiment_analyze.score < 0) {
                user_sentiment = 'Negative'
            } else {
                user_sentiment = 'Neutral'
            }

            let saveSentiObj: ISaveSentiment = {
                userId: global.HELPER.decryptId(loginDetails.user_id),
                user_text,
                user_sentiment
            }

            let saveSentiment = await sentimentModel.create(saveSentiObj);
            if (saveSentiment) {
                return global.HELPER.successStatusBuild(res, saveSentiment, "sentiment saved successfully.");
            }
        } catch (error) {
            console.log(error);
            return global.HELPER.badRequestStatusBuild(res, "something went wrong!");
        }
    }


    getSentiment = async (req: Request, res: Response) => {
        try {
            const userSentiments = await sentimentModel.find({}).populate('userId', { _id: 0, createdAt: 0, password: 0, updatedAt: 0, __v: 0 });

            if (userSentiments.length) {
                return global.HELPER.successStatusBuild(res, userSentiments, "user sentiment fetched successfully.");
            } else {
                return global.HELPER.successStatusBuild(res, userSentiments, "No data found.");
            }
        } catch (error) {
            console.log(error);
            return global.HELPER.badRequestStatusBuild(res, "something went wrong!");
        }
    }
}
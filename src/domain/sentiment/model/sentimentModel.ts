import mongoose from "mongoose";


const sentimentSchema = new mongoose.Schema({
    user_text: {
        type: String,
        required: true
    },
    user_sentiment: {
        type: String,
        enum: ['Positive', 'Negative', 'Neutral']
    },
    file: {
        type: Buffer,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Sentiment', sentimentSchema)
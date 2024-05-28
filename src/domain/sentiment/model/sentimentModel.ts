import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;


const sentimentSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    user_text: {
        type: String,
        required: true
    },
    user_sentiment: {
        type: String,
        enum: ['Positive', 'Negative', 'Neutral']
    }
}, { timestamps: true })

export default mongoose.model('Sentiment', sentimentSchema)
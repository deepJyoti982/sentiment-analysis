import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;


const fileSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    file: {
        type: Buffer,
        required: true
    }
}, { timestamps: true })


export default mongoose.model('File', fileSchema);


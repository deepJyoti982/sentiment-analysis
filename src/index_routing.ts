import express from 'express';
import { userRoute } from './domain/user/route/userRoute';
import { sentimentRouter } from './domain/sentiment/route/sentimentRoute';
import { fileUploadRoute } from './domain/file-upload/route/fileUploadRoute';
const app = express();


/* All Module Routing */
app.use('/user', userRoute);
app.use('/sentiment', sentimentRouter);
app.use('/file', fileUploadRoute)


export { app as index_route }
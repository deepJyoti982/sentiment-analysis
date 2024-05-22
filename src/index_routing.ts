import express from 'express';
import { userRoute } from './domain/user/route/userRoute';
import { sentimentRouter } from './domain/sentiment/route/sentimentRoute';
const app = express();


/* All Module Routing */
app.use('/user', userRoute)
app.use('/sentiment', sentimentRouter)


export { app as index_route }
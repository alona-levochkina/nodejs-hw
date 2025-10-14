import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import { connectMongoDB } from "./db/connectMongoDB.js";
import notesRouter from './routes/notesRoutes.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

app.use(logger);
app.use(express.json());
app.use(cors());


app.use(notesRouter);

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

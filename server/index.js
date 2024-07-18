import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { connectDB } from './config/database.js';
import postRoutes from './routes/postRoutes.js';
// import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp",
}));

// Define your API routes
app.use('/api/v1/posts', postRoutes);
// app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from HuggingFace!',
  });
});

app.get('/api/v1/', (req, res) => {
  res.send('API is working');
});

const startServer = async () => {
  try {
    await connectDB();  // Ensure you wait for the DB connection
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();

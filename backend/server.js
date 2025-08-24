import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './Db/dbConnect.js';
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
connectDB();
// Routes
import companyRoutes from './Routes/companyRoutes.js';
app.use('/api', companyRoutes);
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

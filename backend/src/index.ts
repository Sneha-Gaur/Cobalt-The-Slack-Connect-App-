
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db';
import cron from 'node-cron';
import { sendScheduledMessages } from './utils/scheduler.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js';

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await connectDB();
  
  console.log(`Server running at http://localhost:${PORT}`);

    cron.schedule('* * * * *', async () => {
    console.log('Checking for scheduled messages...');
    console.log("Wait Sagar");
    await sendScheduledMessages();
  });

});



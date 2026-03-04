import express from 'express';
import cors from 'cors';
import { dbconnection } from './src/config/db.config.js'
import { adminseed } from './src/utils/admin.seed.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

dbconnection();

adminseed();

app.get('/', (req, res) => {
    console.log("Working...");
    res.status(200).json({message: "working"});
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
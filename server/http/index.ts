import express from 'express';
import 'dotenv/config';
import mongoose from "mongoose";
const cors = require("cors");

import router from "./routes/v1/index";

const app: express.Application = express();

// Database setup
const mongodbUrl: any = process.env.MONGODB_URI;
try {
    mongoose.connect(mongodbUrl);
    const db = mongoose.connection;
    db.on('error', (err) => console.log(err));
    db.once('open', () => console.log('Successfully connected to Database'));
} catch (err) {
    console.log(err);
}
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/", router);

// Server setup
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
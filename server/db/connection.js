require("dotenv").config()
const mongoose = require('mongoose');

const DB = process.env.DATABASE_SECRET_URL

mongoose.connect(DB)
    .then(() => console.log("Database Connected"))
    .catch((error) => {
        console.error("Database connection error:", error);
    });
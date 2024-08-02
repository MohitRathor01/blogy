const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config();

const blogRoutes = require("./Routes/Blog");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors({
    origin: 'https://hiringyou.000webhostapp.com/', // Frontend URL
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'no-referrer');
    next();
});

// Routes
app.use("/api/blogs", blogRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); 
    });

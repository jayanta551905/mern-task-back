const express=require("express");
const router=require("./src/routes/api");
const app = new express();
require("dotenv").config();


// Security middleware
const helmet=require("helmet");
const rateLimit=require("express-rate-limit");
const mongoSanitize=require("express-mongo-sanitize");
const cors=require("cors");
const hpp=require("hpp");
const xss=require("xss-clean");

// Database lib implement
const mongoose=require('mongoose');


// security middleware implementation
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(hpp());
app.use(xss());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended:false }));


// Request rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minute
    max: 100 // max limit per windowMs
});
app.use(limiter);

// DB connect
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Error =>".err))


// rate limit control
app.use("/api/v1", router);


// undefined route
app.use("*", (req, res)=>{
    res.status(404).json({
        status: "Failed",
        data: "Page not found"
    });
});


module.exports=app;
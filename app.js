import cors from "cors";
import express from "express";
import bodyparser from "body-parser";
import passport from "passport";
import errorHandler from "./middlewares/error.js";

//routes import

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import logOut from "./routes/logOut.js";

//cors setup
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

//express setup
const app = express()
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

app.use(passport.initialize(undefined));



app.use(errorHandler);


//api

app.use('/products', productRoutes)
app.use('/auth',authRoutes)
app.use('/logout',logOut)

export default app
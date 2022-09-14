import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import usersRoute from "./routes/user.js";
import servicesRoute from "./routes/service.js";
import authRoute from "./routes/auth.js";
import authRouteService from "./routes/authService.js";
import bodyParser from 'body-parser'
import cors from 'cors'

const app=express()
dotenv.config()

app.use(cors())
app.use(bodyParser.json());
app.use(express.json())





const connect =async()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to db')
  } catch (error) {
    throw(error);
  }
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Range, Accept");
  res.header("Access-Control-Expose-Headers", "X-Total-Count, Content-Range");
  res.header('Content-Range', 'services 0-20/20')
  next();
});
app.use("/api/users", usersRoute);
app.use("/api/services", servicesRoute);
app.use("/api",authRoute);
app.use("/apis",authRouteService);

app.listen(8800,()=>{
    connect();
    console.log("hi");
})
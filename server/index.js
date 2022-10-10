
const path = require("path")

const express = require("express");

const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require("body-parser")
const cors = require("cors")
console.log("String is",process.env.MONG_URI)

const app = express();
// app.use(express.json());
const todo = require("./routes/todo-router")
const PORT = process.env.PORT;
console.log(PORT)
app.use(express.json({ limit: '200mb' }) )
app.use(cors({credentials:true, origin:"http://localhost:3000"}))
app.use("/api",todo)
// __dirname=path.resolve();
console.log("dir name ha",__dirname)
// server production assets
if (process.env.NODE_ENV==="production"){
    console.log(
    )
    app.use(express.static("/client/build"));
    // app.get("*",(req,res)=> {
    //     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))})
    
}
mongoose.connect(process.env.MONG_URI,{ useNewUrlParser: true }).then(()=>{
    app.listen(process.env.PORT)
    console.log("mongo db is connected")
}).catch(err=>{
    console.log(err);
})


require('dotenv').config()
const express = require('express');
const app = express();
const path= require('path')
const Dbconnect = require('./src/config/dbcon')
Dbconnect()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"src","views"))

const authrouter = require('./src/router/apis/authrouter')
app.use("/api",authrouter);

const productrouter = require('./src/router/apis/productrouter');
app.use("/api",productrouter)

const orderrouter = require('./src/router/apis/orderrouter');
app.use("/api",orderrouter)

const orderitemrouter = require("./src/router/apis/orderItemrouter")
app.use("/api",orderitemrouter)

const paymentrouter = require("./src/router/apis/paymentrouter")
app.use("/api",paymentrouter)

const homerouter = require('./src/router/homerouter')
app.use(homerouter)




const port = process.env.PORT
app.listen(port,()=>{
    console.log(`run this application in ${port} port`);
    
})
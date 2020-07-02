const express=require('express');

const bodyParser=require('body-parser')
const mongoose=require('mongoose')


const categoriesRoutes = require("./routes/categories")


const annotationsRoutes = require("./routes/annotations")
//const cors=('cors')
const app=express();

mongoose.connect('mongodb+srv://amel:rLNdMvxOHbniebO9@cluster0-8mbmq.mongodb.net/node-angular?retryWrites=true&w=majority', { useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=>{ console.log("connected to bd")})
.catch(()=>{ console.log("connected failed")});

app.use(bodyParser.json())

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin" , "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods" ,"GET, POST ,,PUT, PATCH , DELETE, OPTIONS");
   // res.setHeader("Access-Control-Allow-Credentials","True");
    next();
  });
  


app.use("/api/categories",categoriesRoutes)
app.use("/api/annotation",annotationsRoutes)
module.exports = app;



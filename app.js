const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();






//connect to mongo
const uri = process.env.DB_URI
mongoose.set('strictQuery',false)
mongoose.connect(uri,err=>{
    if(err)throw err
})
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Database connect successfully")
})


//Middleware
app.use(express.json())




app.listen(3001,(req,res) => {
    console.log("Server started running on port 3001");
})

app.post("/post",async(req,res) => {
    console.log(req.body);
    const {data} = req.body;

    try {

    if(data2=="12344") {
        res.send({status:"ok"})
    }else{
        res.send({status:"User not found"})
    }
    } catch (error) {
        res.send({status:"Something went wrong try again."})
    }

})

require("./schema/userDetails");

const User = mongoose.model('UserInfo');

app.post('/register',async(req,res) => {
    const {name,email,mobileno,password} = req.body
    try {
        await User.create({
            username:name,
            email:email,
            phoneno:mobileno,
            password:password
        });
        res.send({status:"ok"})
    } catch (error) {
        res.send({status:"error"})
    }
})
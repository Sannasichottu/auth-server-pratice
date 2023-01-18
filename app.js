const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');




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
app.use(express.json());
app.use(cors())
const {hashGenerate} = require('./helpers/hashing');

require('./schema/userDetails');
const User = mongoose.model("UserInfo")
app.post('/register', async(req,res) => {
    try {
        const hashPassword = await hashGenerate(req.body.password)

    const user = new User({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        password:hashPassword
    });
    const savedUser = await user.save();
    res.send(savedUser);
    } catch (error) {
        res.send(error);
    }
})


app.listen(3001,() => {
    console.log("Server started running on port 3001");
})

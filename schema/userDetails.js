const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    username :String,
    email:String,
    phoneno:Number,
    password:String
},{
    collation: "UserInfo"
});

mongoose.model("UserInfo", userDetailsSchema)
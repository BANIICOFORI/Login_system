const { string } = require("i/lib/util");
const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
    fname:String,
    lname:String,
    email:{type:String,unique:true},
    password:String, 
},
{ 
    ccollation:"UserInfo"
}
);
mongoose.model("UserInfo", UserDetailsSchema);
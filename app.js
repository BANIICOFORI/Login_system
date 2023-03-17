const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SELECT = "hvdvay6099987656457fdherhyhrsdgfe4234647sdvsgjtj@3$%#sdvbcvn";

require("./UserDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req,res)=>{
    const {fname,lname,email,password}=req.body;
    const encryptedPassword = await bcrypt.hash(password,10)
    try {
        const oldUser = await User.findOne({email});
        if(oldUser){
          return  res.send({error:"User Exist"});
        }
       await User.create({
      fname,
       lname,
        email,
        password: encryptedPassword,
       });
       res.send({status:"Ok"})
    } catch (error) {
        res.send({status:"error"});
    }
});

app.post("/Login", async(req,res)=>{
    const {email,password}=req.body;

    const user = await User.findOne({email});
    if(!user){
        return  res.send({error:"User Not found"});
      }
      if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign({email:user.email},JWT_SELECT,{expiresIn:10,});
        if(res.status(201)){
            return res.json({status:"Ok",data:token});
        }else {
            return res.json({error:"error"});
        }
    }
    res.json({status:"error", error:"Invalid Password"});
});

app.post("/userData", async(req,res)=>{
    //console.log(userData)
    const {token} = req.body;
    try {
        const user = jwt.verify(token,JWT_SELECT,(err,res)=>{
            if (err) {
                return "token expired"
            }
            return res;
            // console.log(err,"error");
            // console.log(res,"results")
        });
        console.log(user);
        if(user === "token expired"){
            return res.send({status:"error", data:" token expired" });
        }
        const useremail = user.email;
        User.findOne({email:useremail})
        .then((data) => {
            res.send({status:"Ok", data: data });
        })
        .catch((error) => {
            res.send({status: "error", data: error });
        });
        } catch (error) {}
        });


const mongourl =
    "mongodb+srv://baniico:WTVbYd1aurRawpqQ@cluster0.cpw2wje.mongodb.net/LoginDB?retryWrites=true&w=majority"
mongoose
    .connect(mongourl, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("connected to Database");
    })
    .catch((e) => console.log(e));
app.listen(3300, () => {
    console.log("server is runinig");
});
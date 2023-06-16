const userCollection = require('../models/userSchema');
const users=require('../models/userSchema')
const jwt=require('jsonwebtoken')
const mongoose= require('mongoose')
const {ObjectId} = mongoose.Types
const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456"


module.exports={
    signup:(req,res)=>{
       let userData=req.body;
       users.insertOne(userData).then((data)=>{
       console.log(data);
       res.json({signup:true})
    })
    },

    userLogin:async(req,res)=>{
       
        console.log(req.body);
        const {username,password}=req.body
        let user=await users.findOne({username:username})
        if(!user){
            res.json({nameError:"Incorrect username"})
         }
       
      else{

         if(password!=user.password){
            res.json({passwordError:"Incorrect password"})
         }

         if(password==user.password){
            const token=jwt.sign({},JWT_SECRET);
            res.json({status:'ok',data:token,login:true,user})
         }
      }
},
    imageUpload : (req,res,next)=>{
      try{
         console.log(req.body);
         const {userId} = req.body
         const imageUrl = req.file.filename
         console.log(req.body);
         userCollection.updateOne({_id:new ObjectId (userId)},{$set:{image:imageUrl}}).then((data)=>{
            console.log(data);
            res.json({status:true, imageurl:imageUrl})
         })
      }
      catch(err){
         console.log(err);
      }

    }

}
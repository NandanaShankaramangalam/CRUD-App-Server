
const admins=require('../models/adminSchema')
const users=require('../models/userSchema')
const jwt=require('jsonwebtoken')
const mongoose= require('mongoose')
const {ObjectId} = mongoose.Types
const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456"

module.exports = {
    adminLogin:async(req,res)=>{
       
        console.log("gggg==",req.body);
        const {adminname,password}=req.body
        console.log('adname',adminname);
        let admin=await admins.findOne({adminname:adminname})
        console.log('addd=',admin);
        if(!admin){
            res.json({nameError:"Incorrect username"})
         }
         else{
            if(password!=admin.password){
                res.json({passwordError:"Incorrect password"})
             }

           if(password==admin.password){
                const token=jwt.sign({},JWT_SECRET);
                res.json({status:'ok',data:token,login:true,admin})
           }
         }
         
},
    showUser : async(req,res)=>{
        let userdata = await  users.find().toArray()
        if(!userdata){
            res.json({error:"collection empty"})
        }
        else{
            res.json({status:true,userdata})
        }
    },
    addUser : async(req,res)=>{
        let data = req.body
        if(data){
            users.insertOne({username:data.username}).then((data)=>{
                res.json({status:true})
            })
        }
    },
    deleteUser : (req,res)=>{
        let userid = req.body.id;
        console.log('reqqq',req.body.id);
        users.deleteOne({_id:new ObjectId(userid)}).then(async(data)=>{
            let userdetails = await users.find().toArray()
            console.log('kkk',userdetails);
                 res.json({status:true,userdetails})
        })
    },
    editUser : (req,res)=>{
    let {id,username} = req.body
    console.log(req.body);
    users.updateOne({_id:new ObjectId(id)},{$set:{username:username}}).then((data)=>{
        console.log('update true');
        res.json({update:true})
    })
    }
}
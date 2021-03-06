/*ներմուծում ենք մեր օգտատերերի մոդելը*/
const { UserModel }=require("../models/UserModel")
const  bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
require("dotenv").config()

class AuthController{
    /*Ստեղծում ենք նոր օգտատերերի գրանցող մեթոդը
    ստանալու ենք req.body, որի վրա կա email. password, username
    ուղարկելու ենք գրանցված user տվյալները*/

    async registerNewUser(req,res){

        try{
            let hashPassword= bcrypt.hashSync(req.body.password)
            console.log("hash",hashPassword)
            let newUser=new UserModel({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
            })
            let newUserInfo=await  newUser.save()
            res.json({data:newUserInfo})
        }catch(err){
            console.log(err)
            res.json({error:err.message})
        }     


    }

    async loginUser(req,res){
        try{
            let user=await UserModel.findOne({email:req.body.email})

            if(!user){
               return res.json({error:"Email or Password is invalid"}) 
            } 

            let passwordOk= bcrypt.compareSync(req.body.password, user.password)

            if(!passwordOk){
              return res.json({error:"Email or Password is invalid"})  
            } 
            let payload={
                id:user._id,
                email:user.email,
                username:user.username
            }

            let accessToken= jwt.sign(payload,process.env.jwtAccessSecret,{expiresIn:process.env.jwtAccessSecretLT})

             res.json({user,accessToken})

        }catch(err){
            res.json({error:err.message})
        }

        
    }

    async logOut(req,res){
        try{
             await UserModel.findOne({_id:req.body._id}, (err,userInfo)=>{
                if(err){
                    console.log(err);
                    return
                }else{
                    userInfo.online=false;
                    userInfo.save()
                    res.json({userInfo})
                }
               
               
            })
     
     


    }catch(err){
        res.json({error:err.message})
    }
    }
}

module.exports=new AuthController()
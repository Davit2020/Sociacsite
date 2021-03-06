const {  UserModel }=require('../models/UserModel')

const checkEmailUnique=async (req,res,next)=>{
   try{
       let  user=await  UserModel.findOne({email:req.body.email})
       if(user) return res.json({error:`Email ${user.email} is taken`})
       next()
   }catch(err){
       if(err) return res.json({error:err.message})
   }
  }
module.exports={
    checkEmailUnique
}

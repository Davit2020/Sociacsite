const { UserModel }=require("../models/UserModel")

class IndexController {
    index(req,res){
        res.render("index")
    }
    async homeContent(req,res){
       try{
          
        let userInfo= await UserModel.findOne({_id:req.user.id}, (err,userInfo)=>{
                if(err){
                    console.log(err);
                    return
                }else{
                    userInfo.online=true;
                    userInfo.save()
                    
                   
        
                }
               
               
            })
            
          
            let  onlineUsers = await UserModel.find({online:true})
        
            res.json({userInfo,onlineUsers})
          
       }catch(err){
       
           res.json({error:err.message})
       }
        

    }
}

module.exports=new IndexController()
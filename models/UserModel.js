const mongoose=require("mongoose")
const Schema=mongoose.Schema

const UserSchema=new Schema({
     username: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
             lowercase: true,
           },
          password: {
            type: String,
             trim: true,
          },
          online:  {
            type: Boolean,
            default: false,
          },
          isVerified: {
                   code:{
                     type: Number,         
                   },
                   status:{
                    type: Boolean, 
                     default: false
                  },      
              },
              firstname: {
                    type: String,
                 },
             lastname: {
                  type: String,
                },
             image:{
                         type:String,
                         default:"/default_profile.png"
                  },
                  
            
        

},{
    timestamps:true
})

const UserModel=mongoose.model("user", UserSchema)

module.exports={
    UserModel
}
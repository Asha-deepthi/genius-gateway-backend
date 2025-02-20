import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
    
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            default:"1234",
        },
        Teamname:{
            type:String,
            required:true,
        },   
        level1:{
          type:Boolean,
          default:false
            
        },
        level2:{
            type:Boolean,
            default:false
        },
        level3:{
            type:Boolean,
            default:false
        },
    
    }
)
const User=new mongoose.model("User",userSchema);





export default User;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        max:20
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    },
    healthRequirements:[{
        type:String
    }],
    idAdmin:{
        type:Boolean,
        default:false
    },
}, {timestamps:true})


const User = mongoose.model("User", userSchema);

export default User;
import mongoose from "mongoose";


const ownerSchema = mongoose.Schema(
    {
        fullname:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        country:{
            type:String,
        },
        city:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true
        },
        emailId:{
            type:String,
            required:true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
        },
        number:{
            type:String,
            required:true,
            unique: true,
            match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
        },
        profilePic:{
            type:String,
            required:true
        },    
    },
    {
      timestamps: true 
    }
);

const Owner = mongoose.model("Owner",ownerSchema);
export default Owner;
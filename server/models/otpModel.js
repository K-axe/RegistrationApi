import mongoose from "mongoose";


const otpSchema = mongoose.Schema(
    {
        phone:{
            type:String,
            unique:true
        },
        phoneOtp:String,
        phoneotpExpires: Date,
        email:{
            type:String,
            unique:true
        },
        emailOtp:String,
        emailotpExpires: Date
    },
    {
      timestamps: true 
    }
);

const Otp = mongoose.model("Otp",otpSchema);
export default Otp;
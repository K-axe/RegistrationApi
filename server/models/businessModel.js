import mongoose from "mongoose";


const businessSchema = mongoose.Schema(
    {
        businessname:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        city:{
            type:String,
        },
        address:{
            type:String,
            required:true
        },
        openingTime:{
            type:String,
            required:true,
        },
        closingTime:{
            type:String,
            required:true,
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
        restaurantImage:String,    
    },
    {
      timestamps: true 
    }
);

const Business = mongoose.model("Business",businessSchema);
export default Business;
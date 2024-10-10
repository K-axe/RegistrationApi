import Business from "../models/businessModel.js";
import Owner from "../models/ownerModel.js";

//Business Registration
export const registerBusiness = async (req,res) =>{
    const{businessname,emailId,number} = req.body;

    try{
        const user = await Business.findOne({businessname,emailId,number});
    if(user){
        return res.status(400).json("Business already register");
    }
    const newBusiness= new Business(req.body);
    await newBusiness.save();
    res.status(201).json('Business created successfully' );
    }catch(err){
        res.status(500).json(`Error : ${err}`);
    }

};


//Owner Registration
export const registerOwner = async (req,res) =>{
    const{fullname,emailId,number} = req.body;
    try{
        const user = await Owner.findOne({fullname,emailId,number});
    if(user){
        return res.status(400).json("Owner already register");
    }
    const newOwner = new Owner(req.body);
    await newOwner.save();
    res.status(201).json('Owner created successfully' );
    }catch(err){
        res.status(500).json(`Error : ${err}`);
    }
};
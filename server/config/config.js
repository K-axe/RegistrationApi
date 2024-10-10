import mongoose from "mongoose";

//connectDB Function

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology: true });
    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};

//export
export default connectDb;
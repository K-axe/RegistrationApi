import crypto from "crypto";
import nodemailer from "nodemailer";
import twilio from "twilio";
import dotenv from "dotenv";

//Config for otp
dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

//config for otp via email
export const sendEmailOtp = async (emailId, otp) => {
  const mailer = nodemailer.createTransport({
    host:prcess.env.EMAIL_HOST,
    port:prcess.env.EMAIL_PORT,
    auth: {
      user:prcess.env.EMAIL_USER,
      pass:prcess.env.EMAIL_PASS,
    },
  });
  const mailData = {
    from:process.env.EMAIL_USER,
    to:email,
    subject:`Verification OTP`,
    text:`Enter OTP ${otp} to verify`
  };
 
    await mailer.sendMail(mailData);
 
};

//Config for Opt via phone-number

export const sendSmsOtp = async (number,opt) =>{
    await client.messages.create({
        body:`Enter OTP: ${opt} to verify.`,
        from:process.env.TWILIO_PHONE_NUMBER,
        to:number
    });
};

//Crypto for otp generation
export const generateOTP = () => crypto.randomInt(100000, 999999).toString();

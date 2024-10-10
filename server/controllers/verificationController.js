import { sendEmailOtp, sendSmsOtp, generateOTP } from "../config/otpConfig.js";
import express, { response } from "express";
import Otp from "../models/otpModel.js";
import mongoose from "mongoose";

export const sendOtp = async (req, res) => {
  const { emaiId, number } = req.body;
  const emailRegex = /^\S+@\S+\.\S+$/;
  const mobileNumberRegex = /^\d{10}$/;

  //Validation before sending otp
  if (!emailRegex.test(emaiId)) {
    return res.status(400).json("Invalid Email Id");
  }
  if (!mobileNumberRegex.test(number)) {
    return res.status(400).json("Invalid Number");
  }

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60000);
  try {
    if (number) {
      await sendSmsOtp(number, otp);
      const newOtp = new Otp({
        phone: number,
        phoneOtp: otp,
        phoneotpExpires: otpExpiry,
      });
      await newOtp.save();
    }
    if (emaiId) {
      await sendEmailOtp(emaiId, otp);
      const newOtp = new Otp({
        email: emaiId,
        emailOtp: otp,
        emailotpExpires: otpExpiry,
      });
      await newOtp.save();
    }
    res.status(200).json("Otp Send Sucessfully");
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
};

export const verifyOtp = async (req, res) => {
  const { emaiId, number, otp } = req.body;

  try {
    let data;
    let expiry;
    if (emaiId) {
      data = await Otp.findOne({ email: emaiId, emailOtp: otp });
      expiry = data.emailotpExpires;
    }
    if (number) {
      data = await Otp.findOne({ phone: number, phoneOtp: otp });
      expiry = data.phoneotpExpires;
    }

    if (!data || expiry < Date.now()) {
      return res.status(400).json("Invalid or Expired Otp");
    }
    if (emaiId) {
      await Otp.deleteOne({ email: emaiId });
    }
    if (number) {
      await Otp.deleteOne({ phone: number });
    }
    res.status(200).json("OTP verified successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

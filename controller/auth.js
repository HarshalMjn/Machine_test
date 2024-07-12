const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Login = require('../models/Login');

exports.register = async (req,res) => {
      try{
        const { f_sno, f_userName, f_Pwd } = req.body;
        const hashedPassword = await bcrypt.hash(f_Pwd, 10);
        const user = new Login({ f_sno, f_userName, f_Pwd: hashedPassword });
        await user.save();
        return res.status(200).json({
          success: true,
          user,
          message: "User registered successfully",
  
        })

      } catch(error) {
      console.log("error", error);
      return res.status(500).json({
      status: 500,
      message: error.message,
    });
    }
};

exports.login = async (req,res) => {
  try{
    const {f_userName, f_Pwd} = req.body;

    if(!f_userName || !f_Pwd) {
      return res.status(403).json({
          success:false,
          message:"All fields are required. please try agian",
      });
    }

    const user = await Login.findOne({f_userName});
    if(!user) {
     return res.status(401).json({
         success:false,
         message:"User is not registrered, please signup first",
     });
    }

    if(await bcrypt.compare(f_Pwd,user.f_Pwd)) {
      const payload = {
        f_sno: user.f_sno,
        f_userName: user.f_userName,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:"5h",
      });
      user.token = token;
      user.f_Pwd = undefined;

      const options = {
        expires: new Date(Date.now() + 3*24*60*60*1000),
        httpOnly:true,
      }

      res.cookie("token", token,options).status(200).json({
        success:true,
        token,
        user,
        message:"Logged in successfully",
       }) 

    } 
    else {
      return res.status(401).json({
        success:false,
        message:"Password is incorrect",
      })
    }

  } catch(error){
    console.log(error);
      return res.status(500).json({
      success:false,
       message:'Login Failure, please try again',
    });


  }
}
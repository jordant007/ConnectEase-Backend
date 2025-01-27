const { generateToken } = require("../helpers/generateToken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

const upload = require('../helpers/multerConfig');
// const { uploadImage } = require('./cloudinaryConfig');
const express = require('express');
const router = express.Router();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "contact already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    const token = generateToken(newUser._id);
    res.cookie("token",token,{
      path:"/",
      httpOnly:true,
      secure:true,
      maxAge:30*24*60*60*1000
  })
  
  const savedUser = await newUser.save();
  const {password:userPassword, ...otherFields} = savedUser._doc
    return res.status(201).json({...otherFields,token});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
const login = async (req,res)=>{
  try{
    const {  email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }
    const comparePassword = await bcrypt.compare(password,user.password)
    if(!comparePassword){
      return res.status(400).json({message:"invalid credentials"});

}const token = generateToken(user._id);
res.cookie("token",token,{
  path:"/",
  httpOnly:true,
  secure:true,
  maxAge:30*24*60*60*1000
})

const {password:userPassword, ...otherFields} = user._doc
return res.status(201).json({...otherFields , token});
}
catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
}
}

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedContent = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });
    console.log(updatedContent)
    return res.status(200).json(updatedContent);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err });
  }
};



const updatePicture = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};

    if (req.files?.avatar) {
      const avatarUpload = await cloudinary.uploader.upload(req.files.avatar.tempFilePath, { folder: "avatars" });
      updates.avatar = avatarUpload.secure_url;
    }

    if (req.files?.coverPhoto) {
      const coverUpload = await cloudinary.uploader.upload(req.files.coverPhoto.tempFilePath, { folder: "cover_photos" });
      updates.coverPhoto = coverUpload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ error: "Failed to update user." });
  }
};


 const uploadImage = async (req, res) => {
  try {
    const filePath = req.file.path; 
    const result = await uploadImage(filePath); // Upload to Cloudinary
    res.status(200).json({
      message: 'Image uploaded successfully',
      url: result.secure_url, // Cloudinary image URL
    });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
};
const updateImage = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, email, phone, profileImage, coverImage } = req.body; // New fields for images

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone, profileImage, coverImage },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};


module.exports = { signup, login ,update ,updateImage,uploadImage,cloudinary,router}

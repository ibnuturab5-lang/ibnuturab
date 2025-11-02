import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, adminInviteToken } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    let role;
    if (
      adminInviteToken &&
      adminInviteToken == process.env.ADMIN_INVITE_TOKEN
    ) {
      role = "admin";
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    generateToken(user._id, res)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      generateToken(user._id ,res);
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role,
      });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const getUserInfo =async (req,res) => {
  try {
    const user =await User.findById(req.user._id).select('-password')
    if(!user){
      return res.status(404).json({ message: "user not found"})
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error", error: error.message })
  }
}
export const updateProfile =async (req,res) => {
  try {
    const {name,email,password, profilePic} =req.body;
     const user =await User.findById(req.user._id).select('-password')
    if(!user){
      return res.status(404).json({ message: "user not found"})
    }
    user.name= name || user.name;
    user.email= email || user.email;
    if(password){
      user.password =await bcrypt.hash(password,10)
    }

    if(profilePic && profilePic !== user.profilePic){
      const result =await cloudinary.uploader.upload(profilePic,{folder:"e-commerce_pics"});
      user.profilePic= await result.secure_url;
    }
const updatedUser = await user.save()
return res.status(201).json({  _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profilePic: updatedUser.profilePic,
        role: updatedUser.role,})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error", error: error.message })
  }
}
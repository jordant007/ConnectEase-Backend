const { generateToken } = require("../helpers/generateToken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
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

module.exports = { signup, login }

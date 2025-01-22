const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true }, 
        phoneNumber: { type: String, require: true }, 
        userType:{type: String,enum:['free',"pro"],default: "free",require}
        
    },{timestamps:true});



module.exports = mongoose.model("User", userSchema)
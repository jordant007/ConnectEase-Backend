const mongoose = require ("mongoose")

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true }, 
        category: { type: String, required: true },
        photo: { type: String, required: true }
    }
);


module.exports = mongoose.model("Contact", contactSchema)
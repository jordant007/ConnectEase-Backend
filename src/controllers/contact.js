const Contact = require("../models/contact");


const addContact = async (req, res) => {
  try {
    const { name, email, phoneNumber, photo, category } = req.body;
    const contact = await Contact.findOne({ phoneNumber });
    if (contact) {
      return res.status(400).json({ message: "contact already exists" });
    } else {
      const newContact = new Contact({
        name,
        phoneNumber,
        email,
        photo,
        category,
    });
    const savedContact = await newContact.save();
    return res.status(201).json(savedContact);
}
} catch (err) {
    res.status(500).json({ error: err });
}
}

const getContact =  async (req, res) => {
    try {
      const contacts = await Contact.find();
      return res.status(200).json(contacts);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
}


   const deleteContact = async (req, res) => {
      try {
        const { id } = req.params;
        const contacts = await Contact.findByIdAndDelete(id);
        return res.status(200).json(contacts);
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    }

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedContent = await Contact.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return res.status(200).json(updatedContent);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};


module.exports = { addContact, getContact,deleteContact ,updateContact };





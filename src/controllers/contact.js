const Contact = require("../models/contact");
const addContact = async (req, res) => {
  try {
    const { name, email, phoneNumber, photo, category, userId } = req.body; // Get userId from request body

    // Validation
    if (!name || !email || !phoneNumber || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const contact = await Contact.findOne({ phoneNumber, userId });
    if (contact) {
      return res.status(400).json({ message: "Contact already exists for this user" });
    }

    const newContact = new Contact({
      name,
      phoneNumber,
      email,
      photo: photo || 'default-photo-url',
      category,
      userId
    });

    const savedContact = await newContact.save();
    return res.status(201).json(savedContact);
  } catch (err) {
    console.error("Error in addContact:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

const getContact = async (req, res) => {
  try {
    const { userId } = req.query; //  userId from query 
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    const contacts = await Contact.find({ userId });
    return res.status(200).json(contacts);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

  
    const contact = await Contact.findOneAndDelete({ _id: id, userId });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json(contact);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, ...updates } = req.body; // Separate userId from updates
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updatedContent = await Contact.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true }
    );

    if (!updatedContent) {
      return res.status(404).json({ message: "Contact not found" });
    }
    
    return res.status(200).json(updatedContent);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = { addContact, getContact, deleteContact, updateContact };

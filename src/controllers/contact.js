const Contact = require("../models/contact");

const addContact = async (req, res) => {
  try {
    const { name, email, phoneNumber, photo, category } = req.body;
    
    // Validation
    if (!name || !email || !phoneNumber || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.findOne({ phoneNumber });
    if (contact) {
      return res.status(400).json({ message: "Contact already exists" });
    }

    const newContact = new Contact({
      name,
      phoneNumber,
      email,
      photo: photo || 'default-photo-url', // Provide default if no photo
      category,
    });

    const savedContact = await newContact.save();
    return res.status(201).json(savedContact);
  } catch (err) {
    console.error("Error in addContact:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

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





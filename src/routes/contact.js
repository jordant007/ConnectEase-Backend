const express = require("express");
const { Router } = express;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = Router();
const Contact = require("../models/contact");
const {addContact, getContact, deleteContact, updateContact} = require("../controllers/contact")

router.post("/new",addContact);

router.get("/",getContact );

router.get("/:id", );

router.delete("/:id", deleteContact);

router.put("/:id",updateContact);
router.post("/new", upload.single('photo'), addContact);

module.exports = router;

const express = require("express");
const { Router } = express;
const router = Router();
const Contact = require("../models/contact");
const {addContact, getContact, deleteContact, updateContact} = require("../controllers/contact")

router.post("/new",addContact);

router.get("/",getContact );

router.get("/:id", );

router.delete("/:id", deleteContact);

router.put("/:id",updateContact);

module.exports = router;

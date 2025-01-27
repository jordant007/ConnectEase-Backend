const express = require("express");
const { Router } = express;
const router = Router();
const { login, signup, update } = require("../controllers/user");

router.post("/register", signup);
router.post("/login", login);
router.patch("/update/:id",update);

module.exports = router;

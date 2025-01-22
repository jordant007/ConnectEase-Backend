const express = require("express");
const { Router } = express;
const router = Router();
const { login } = require("../controllers/user");
const { signup } = require("../controllers/user");
router.post("/register", signup);
router.post("/login", login);

module.exports = router;

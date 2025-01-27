const express = require("express");
const router = express.Router();
const { updatePicture } = require("../controllers/user");

router.patch("/update-picture/:id", updatePicture);

module.exports = router;

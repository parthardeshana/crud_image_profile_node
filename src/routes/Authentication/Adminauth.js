const express = require("express");
const router = express.Router()
const AdminAuthController = require("../../controllers/Authentication/AdminauthController");

router.post('/register', AdminAuthController.register)
router.post('/login', AdminAuthController.login)
module.exports = router
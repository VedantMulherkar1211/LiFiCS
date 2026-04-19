const express = require('express');
const router = express.Router();
const authController = require('../controller/admin/authcontroller');
 
router.post('/Login', authController.login);
 
module.exports = router;
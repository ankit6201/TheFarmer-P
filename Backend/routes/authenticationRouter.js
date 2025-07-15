const express = require('express')
const router = express.Router()
const authenticationRouter = require('../controllers/authenticationController')

router.post('/register',authenticationRouter.registeruser)
router.post('/login',authenticationRouter.login)

module.exports = router;
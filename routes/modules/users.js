const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')

router.get('/logout', userController.logout)
router.post('/login', userController.postLogin)
router.get('/login', userController.loginPage)
router.post('/register', userController.postRegister)
router.get('/register', userController.registerPage)

module.exports = router

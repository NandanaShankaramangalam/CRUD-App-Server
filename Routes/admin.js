const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.post('/login',adminController.adminLogin)
router.get('/home',adminController.showUser)
router.post('/addUser',adminController.addUser)
router.post('/deleteUser',adminController.deleteUser)
router.post('/editUsers',adminController.editUser)
module.exports = router
const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
router.get('/',userController.getAll)
router.post('/',userController.createUser)
router.delete('/:id',userController.deleteUser)
module.exports = router
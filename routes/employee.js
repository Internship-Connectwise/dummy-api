const express = require('express')
const router = express.Router()

//Organizaion controller to handle the request calls
const empyCntr = require('../controllers/employee.js')

//fetch all department
router.get('/',empyCntr.getListOfEmpy)

//fetch all specific department
router.get('/:id',empyCntr.specificEmpy)

//Create department
router.post('/',empyCntr.createEmpy)

//Update department
router.patch('/:id',empyCntr.updateEmpy)

//Delete department
router.delete('/:id',empyCntr.deleteEmpy)

module.exports = router
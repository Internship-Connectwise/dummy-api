const express = require('express')
const router = express.Router()

//Organizaion controller to handle the request calls
const deptCntr = require('../controllers/department.js')

//fetch all department
router.get('/',deptCntr.getListOfDept)

//fetch all specific department
router.get('/:id',deptCntr.specificDept)

//Create department
router.post('/',deptCntr.createDept)

//Update department
router.patch('/:id',deptCntr.updateDept)

//Delete department
router.delete('/:id',deptCntr.deleteDept)

module.exports = router
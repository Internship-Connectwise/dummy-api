const express = require('express')
const router = express.Router()

//Organizaion controller to handle the request calls
const orgCntr = require('../controllers/organization.js')

//fetch all organization
router.get('/',orgCntr.getListOfOrg)

//fetch all specific organisation
router.get('/:id',orgCntr.specificOrg)

//Create
router.post('/',orgCntr.createOrg)

//Update
router.patch('/:id',orgCntr.updateOrg)

//Delete
router.delete('/:id',orgCntr.deleteOrg)

module.exports = router
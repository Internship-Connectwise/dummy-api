const express = require('express')
const router = express.Router()

//Organizaion controller handleA the Functionality of request calls
const orgCntr = require('../controllers/organization.js')
const validate = require('../middleware/organization.js')

router
    .get('/',orgCntr.getListOfOrg)
    .get('/:id',orgCntr.specificOrg)
    .post('/',validate,orgCntr.createOrg)
    .patch('/:id',validate,orgCntr.updateOrg)
    .delete('/:id',orgCntr.deleteOrg)

module.exports = router
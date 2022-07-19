const express = require("express");
const router = express.Router();

//controller to handle the request calls
const empyCntr = require("../controllers/employee.js");
const middleware = require('../middleware/employee.js')

//fetch all department
router
  .get("/", empyCntr.getListOfEmpy)
  .get("/:id", empyCntr.specificEmpy)
  .post("/", middleware.validate,empyCntr.createEmpy)
  .patch("/:id",middleware.validate, empyCntr.updateEmpy)
  .delete("/:id", empyCntr.deleteEmpy);

module.exports = router;

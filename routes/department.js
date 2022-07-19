const express = require("express");
const router = express.Router();

//controller handles the request
const deptCntr = require("../controllers/department.js");
const middleware = require('../middleware/department.js')

router
  .get("/", deptCntr.getListOfDept)
  .get("/:id", deptCntr.specificDept)
  .post("/",middleware.validate, deptCntr.createDept)
  .patch("/:id",middleware.validate, deptCntr.updateDept)
  .delete("/:id", deptCntr.deleteDept);

module.exports = router;

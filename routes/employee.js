const express = require("express");
const router = express.Router();

//controller to handle the request calls
const empyCntr = require("../controllers/employee.js");
const middleware = require("../middleware/employee.js");

router
.get("/searchEmpy", empyCntr.searchEmpy)
  .get("/regexSearch", empyCntr.regexSearch)
  .get("/atlasSearch", empyCntr.atlasSearchEmpy)
  .get("/atlasSearchDf", empyCntr.atlasSearchEmpyDF)

router
  .get("/searchEmpyMP", empyCntr.searchEmpyMP)
  .get("/regexSearchMP", empyCntr.regexSearchMP)
  .get("/atlasSearchMP", empyCntr.atlasSearchEmpyMP)
  .get("/atlasSearchDfMP", empyCntr.atlasSearchEmpyDFMP)
  
router
  .get("/", empyCntr.getListOfEmpy)
  .get("/:id", empyCntr.specificEmpy)
  .post("/", middleware.validate, empyCntr.createEmpy)
  .patch("/:id", middleware.validate, empyCntr.updateEmpy)
  .delete("/:id", empyCntr.deleteEmpy);

module.exports = router;

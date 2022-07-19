const deptModel = require("../modals/department.js");
const validation = require('../helper/validation.js')

const empyMiddleware = async (req, res, next) => {
  const deptId = req.headers.dept_id;
  const dept = await deptModel.findOne({ dept_id: deptId });
  if (dept) next();
  else res.json({ Msg: "Organisation or Department not found" });
};

const values = ["firstName","lastName","age","joining_date","position","salary","dob","address"]

const validate = (req, res, next) => {
  try {
    if (validation(values,req.body)) next();
    else res.json({"Msg":"Invalid Request"})
  } catch (err) {
    res.json({ Msg: "Request Not Permitted",err });
  }
};

module.exports = {
  empyMiddleware,
  validate
};

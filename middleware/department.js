const orgModel = require("../modals/organization.js");
const validation = require('../helper/validation.js')

const deptMiddleware = async (req, res, next) => {
  try {
    const orgId = req.headers.org_id;
    const org = await orgModel.findOne({ org_id: orgId });
    if (org !== null) next();
    else res.json({ Msg: `Organization does not exists` });
  } catch (err) {
    res.json({ Msg: "Cannot get details of Organisation"}, err);
  }
};

const values = ["dept_name","manager"]

const validate = (req, res, next) => {
  try {
    if (validation(values,req.body)) next();
    else res.json({"Msg":"Invalid Request"})
  } catch (err) {
    res.json({ Msg: "Request Not Permitted",err });
  }
};

module.exports = { 
  deptMiddleware,
  validate
};

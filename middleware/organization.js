
const validation = require('../helper/validation.js')
const values = ["org_name", "headquater", "established_year", "ceo"]

const validate = (req, res, next) => {
  try {
    // if (validation(values,req.body)) next();
    // else res.json({"Msg":"Invalid Request"})
    for (item in values) {
      if (!values.includes(item)) {
        console.log("False: "+item)
        res.end({"Msg":"mdb"})
      }
    }
  } catch (err) {
    res.send({ Msg: "Request Not Permitted",err });
  }
};
module.exports = validate;

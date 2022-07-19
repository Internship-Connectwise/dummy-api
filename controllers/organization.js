const orgModel = require("../modals/organization.js");
const deptModel = require("../modals/department.js");
const empyModel = require("../modals/employee.js");

const { v4: uuidv4 } = require("uuid");

const getListOfOrg = async (req, res) => {
  try {
    const org = await orgModel.find();
    if (org) 
      res.json(org);
    else 
      res.json({ Msg: "No records found" });
  } catch (err) {
    res.status(500).json({ Msg: err });
  }
};

const specificOrg = async (req, res) => {
  try {
    const orgId = req.params.id;
    const org = await orgModel.findOne({ org_id: orgId });
    if (org !== null) res.json(org);
    else {
      const msg = `No records found`;
      res.json(msg);
    }
  } catch (err) {
    res.status(500).json({ Msg: err });
  }
};

const createOrg = async (req, res) => {
  try {
    const orgId = { org_id: uuidv4() };
    const org = { ...orgId, ...req.body };
    const newOrg = await orgModel.create(org);
    res.json(newOrg);
  } catch (err) {
    res
      .status(500)
      .json({ Msg: "Please Send all required fields", Error: err });
  }
};

const updateOrg = async (req, res) => {
  try {
    const data=await orgModel.updateOne({ org_id: req.params.id }, req.body)
      if (data.modifiedCount) 
        res.json({ Msg: "Record Modified" });
      else if (!data.matchedCount)
        res.json({ Msg: "Record Not Found" });
      else 
        res.json({ Msg: "Cannot update record" });
  } catch (err) {
    res.status(500).json({ Msg: err });
  }
};

const deleteOrg = async (req, res) => {
  try {
    const orgId = req.params.id;
    console.log(orgId)
    const query = { org_id: orgId }
    await empyModel.deleteMany(query)
    await deptModel.deleteMany(query)
    const data = await orgModel.deleteOne(query);
    console.log(data)
    if (data.deletedCount) res.json({ Msg: "Record Deleted" });
    else if (!data.acknowledged) res.json({ Msg: "Some error occured" });
    else res.json({ Msg: "Record not found" });
  } catch (err) {
    res.status(500).json({ Msg: "Some Error Occured", err });
  }
  console.log("deleteOrg org");
};

module.exports = {
  getListOfOrg,
  specificOrg,
  createOrg,
  updateOrg,
  deleteOrg,
};

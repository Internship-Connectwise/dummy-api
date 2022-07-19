const deptModel = require("../modals/department.js");
const empyModel = require("../modals/employee")

const { v4: uuidv4 } = require("uuid");

const getListOfDept = async (req, res) => {
  try {
    const orgId = req.headers.org_id;
    const data = await deptModel.find({ org_id: orgId });
    if (!data.length) res.json({ Msg: "No Records Found" });
    else res.json(data);
  } catch (err) {
    res.status(500).json({ Msg: err });
  }
};

const specificDept = async (req, res, next) => {
  try {
    const deptId = req.params.id;
    const orgId = req.headers.org_id;
    const dept = await deptModel.findOne({ org_id: orgId, dept_id: deptId });
    const msg = "No records found";
    if (dept !== null) res.json(dept);
    else res.json({ Msg: msg });
  } catch (err) {
    res.status(500).json({ Msg: "Error occured", err });
  }
};

const createDept = async (req, res) => {
  try {
    const orgId = req.headers.org_id;
    const deptId = { dept_id: uuidv4() };
    const dept = { ...deptId, ...req.body, org_id: orgId };
    console.log(dept);
    const newdept = await deptModel.create(dept);
    res.json({ Msg: "Record created", newdept });
  } catch (err) {
    res.json({ Msg: "Please Send all required fields", Error: err });
  }
  console.log("Create department");
};

const updateDept = async (req, res) => {
  try {
    const deptId = req.params.id;
    const orgId = req.headers.org_id;
    const data = await deptModel.updateOne(
      { dept_id: deptId, org_id: orgId },
      req.body
    );
    if (data.modifiedCount) res.json({ Msg: "Record Modified" });
    else if (!data.matchedCount) res.json({ Msg: "Record Not Found" });
    else res.json({ Msg: "Cannot update record" });
  } catch (err) {
    res.status(500).json({ Msg: err });
  }
  console.log("update department");
};

const deleteDept = async (req, res) => {
  try {
    const deptId = req.params.id;
    const orgId = req.headers.org_id;
    const query = {dept_id:deptId, org_id: orgId}
    await empyModel.deleteMany(query)
    const data = await deptModel.deleteOne(query);
    if (data.deletedCount) res.json({ Msg: "Record Deleted", data });
    else if (!data.acknowledged) res.json({ Msg: "Some error occured", data });
    else res.json({ Msg: "Record not found", data });
  } catch (err) {
    res.status(500).json({ Msg: "Some Error Occured 2", err });
  }
  console.log("delete department");
};

module.exports = {
  getListOfDept,
  specificDept,
  createDept,
  updateDept,
  deleteDept,
};

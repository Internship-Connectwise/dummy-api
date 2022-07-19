const empyModel = require("../modals/employee.js");
const { v4: uuidv4 } = require("uuid");

const getListOfEmpy = async (req, res) => {
  try {
    const orgId = req.headers.org_id;
    const deptId = req.headers.dept_id;
    const data = await empyModel.find({ org_id: orgId, dept_id: deptId });
    if (!data.length) res.json({ Msg: "No Records Found" });
    else res.json(data);
  } catch (err) {
    res.status(500).json({ Msg: "Error", err });
  }
};

const specificEmpy = async (req, res, next) => {
  try {
    const empyId = req.params.id;
    const deptId = req.headers.dept_id;
    const orgId = req.headers.org_id;
    console.log(deptId, orgId);
    const empy = await empyModel.findOne({
      org_id: orgId,
      dept_id: deptId,
      empy_id: empyId,
    });
    const msg = "No Records found";
    if (empy !== null) res.json(empy);
    else res.json({ Msg: msg });
  } catch (err) {
    res.status(500).json({ Msg: "Error occured", err });
  }
};

const createEmpy = async (req, res, next) => {
  try {
    const empyId = { empy_id: uuidv4() };
    const deptId = req.headers.dept_id;
    const orgId = req.headers.org_id;

    const empy = { ...empyId, ...req.body, "org_id": orgId, "dept_id": deptId };
    const newEmpy = await empyModel.create(empy);
    res.json({ Msg: "Record created" });
  } catch (err) {
    res
      .status(500)
      .json({ Msg: "Please Send all required fields", Error: err });
  }
  console.log("Create Employee");
};

const updateEmpy = async (req, res) => {
  try {
    const empyId = req.params.id;
    const deptId = req.headers.dept_id;
    const orgId = req.headers.org_id;
    const data = await empyModel.updateOne(
      { org_id: orgId, dept_id: deptId, empy_id: empyId },
      req.body
    );
    console.log(data)
    if (data.modifiedCount) res.json({ Msg: "Record Modified" });
    else if (!data.matchedCount) res.json({ Msg: "Record Not Found" });
    else res.json({ Msg: "Cannot update record" });
  } catch (err) {
    res.status(500).json({ Msg: err });
  }
};

const deleteEmpy = async (req, res) => {
  try {
    const empyId = req.params.id;
    const deptId = req.headers.dept_id;
    const orgId = req.headers.org_id;
    const data = await empyModel.deleteOne({
      org_id: orgId,
      dept_id: deptId,
      empy_id: empyId,
    });
    if (data.deletedCount) res.json({ Msg: "Record Deleted" });
    else if (!data.acknowledged) res.json({ Msg: "Some error occured" });
    else res.json({ Msg: "Record not found" });
  } catch (err) {
    res.status(500).json({ Msg: "Some Error Occured", err });
  }
  console.log("delete Employee");
};

module.exports = {
  getListOfEmpy,
  specificEmpy,
  createEmpy,
  updateEmpy,
  deleteEmpy,
};

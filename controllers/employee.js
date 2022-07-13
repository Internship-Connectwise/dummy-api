const empyModel = require("../modals/employee.js");

const getListOfEmpy = async (req, res) => {
  try {
    const orgId = req.headers.org_id;
    const deptId = req.headers.dept_id;
    await empyModel
      .find({ org_id: orgId, dept_id: deptId })
      .then((data) => {
        if (!data.length) res.json({ Msg: "No Records Found" });
        else res.json(data);
      })
      .catch((err) => {
        res.json({ Msg: "Some error occured while executing query", err });
      });
  } catch (err) {
    res.status(500).json({ Msg: err });
  }
  console.log("Fetch list of all dept");
};

const specificEmpy = async (req, res, next) => {
  try {
    const empyId = req.params.id;
    const deptId = req.headers.dept_id;
    const orgId = req.headers.org_id;
    console.log(deptId, orgId);
    const dept = await empyModel.findOne({
      org_id: orgId,
      dept_id: deptId,
      empy_id: empyId,
    });
    console.log(dept);
    const msg = `Employee with id ${empyId} not found`;
    if (dept !== null) res.json(dept);
    else res.json({ Msg: msg });
  } catch (err) {
    res.status(500).json({ Msg: "Some error occured", err });
  }
};

const createEmpy = async (req, res, next) => {
  try {
    const deptId = req.headers.dept_id;
    const orgId = req.headers.org_id;

    const dept = { ...req.body, org_id: orgId, dept_id:deptId };
    console.log(dept);
    const newdept = await empyModel.create(dept);
    res.json({ Msg: "Record created", newdept });
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
    await empyModel
      .updateOne({ org_id: orgId, dept_id: deptId, empy_id: empyId }, req.body)
      .then((data) => {
        if (data.modifiedCount) res.json({ Msg: "Record Modified", data });
        else if (!data.matchedCount) res.json({ Msg: "Id not found", data });
        else if (!data.acknowledged)
          res.json({ Msg: "Some error occured while executing query", data });
        else res.json({ Msg: "Unknown Event", data });
      })
      .catch((err) => {
        res.status(500).json({ Msg: err });
      });
  } catch (err) {
    res.status(500).json({ Msg: err });
  }
  console.log("update Employee");
};

const deleteEmpy = async (req, res) => {
  try {
    const empyId = req.params.id;
    const deptId = req.headers.dept_id;
    const orgId = req.headers.org_id;
    await empyModel
      .deleteOne({ org_id: orgId, dept_id: deptId, empy_id: empyId })
      .then((data) => {
        if (data.deletedCount) res.json({ Msg: "Record Deleted", data });
        else if (!data.acknowledged)
          res.json({ Msg: "Some error occured", data });
        else res.json({ Msg: "Id not found", data });
      })
      .catch((err) => {
        res.status(500).json({ Msg: err });
      });
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

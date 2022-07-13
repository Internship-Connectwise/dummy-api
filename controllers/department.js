const deptModel = require("../modals/department.js");

const getListOfDept = async (req, res) => {
    // console.log(orgId)
    try {
    await deptModel
      .find({ org_id: req.headers.org_id })
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

const specificDept = async (req, res, next) => {
  try {
    const deptId = req.params.id;
    const orgId = req.headers.org_id;
    console.log(deptId,orgId)
    const dept = await deptModel.findOne({"org_id":orgId,"dept_id":deptId});
    console.log(dept)
    const msg = `department with id ${deptId} not found`;
    if (dept !== null) res.json(dept);
    else res.json({ Msg: msg });
  } catch (err) {
    res.status(500).json({ Msg: "Some error occured", err });
  }
};

const createDept = async (req, res, next) => {
  const orgId = req.headers.org_id;
  try {
    const dept = { ...req.body, org_id: orgId };
    console.log(dept)
    const newdept = await deptModel.create(dept);
    res.json({"Msg":"Record created",newdept});
  } catch (err) {
    res
      .status(500)
      .json({ Msg: "Please Send all required fields", Error: err });
  }
  console.log("Create department");
};

const updateDept = async (req, res) => {
  try {
    const deptId = req.params.id;
    const orgId = req.headers.org_id;
    await deptModel
      .updateOne({ dept_id: deptId, org_id: orgId }, req.body)
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
  console.log("update department");
};

const deleteDept = async (req, res) => {
  try {
    const deptId = req.params.id;
    const orgId = req.headers.org_id;
    await deptModel
      .deleteOne({ dept_id: deptId, org_id: orgId })
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
  console.log("delete department");
};

module.exports = {
  getListOfDept,
  specificDept,
  createDept,
  updateDept,
  deleteDept,
};

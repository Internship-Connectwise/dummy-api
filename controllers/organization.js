const orgModel = require("../modals/organization.js");

const getListOfOrg = async (req, res) => {
  try {
    const org = await orgModel.find();
    if (org) res.json(org);
    else res.json({ Msg: "No records found" });
  } catch (err) {
    res.status(500).json({ Msg: err });
  }
};

const specificOrg = async (req, res, next) => {
  try {
    const orgId = req.params.id;
    const org = await orgModel.findOne({ org_id: orgId });
    const msg = `Organization with id ${orgId} not found`;
    if (org !== null) res.json(org);
    // else next(msg)
    else res.json({ Msg: `Organization with id ${orgId} not found` });
  } catch (err) {
    /* Confusion: which one to choose*/
    next(err);
    // res.status(500).json({"Msg":err})
  }
};

const createOrg = async (req, res, next) => {
  try {
    const org = req.body;
    const newOrg = await orgModel.create(org);
    res.json(newOrg);
  } catch (err) {
    res
      .status(500)
      .json({ "Msg": "Please Send all required fields", "Error": err });
  }
  console.log("Create org");
};

const updateOrg = async (req, res) => {
  try {
    await orgModel
    .updateOne({ org_id: req.params.id },req.body)
    .then((data) => {
        if (data.modifiedCount) res.json({ "Msg": "Record Modified", data });
        else if (!data.matchedCount) res.json({ "Msg": "Id not found", data });
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
  console.log("updateOrg org");
};

const deleteOrg = async (req, res) => {
  try {
    await orgModel
      .deleteOne({ org_id: req.params.id })
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
    res.status(500).json({ Msg:"Some Error Occured", err });
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

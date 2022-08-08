const empyModel = require("../modals/employee.js");
const regexSearch = async (req, res) => {
  try {
    const { searchText } = req.query;
    const { org_id, dept_id } = req.headers;
    let content = [];
    regex=new RegExp(searchText.split(" ").join("|"),'i')
    console.log(regex);
    content.push({
      $match: {
        $or: [
          {
            firstName: {
              $regex: regex,
            },
          },
        ],
      },
    });
    content[0].$match.$or.push({
      searchTags: {
        $regex: regex,
      },
    });
    content[0].$match.$or.push({
      notes: {
        $regex: regex,
      },
    });
    if (org_id) {
      content[0].$match.org_id= org_id
    }
    if (dept_id) {
      content[0].$match.dept_id= dept_id
    }
    content.push({
      $project: {
        _id: 0,
        firstName: 1,
        searchTags: 1,
        org_id: 1,
        dept_id: 1,
        notes: 1,
      },
    });
    const empy = await empyModel.aggregate(content);
    console.log("Records found(Regex Query) = " + empy.length);
    res.send(empy);
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
};

const atlasSearch = async (req, res) => {
  try {
    const { searchText } = req.query;
    const { org_id, dept_id } = req.headers;
    let content = [];
    content.push({
      $search: {
        text: {
          query: searchText.split(" "),
          path: ["firstName", "searchTags", "notes"],
        },
      },
    });
    if (org_id) {
      content.push({
        $match: {
          org_id: org_id,
        },
      });
    }
    if (dept_id) {
      content.push({
        $match: {
          dept_id: dept_id,
        },
      });
    }
    content.push({
      $project: {
        _id: 0,
        firstName: 1,
        searchTags: 1,
        org_id: 1,
        dept_id: 1,
        notes: 1,
      },
    });

    const empy = await empyModel.aggregate(content);
    console.log("Records found(Atlas Query) = " + empy.length);
    res.send(empy);
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
};

const atlasSearchDf = async (req, res) => {
  try {
    const { searchText } = req.query;
    const { org_id, dept_id } = req.headers;
    let content = [];
    content.push({
      $search: {
        index: "DM-true-multy-param",
        text: {
          query: searchText.split(" "),
          path: ["firstName", "searchTags", "notes"],
        },
      },
    });
    if (org_id) {
      content.push({
        $match: {
          org_id: org_id,
        },
      });
    }
    if (dept_id) {
      content.push({
        $match: {
          dept_id: dept_id,
        },
      });
    }
    content.push({
      $project: {
        _id: 0,
        firstName: 1,
        searchTags: 1,
        org_id: 1,
        dept_id: 1,
        notes: 1,
      },
    });

    const empy = await empyModel.aggregate(content);
    console.log("Records found(Atlas Df Query) = " + empy.length);
    res.send(empy);
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
};

module.exports = {
  regexSearch,
  atlasSearch,
  atlasSearchDf,
};


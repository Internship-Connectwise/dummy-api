const express = require("express");
const router =express.Router();

const searchCntr = require("../controllers/search.js");

router.get('/', (req,res) => {
    res.send("Search method expected")
});  
router.get('/regexSearch',searchCntr.regexSearch);
router.get('/atlasSearch',searchCntr.atlasSearch);
router.get('/atlasSearchDF',searchCntr.atlasSearchDf);

module.exports= router;


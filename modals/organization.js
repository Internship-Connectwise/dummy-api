const mongoose= require('mongoose')
const deptModel = require("../modals/department.js");
const empyModel = require("../modals/employee.js");

let db=mongoose.connection.useDb('community')

const organization=new mongoose.Schema({
    org_id : { type : String, required: true, unique:true,immutable:true},
    org_name : { type : String, required: true},
    headquater : { type : String, required: true},
    established_year : { type : Number, required: true},
    ceo:{ type : String, required: true},
    added_in:{ type : Date, default: Date.now()}
},{
    collection:"organization"
})

organization.methods.dltChildData = async function(){
    try{
        const orgId=this.org_id
        const delDept=await deptModel.deletMany({org_id:orgId})
        const delEmpy=await empyModel.deletMany({org_id:orgId})
        return (delDept && delEmpy)?true:false;
    }catch(e){
        throw new Error(e)
    }
}

const modal = db.model('organization',organization)

module.exports = modal
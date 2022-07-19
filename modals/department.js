const mongoose= require('mongoose')
const empyModel = require("./employee.js");

let db=mongoose.connection.useDb('community')

const department=new mongoose.Schema({
    dept_id : { type : String, required: true ,unique:true,immutable:true},
    org_id : { type : String, required: true},
    dept_name : { type : String, required: true},
    manager : { type : String, required: true},
    added_in:{ type : Date, default: Date.now()}
},{
    collection:"department"
})

// department.methods.dltChildData =async function(deptId){
//     try{
//         console.log("delete child")
//         console.log(deptId)
//         const delEmpy=await empyModel.deleteMany({dept_id:deptId})
//         console.log(delEmpy)
//         return (delEmpy)?true:false;
//     }catch(err){
//         throw new Error(err)
//     }
// }

const modal = db.model('department',department)

module.exports = modal

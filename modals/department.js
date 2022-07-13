const mongoose= require('mongoose')

let db=mongoose.connection.useDb('community')

const department=new mongoose.Schema({
    dept_id : { type : String, required: true},
    org_id : { type : String, required: true},
    dept_name : { type : String, required: true},
    manager : { type : String, required: true},
    added_in:{ type : Date, default: Date.now()}
},{
    collection:"department"
})

const modal = db.model('department',department)

module.exports = modal

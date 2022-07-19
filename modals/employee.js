const mongoose= require('mongoose')

let db=mongoose.connection.useDb('community')

const employee=new mongoose.Schema({
    empy_id : { type : String, required: true, unique:true,immutable:true},
    org_id : { type : String, required: true},
    dept_id : { type : String, required: true},
    firstName : { type : String, required: true},
    lastName : { type : String, required: true},
    age : { type : Number, required: true},
    joining_date : { type :Date, default:Date.now()},
    position : { type : String, required: true},
    salary : { type : Number, required: true},
    dob : { type : String},
    address : { type : String},
},{
    collection:"employee" 
})

const modal = db.model('employeeSchema',employee)

module.exports = modal
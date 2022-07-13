const mongoose= require('mongoose')

let db=mongoose.connection.useDb('community')

const organization=new mongoose.Schema({
    org_id : { type : String, required: true},
    org_name : { type : String, required: true},
    headquater : { type : String, required: true},
    established_year : { type : Number, required: true},
    ceo:{ type : String, required: true},
    added_in:{ type : Date, default: Date.now()}
},{
    collection:"organization"
})

const modal = db.model('organization',organization)

module.exports = modal
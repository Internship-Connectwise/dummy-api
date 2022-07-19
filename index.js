require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')

//Routers
const orgRouter=require('./routes/organization.js')
const deptRouter=require('./routes/department.js')
const empyRouter=require('./routes/employee.js')

//Middlewares
const deptMiddleware = require('./middleware/department.js')
const empyMiddleware = require('./middleware/employee.js')

const app=express()
const PORT=process.env.PORT||3000
//Db connectivity
mongoose.connect(process.env.CONNECTION_STRING,{useNewUrlParser: true})
.then(()=> console.log("Connected to mongo db atlas"))
.catch((err) => console.error("connection failed ", err))

//Parsing the data through json middleware
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Landing page")
})

app.use('/org',orgRouter)

app.use('/dept',deptMiddleware.deptMiddleware,deptRouter)

app.use('/empy',empyMiddleware.empyMiddleware,empyRouter)

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})
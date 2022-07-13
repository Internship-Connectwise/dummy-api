const express=require('express')
const mongoose=require('mongoose')
const dbPass=require('./config.js')
//Routers
const orgRouter=require('./routes/organization.js')
const deptRouter=require('./routes/department.js')
const empyRouter=require('./routes/employee.js')
//Middlewares
const deptMiddleware = require('./middleware/department.js')
const empyMiddleware = require('./middleware/employee.js')

const app=express()
const PORT=3000
//Db connectivity
mongoose.connect(`mongodb+srv://rahul:${dbPass}@connectwise.9foyj.mongodb.net/?retryWrites=true&w=majority`,{useNewUrlParser: true})
.then(()=> console.log("Connected to mongo db atlas"))
.catch((err) => console.error("connection failed ", err))

// const deptRouter=require('./routes/employee.js')
// const employeeRouter=require('./routes/employee.js')


//Parsing the data through json middleware
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Landing page")
})

app.use('/org',orgRouter)

app.use('/dept',deptMiddleware,deptRouter)

app.use('/empy',empyMiddleware,empyRouter)

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${3000}`)
})
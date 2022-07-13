const empyMiddleware=async(req,res,next)=>{
    const orgId = req.headers.org_id
    const deptId=req.headers.dept_id
    if(orgId && deptId){
        //Check Wheather the Department exits
        next()
    }
    else res.json({"Msg":'Organisation or Department id not specified'})
}

module.exports = empyMiddleware
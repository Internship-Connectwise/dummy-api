const deptMiddleware=async(req,res,next)=>{
    const orgId = req.headers.org_id
    if(orgId){
        //Check Wheather the Organisation exits
        res.locals.orgId = orgId
        next()
    }
    else res.json({"Msg":'Organisation id not specified'})
}

module.exports = deptMiddleware
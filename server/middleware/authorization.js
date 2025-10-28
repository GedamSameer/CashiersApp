const verifyAdmin = (req,res,next) => {
    try{
        if(!req.user) return res.status(401).json({error: "You are not authenticated"})
        if(!req.user.role) return res.status(403).json({error: "You dont have admin priviledges"})
        next()
    }catch(err){
        return res.status(400).json({error: "Something went wrong"})
    }
}
module.exports = verifyAdmin
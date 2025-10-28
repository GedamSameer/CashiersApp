const mongoose = require("mongoose")
const ValidateObjectId = (req,res,next) => {
    if(req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({error: "Invalid Id"})
    }
    next()
}
module.exports = ValidateObjectId
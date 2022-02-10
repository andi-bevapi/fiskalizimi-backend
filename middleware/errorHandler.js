const GeneralError = require("../utils/GeneralError");
const errorHandler = function (err,req,res,next) {

    if(err instanceof  GeneralError){
        res.fail(err.message,err.code);
    }
    //return next(err);
}
module.exports = errorHandler;
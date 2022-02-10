const GeneralError = require("./GeneralError");
const errorHandler = function (err,req,res,next) {

    if(err instanceof  GeneralError){
     console.log("is instanceof-----");
        res.fail(err.message,err.code);
    }
    //return next(err);
}
module.exports = errorHandler;
const GeneralError = require("../utils/GeneralError");

const errorHandler = function (err, req, res, next) {
    //console.log("error---in---errorHandler--",err.message.toString());
    if (err instanceof GeneralError) {
       return res.fail(err.message, err.code);
    } else if(err.message.toString() === "Cannot read properties of undefined (reading 'trim')"){
        return res.fail(err.message = "Kjo fature nuk u fiskalizua", err.code = 409);
    }
}

module.exports = errorHandler;
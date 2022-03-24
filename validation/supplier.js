const Joi = require("joi");

const supplier = Joi.object({
    name : Joi.string().min(3).max(20).required().messages({
        'string.base':  `"Emri" duhe te jet i formatit 'tekst'`,
        'string.empty': `"Emri" nuk duhet te jet bosh`,
        'string.min':   `"Emri" duhet te ket nje limit prej 3 karakteresh`,
        'string.max':   `"Emri" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"Emri" eshte nje fushe e detyrueshme`
    }),
    id: Joi.number(),
    isActive :  Joi.boolean(),
    isDeleted : Joi.boolean(),
})

const validateSupplier = async(req,res,next) =>{
    const result = supplier.validate(req.body);
    if(result.error){
       return res.fail(result.error.details[0].message);
    }
    next();
}

module.exports = validateSupplier;
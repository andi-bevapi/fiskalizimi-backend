const Joi = require("joi");

const sellingUnit = Joi.object({
    name : Joi.string().min(2).max(20).required().messages({
        'string.base':  `"Emri" duhet te jete i formatit 'tekst'`,
        'string.empty': `"Emri" nuk duhet te jete bosh`,
        'string.min':   `"Emri" duhet te kete nje limit prej 2 karakteresh`,
        'string.max':   `"Emri" duhet te kete nje maksimum prej 20 karakteresh`,
        'any.required': `"Emri" eshte nje fushe e detyrueshme`
    }),
    isActive :  Joi.boolean(),
    isDeleted : Joi.boolean(),
});

const validateSellingUnit = async(req,res,next) =>{
    const result = sellingUnit.validate(req.body);
    if(result.error){
       return res.fail(result.error.details[0].message);
    }
    next();
}

module.exports = validateSellingUnit;
const Joi = require("joi");

const category = Joi.object({
    id: Joi.number(),
    clientId: Joi.number(),
    branchId: Joi.number(),
    name : Joi.string().min(2).max(20).required(),
    isActive : Joi.boolean(),
    isDeleted : Joi.boolean()
}).messages({
    'string.base':  `"Emri" duhe te jete i formatit 'tekst'`,
    'string.empty': `"Emri" nuk duhet te jete bosh`,
    'string.min':   `"Emri" duhet te kete nje limit prej 2 karakteresh`,
    'string.max':   `"Emri" duhet te kete nje maksimum prej 20 karakteresh`,
    'any.required': `"Emri" eshte nje fushe e detyrueshme`
})

const validateCat = async(req,res,next) =>{
    const result = category.validate(req.body);
    if(result.error){
       return res.fail(result.error.details[0].message);
    }
    next();
}

module.exports = validateCat;
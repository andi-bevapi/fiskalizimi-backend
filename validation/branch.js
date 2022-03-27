const Joi = require("joi");

const branch = Joi.object({
    id : Joi.number(),
    clientId : Joi.number(),
    name : Joi.string().min(2).max(20).required().messages({
        'string.base':  `"Emri" duhe te jet i formatit 'tekst'`,
        'string.empty': `"Emri" nuk duhet te jet bosh`,
        'string.min':   `"Emri" duhet te ket nje limit prej 2 karakteresh`,
        'string.max':   `"Emri" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"Emri" eshte nje fushe e detyrueshme`
    }),
    address : Joi.string().min(2).max(20).required().messages({
        'string.base':  `"Adresa" duhe te jet e formatit 'tekst'`,
        'string.empty': `"Adresa" nuk duhet te jet bosh`,
        'string.min':   `"Adresa" duhet te ket nje limit prej 2 karakteresh`,
        'string.max':   `"Adresa" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"Adresa" eshte nje fushe e detyrueshme`
    }),
    city : Joi.string().min(2).max(20).required().messages({
        'string.base':  `"Qyteti" duhe te jet i formatit 'tekst'`,
        'string.empty': `"Qyteti" nuk duhet te jet bosh`,
        'string.min':   `"Qyteti" duhet te ket nje limit prej 2 karakteresh`,
        'string.max':   `"Qyteti" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"Qyteti" eshte nje fushe e detyrueshme`
    }),
    businessUnitCode : Joi.string().min(2).max(50).required().messages({
        'string.base':  `"Kodi i biznesit" duhe te jet i formatit 'text'`,
        'any.empty':    `"Kodi i biznesit" nuk duhet te jet bosh`,
        'string.min':   `"Kodi i biznesit" duhet te ket nje limit prej 2 karakteresh`,
        'number.max':   `"Kodi i biznesit" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"Kodi i biznesit" eshte nje fushe e detyrueshme`
    }),
    maintainerCode : Joi.string().min(2).max(50).required().messages({
        'string.base':  `"Kodi i mirembajtjes" duhe te jet i formatit 'tekst'`,
        'string.empty': `"Kodi i mirembajtjes" nuk duhet te jet bosh`,
        'string.min':   `"Kodi i mirembajtjes" duhet te ket nje limit prej 2 karakteresh`,
        'string.max':   `"Kodi i mirembajtjes" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"Kodi i mirembajtjes" eshte nje fushe e detyrueshme`
    }),
    code : Joi.string().min(2).max(20).required().messages({
        'string.base':  `"Kodi" duhe te jet i formatit 'tekst'`,
        'string.empty': `"Kodi" nuk duhet te jet bosh`,
        'string.min':   `"Kodi" duhet te ket nje limit prej 2 karakteresh`,
        'string.max':   `"Kodi" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"Kodi" eshte nje fushe e detyrueshme`
    }),
    isActive :  Joi.boolean(),
    isDeleted : Joi.boolean(),
});

const validateBranch = async(req,res,next) =>{
    const result = branch.validate(req.body);
    if(result.error){
       return res.fail(result.error.details[0].message);
    }
    next();
}

module.exports = validateBranch;
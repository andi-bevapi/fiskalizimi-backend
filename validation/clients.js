const Joi = require("joi");

const client = Joi.object({
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
    NUIS : Joi.string().min(10).max(20).required().messages({
        'string.base':  `"NUIS" duhe te jet i formatit 'tekst'`,
        'string.empty': `"NUIS" nuk duhet te jet bosh`,
        'string.min':   `"NUIS" duhet te ket nje limit prej 10 karakteresh`,
        'string.max':   `"NUIS" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"NUIS" eshte nje fushe e detyrueshme`
    }),
    logoVirtualPath : Joi.string().min(10).max(20).required().messages({
        'string.base':  `"logoVirtualPath" duhe te jet i formatit 'tekst'`,
        'string.empty': `"logoVirtualPath" nuk duhet te jet bosh`,
        'string.min':   `"logoVirtualPath" duhet te ket nje limit prej 10 karakteresh`,
        'string.max':   `"logoVirtualPath" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"logoVirtualPath" eshte nje fushe e detyrueshme`
    }),
    hasVat : Joi.boolean().required().messages({
        'boolean.base':  `"hasVat" duhe te jet i formatit 'boolean'`,
        'boolean.empty': `"hasVat" nuk duhet te jet bosh`,
        'any.required': `"hasVat" eshte nje fushe e detyrueshme`
    }),
    vat : Joi.number().required().messages({
        'any.required': `"vat" eshte nje fushe e detyrueshme`
    }),
    email : Joi.string().required().messages({
        'string.base':  `"email" duhe te jet i formatit 'tekst'`,
        'string.empty': `"email" nuk duhet te jet bosh`,
        'any.required': `"vat" eshte nje fushe e detyrueshme`
    }),
    numberOfUsers : Joi.number().required().messages({
        'number.base':  `"numri i perdoruesave" duhe te jet i formatit 'tekst'`,
        'number.empty': `"numri i perdoruesave" nuk duhet te jet bosh`,
        'any.required': `"numri i perdoruesave" eshte nje fushe e detyrueshme`
    }),
    phoneNumber : Joi.number().required().messages({
        'number.base':  `"numri i telefonit" duhe te jet i formatit 'tekst'`,
        'number.empty': `"numri i telefonit" nuk duhet te jet bosh`,
        'any.required': `"numri i telefonit" eshte nje fushe e detyrueshme`
    }),
    TCRCode : Joi.string().min(2).max(20).required().messages({
        'string.base':  `"kodi tcr" duhe te jet i formatit 'tekst'`,
        'string.empty': `"kodi tcr" nuk duhet te jet bosh`,
        'string.min':   `"kodi tcr" duhet te ket nje limit prej 10 karakteresh`,
        'string.max':   `"kodi tcr" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"kodi tcr" eshte nje fushe e detyrueshme`
    }),
    softCode : Joi.string().min(2).max(20).required().messages({
        'string.base':  `"vat" duhe te jet i formatit 'tekst'`,
        'string.empty': `"vat" nuk duhet te jet bosh`,
        'string.min':   `"vat" duhet te ket nje limit prej 10 karakteresh`,
        'string.max':   `"vat" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"vat" eshte nje fushe e detyrueshme`
    }),
    signature : Joi.string().min(2).max(20).required().messages({
        'string.base':  `"signature" duhe te jet i formatit 'tekst'`,
        'string.empty': `"signature" nuk duhet te jet bosh`,
        'string.min':   `"signature" duhet te ket nje limit prej 2 karakteresh`,
        'string.max':   `"signature" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"signature" eshte nje fushe e detyrueshme`
    }),
    email : Joi.string().required().messages({
        'string.base':  `"email" duhe te jet i formatit 'tekst'`,
        'string.empty': `"email" nuk duhet te jet bosh`,
        'any.required': `"vat" eshte nje fushe e detyrueshme`
    }),
    certificate : Joi.string().min(2).max(20).required().messages({
        'string.base':  `"vat" duhe te jet i formatit 'tekst'`,
        'string.empty': `"vat" nuk duhet te jet bosh`,
        'string.min':   `"vat" duhet te ket nje limit prej 2 karakteresh`,
        'string.max':   `"vat" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"vat" eshte nje fushe e detyrueshme`
    }),
    typeOfTCR : Joi.string().min(2).max(20).required().messages({
        'string.base':  `"vat" duhe te jet i formatit 'tekst'`,
        'string.empty': `"vat" nuk duhet te jet bosh`,
        'string.min':   `"vat" duhet te ket nje limit prej 2 karakteresh`,
        'string.max':   `"vat" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"vat" eshte nje fushe e detyrueshme`
    }),
    validFrom : Joi.date().messages({'string.base': `"vlera" e validFrom duhe te jet i formatit 'date'`,'string.empty': `"vlera" nuk duhet te jet bosh`,}),
    validTo : Joi.date().messages({'string.base': `"vlera" e validFrom duhe te jet i formatit 'date'`,'string.empty': `"vlera" nuk duhet te jet bosh`,}),
    isActive :  Joi.boolean(),
    isDeleted : Joi.boolean(),
});

const validateClient = async(req,res,next) =>{
    const result = client.validate(req.body);
    if(result.error){
       return res.fail(result.error.details[0].message);
    }
    next();
}

module.exports = validateClient;
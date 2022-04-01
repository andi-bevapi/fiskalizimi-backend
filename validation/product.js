const Joi = require("joi");

const product = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(2).max(20).required().messages({
        'string.base':  `"Emri" duhe te jet i formatit 'tekst'`,
        'string.empty': `"Emri" nuk duhet te jet bosh`,
        'string.min':   `"Emri" duhet te ket nje limit prej 2 karakteresh`,
        'string.max':   `"Emri" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"Emri" eshte nje fushe e detyrueshme`
    }),
    description: Joi.string().min(2).max(20).required().messages({
        'string.base':  `"Pershkrimi" duhe te jet i formatit 'tekst'`,
        'string.empty': `"Pershkrimi" nuk duhet te jet bosh`,
        'string.min':   `"Pershkrimi" duhet te ket nje limit prej 2 karakteresh`,
        'string.max':   `"Pershkrimi" duhet te ket nje maksimum prej 20 karakteresh`,
        'any.required': `"Pershkrimi" eshte nje fushe e detyrueshme`
    }),
    price: Joi.number().positive().greater(0).required().messages({
        'any.required': `"Cmimi" eshte nje fushe e detyrueshme`,
        'number.positive':"Cmimi duhet te jete nje numer pozitiv"
    }),
    barcode: Joi.string().min(2).max(18).required().messages({
        'string.base':  `"Barkodi" duhe te jet i formatit 'tekst'`,
        'string.empty': `"Barkodi" nuk duhet te jet bosh`,
        'string.min':   `"Barkodi" duhet te ket nje limit prej 2 karakteresh`,
        'string.max':   `"Barkodi" duhet te ket nje maksimum prej 18 karakteresh`,
        'any.required': `"Barkodi" eshte nje fushe e detyrueshme`
    }),
    vat: Joi.number().positive().greater(0).required().messages({
        'any.required': `"TVSH" eshte nje fushe e detyrueshme`,
        'number.positive':"TVSH duhet te jete nje numer pozitiv"
    }),
    stock: Joi.number().positive().required().messages({
        'number.base':  `"Stoku" duhe te jet i formatit 'numer'`,
        'number.empty': `"Stoku" nuk duhet te jet bosh`,
        'number.min':   `"Stoku" duhet te ket nje limit prej 2 karakteresh`,
        'string.max':   `"Stoku" duhet te ket nje maksimum prej 18 karakteresh`,
        'any.required': `"Stoku" eshte nje fushe e detyrueshme`
    }),
    stockCheck: Joi.boolean(),
    imageVirtualPath: Joi.optional(),
    isActive:Joi.boolean(),
    isDeleted:Joi.boolean(),
    branchId: Joi.number().positive().greater(0).required(),
    categoryId: Joi.number().positive().greater(0).required(),
    sellingUnitId: Joi.number().positive().greater(0).required(),
    supplierId: Joi.number().positive().greater(0).required(),
})

const validateProduct = async(req,res,next) =>{
    const result = product.validate(req.body);
    if(result.error){
       return res.fail(result.error.details[0].message);
    }
    next();
}

module.exports = validateProduct;
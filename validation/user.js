const Joi = require("joi");

const user = Joi.object({
  username: Joi.string().min(3).max(255).required().messages({
    "string.base": `"Username" duhet te jete i formatit 'tekst'`,
    "string.empty": `"Username" nuk duhet te jete bosh`,
    "string.min": `"Username" duhet te kete nje limit prej 3 karakteresh`,
    "string.max": `"Username" duhet te kete nje maksimum prej 255 karakteresh`,
    "any.required": `"Username" eshte nje fushe e detyrueshme`,
  }),
  email: Joi.string().messages({
    "string.base": `"Email" duhet te jete i formatit 'tekst'`,
    "string.empty": `"Email" nuk duhet te jete bosh`,
  }),
  phone: Joi.string().messages({
    "string.empty": `"Email" nuk duhet te jete bosh`,
  }),
  position: Joi.string().messages({
    "string.base": `"Pozicioni" duhet te jete i formatit 'tekst'`,
    "string.empty": `"Pozicioni" nuk duhet te jete bosh`,
  }),
  firstName: Joi.string().min(3).max(255).required().messages({
    "string.base": `"Emri" duhet te jete i formatit 'tekst'`,
    "string.empty": `"Emri" nuk duhet te jete bosh`,
    "string.min": `"Emri" duhet te kete nje limit prej 3 karakteresh`,
    "string.max": `"Emri" duhet te kete nje maksimum prej 255 karakteresh`,
    "any.required": `"Emri" eshte nje fushe e detyrueshme`,
  }),
  lastName: Joi.string().min(3).max(255).required().messages({
    "string.base": `"Mbiemri" duhet te jete i formatit 'tekst'`,
    "string.empty": `"Mbiemri" nuk duhet te jete bosh`,
    "string.min": `"Mbiemri" duhet te kete nje limit prej 3 karakteresh`,
    "string.max": `"Mbiemri" duhet te kete nje maksimum prej 255 karakteresh`,
    "any.required": `"Mbiemri" eshte nje fushe e detyrueshme`,
  }),
  operatorCode: Joi.string().messages({
    "string.empty": `"OperatorCode" nuk duhet te jet bosh`,
    "any.required": `"OperatorCode" eshte nje fushe e detyrueshme`,
  }),
  password: Joi.string().min(6).max(255).required().messages({
    "string.empty": `"Fjalekalimi" nuk duhet te jet bosh`,
    "string.min": `"Fjalekalimi" duhet te kete nje limit prej 6 karakteresh`,
    "string.max": `"Fjalekalimi" duhet te kete nje maksimum prej 255 karakteresh`,
    "any.required": `"Fjalekalimi" eshte nje fushe e detyrueshme`,
  }),
  branchId: Joi.number().positive().greater(0).required().messages({
    "any.required": `"BranchId" eshte nje fushe e detyrueshme`,
  }),
  clientId: Joi.number().positive().greater(0).required().messages({
    "any.required": `"ClientId" eshte nje fushe e detyrueshme`,
  }),
  isFirstTimeLogin: Joi.boolean(),
  isActive: Joi.boolean(),
  isDeleted: Joi.boolean(),
});

const validateUser = async (req, res, next) => {
  const result = user.validate(req.body.user);
  if (result.error) {
    return res.fail(result.error.details[0].message);
  }
  next();
};

module.exports = validateUser;

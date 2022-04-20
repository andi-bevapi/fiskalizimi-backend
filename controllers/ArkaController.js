const ArkaServices = require("../services/ArkaServices"); 

const getAllArka = async (req, res, next) => {
  try {
      console.log(req.params);
    const arkat = await ArkaServices.getAllArka(
      req.params.branchId
    );
    res.ok(arkat);
  } catch (error) {
      console.log(error);
    next(error);
  }
};

const createArka = async (req, res, next) => {
    try {
        const newArka = await ArkaServices.createArka(req.body);
        res.ok(newArka, "Arka e re u shtua me sukses!");
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updateArka = async (req, res, next) => {
  try {
      const arkaToUpdate = ArkaServices.updateArka(req.body, req.params.id);
      res.ok(arkaToUpdate, "Arka u perditesua me sukses!");
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllArka, createArka, updateArka };

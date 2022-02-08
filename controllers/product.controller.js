const Product = require('../db/models/product');
const Branch = require('../db/models/branch');
const Category = require('../db/models/category');
const SellingUnit = require('../db/models/sellingunit');
const Supplier = require('../db/models/supplier');

const getProducts = async (req, res) => {
    try {
        const data = await Product.findAll({
            include: [
                {
                    model: Branch,
                    as: 'branch'
                },
                {
                    model: Category,
                    as: 'category'
                },
                {
                    model: SellingUnit,
                    as: 'sellingUnit'
                },
                {
                    model: Supplier,
                    as: 'supplier'
                },
            ]
        });
        
        res.send({
            statusCode: 200,
            message: 'Lista e produkteve',
            data
        });
    } catch (error) {
        res.status(500).send()
    }
}

module.exports = {
    getProducts
};
const TransportOrder = require('../db/models/transportorder');
const TransportOrderDetails = require('../db/models/transportorderdetails');
const TransportOrderItems = require('../db/models/transportorderitems');
const Branch = require('../db/models/branch');
const Client = require('../db/models/client');
const SellingUnit = require('../db/models/sellingunit');
const Product = require('../db/models/product');

const getTransportOrders = async (req, res) => {
    try {
        const data = await TransportOrder.findAll({
            include: [
                {
                    model: Branch,
                    as: 'branch'
                },
                {
                    model: Client,
                    as: 'client'
                }
            ]
        });
        res.send({
            statusCode: 200,
            message: 'Lista e porosive',
            data
        });
    } catch (error) {
        res.status(500).send()
    }
};

const getTransportOrderDetails = async (req, res) => {
    try {
        const data = await TransportOrderDetails.findOne({
            where: { transportOrderId: req.params.id }, 
            include: [
                {
                    model: TransportOrder,
                    as: 'transportOrder'
                }
            ]
        });
        res.send({
            statusCode: 200,
            message: 'Detajet e porosise',
            data
        });
    } catch (error) {
        res.status(500).send()
    }
};

const getTransportOrderItems = async (req, res) => {
    try {
        const data = await TransportOrderItems.findOne({
            where: { transportOrderId: req.params.id }, 
            include: [
                {
                    model: TransportOrder,
                    as: 'transportOrder'
                },
                {
                    model: Product,
                    as: 'product'
                },
                {
                    model: Branch,
                    as: 'branch'
                },
                {
                    model: SellingUnit,
                    as: 'sellingUnit'
                },
            ]
        });
        res.send({
            statusCode: 200,
            message: 'Artikujt e porosise',
            data
        });
    } catch (error) {
        res.status(500).send()
    }
};

module.exports = {
    getTransportOrders,
    getTransportOrderDetails,
    getTransportOrderItems
};
const InvoiceService = require("../services/InvoiceService");

const getInvoices = async (req, res, next) => {
    try {
        const result = await InvoiceService.getAllInvoices(req.params.branchId, req.query.status);
        res.ok(result);
    } catch (error) {
        next(error);
    }
}

const getSingleInvoice = async (req, res, next) => {
    try {
        const result = await InvoiceService.getInvoiceById(req.params.id);
        res.ok(result);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const createInvoice = async (req, res, next) => {
    try {
        const result = await InvoiceService.createInvoice(req.body);
        res.ok(result, 'Fatura u krijua me sukses');
    } catch (error) {
        next(error);
    }
}

module.exports = { getInvoices, getSingleInvoice, createInvoice };
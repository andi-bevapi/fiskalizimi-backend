const Invoice = require("../db/models/invoice");
const InvoiceItem = require("../db/models/invoiceitem");
const { identifierGenerator } = require('../helpers');

const getAllInvoices = async (branchId, status = 'active') => {
    return await Invoice.findAll({
        where: {
            isActive: true,
            isDeleted: false,
            branchId,
            status
        },
        include: [
            {
                model: InvoiceItem,
                as: "items",
            }
        ]
    })
}

const getInvoiceById = async (id) => {
    return await Invoice.findOne({
        where: {
            id,
            isActive: true,
            isDeleted: false
        },
        include: [
            {
                model: InvoiceItem,
                as: "items",
            }
        ]
    });
}

const createInvoice = async (body) => {
    const invoiceItems = body.invoiceItems;
    delete body.invoiceItems;

    let doesExists = false;

    if(body.id) {
        doesExists = await Invoice.findOne({
            where: {
                id: body.id,
                isActive: true,
                isDeleted: false
            }
        });
    }

    if (doesExists) {
        const updatedInvoice = await Invoice.update({
            ...body,
            status: 'active'
        }, {
            where: {
                id: body.id
            }
        });

        await InvoiceItem.destroy({ where: { invoiceId: body.id } });
        insertInvoiceItems(body.id, invoiceItems);

        return updatedInvoice;
    }

    const newInvoice = await Invoice.create({
        invoiceCode: identifierGenerator(),
        ...body
    });
    insertInvoiceItems(newInvoice.id, invoiceItems);

    return newInvoice;
};

const insertInvoiceItems = async (invoiceId, invoiceItems) => {
    const tempItems = [];
    invoiceItems.forEach(item => {
        tempItems.push({
            ...item,
            invoiceId
        })
    });

    await InvoiceItem.bulkCreate(tempItems);
}

module.exports = { getAllInvoices, getInvoiceById, createInvoice };
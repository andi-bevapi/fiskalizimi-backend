const Invoice = require("../db/models/invoice");
const InvoiceItem = require("../db/models/invoiceitem");
const Client = require("../db/models/client");
const Branch = require("../db/models/branch");
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
        await Invoice.update({
            ...body,
            status: 'active'
        }, {
            where: {
                id: body.id
            }
        });

        await InvoiceItem.destroy({ where: { invoiceId: body.id } });
        insertInvoiceItems(body.id, invoiceItems);

        return getProcessingInvoice(body.id);
    }

    const clientInvoices = await Invoice.findAll({
        where: {
            clientId: body.clientId
        }
    });

    const clientBranch = await Branch.findOne({
        where: {
            clientId: body.clientId
        }
    })

    const newInvoice = await Invoice.create({
        invoiceCode: identifierGenerator(clientInvoices.length, clientBranch.code),
        ...body
    });
    
    insertInvoiceItems(newInvoice.id, invoiceItems);
    
    return getProcessingInvoice(newInvoice.id);
};

const getProcessingInvoice = async (id) => {
    return await Invoice.findOne({
        where: {
            id
        },
        include: [
            {
                model: InvoiceItem,
                as: "items",
            },
            {
                model: Client,
                as: "client",
            },
            {
                model: Branch,
                as: "branch",
            }
        ]
    })
} 

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
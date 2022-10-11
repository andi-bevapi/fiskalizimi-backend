const Invoice = require("../db/models/invoice");
const InvoiceItem = require("../db/models/invoiceitem");
const Client = require("../db/models/client");
const Branch = require("../db/models/branch");
const ShiftHistory = require("../db/models/shifthistory");
const Op = require("sequelize").Op;
const xmlParser = require("xml-parser");
const GeneralError = require("../utils/GeneralError");

const { identifierGenerator } = require("../helpers");
const fiscalizedInvoice = require("../xmlStructure/FiskalizimiFatures");

const getAllInvoices = async (branchId, status = "active") => {
  return await Invoice.findAll({
    where: {
      isActive: true,
      isDeleted: false,
      branchId,
      status,
    },
    include: [
      {
        model: InvoiceItem,
        as: "items",
      },
    ],
  });
};

const getInvoiceById = async (id) => {
  return await Invoice.findOne({
    where: {
      id,
      isActive: true,
      isDeleted: false,
    },
    include: [
      {
        model: InvoiceItem,
        as: "items",
      },
    ],
  });
};

const createInvoice = async (body) => {
  try {

  const invoiceItems = body.invoiceItems;

  delete body.invoiceItems;
  
  const todaysShift = await ShiftHistory.findOne({
    where: {
      userId: body.userId,
      shiftStart: {
        [Op.gt]: new Date().setHours(0, 0, 0, 0),
        [Op.lt]: new Date(),
      },
    },
  });
  if (todaysShift?.shiftEnd) {
    await ShiftHistory.update(
      { shiftEnd: null },
      { where: { id: todaysShift.id } }
    );
  }

  let doesExists = false;

  if (body.id) {
    doesExists = await Invoice.findOne({
      where: {
        id: body.id,
        isActive: true,
        isDeleted: false,
      },
    });
  }

  if (doesExists) {
    await Invoice.update(
      {
        ...body,
        status: "active",
      },
      {
        where: {
          id: body.id,
        },
      }
    );

    await InvoiceItem.destroy({ where: { invoiceId: body.id } });
    insertInvoiceItems(body.id, invoiceItems);

    return getProcessingInvoice(body.id);
  }

  const clientInvoices = await Invoice.findAll({
    where: {
      clientId: body.clientId,
    },
  });

  const clientBranch = await Branch.findOne({
    where: {
      clientId: body.clientId,
    },
  });

  const newInvoice = await Invoice.create({
    invoiceCode: identifierGenerator(clientInvoices.length, clientBranch.code),
    ...body,
  });

    const result = await fiscalizedInvoice.invoiceFiscalized({newInvoice,body,clientBranch,invoiceItems});
    const parsedXml = xmlParser(result.data);
    const fic = parsedXml.root.children[1].children[0].children[1].content;
    await Invoice.update({FIC:fic},{where:{id:newInvoice.id}});
    
    insertInvoiceItems(newInvoice.id, invoiceItems);
    return getProcessingInvoice(newInvoice.id);

  }catch (error) {
    throw new GeneralError(error.message, 409);
  }
};

const getProcessingInvoice = async (id) => {
  return await Invoice.findOne({
    where: {
      id,
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
      },
    ],
  });
};

const insertInvoiceItems = async (invoiceId, invoiceItems) => {
  const tempItems = [];
  invoiceItems.forEach((item) => {
    tempItems.push({
      ...item,
      invoiceId,
    });
  });

  await InvoiceItem.bulkCreate(tempItems);
};

const deleteInvoice = async (id) => {
  const checkIfExist = await Invoice.findOne({ where: { id } });
  if (checkIfExist) {
    const invoiceToDelete = await Invoice.update(
      { isActive: false, isDeleted: true },
      { where: { id } }
    );
    return invoiceToDelete;
  }
  throw new GeneralError("Kjo fature nuk ekziston", 404);
};

module.exports = {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  deleteInvoice,
};

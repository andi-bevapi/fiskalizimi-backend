const Branch = require('../db/models/branch');
const Client = require('../db/models/client');
const GeneralError = require("../utils/GeneralError");
const { cloudinary } = require('../config/cloudinary');

const getClients = async () => {
    const clients = await Client.findAll({
        where: { isActive: true },
        include: [
            {
                model: Branch,
                as: 'branches'
            }
        ]
    });
    return clients;
}

const createClients = async (body) => {
    let uploadResponse = null;

    if (body.logoVirtualPath) {
        uploadResponse = await cloudinary.uploader.upload(body.logoVirtualPath, {
          upload_preset: 'posla_dev'
        });
    }
    const clients = await Client.create({...body, logoVirtualPath: uploadResponse ? uploadResponse.secure_url : null});
    return clients;
}

const updateClients = async (body, id) => {
    console.log(body);
    const checkClients = await Client.findOne({ where: { id } });
    if (!checkClients) {
        throw new GeneralError("Ky klient nuk gjendet", 404);
    }
    const updateClient = await Client.update(body, { where: { id } });
    return updateClient;
}

const deleteClients = async (id) => {
    const checkClients = await Client.findOne({ where: { id } });
    if (!checkClients) {
        throw new GeneralError("Ky klient nuk gjendet", 404);
    }
    const updateClient = await Client.update({ isActive: false, isDeleted: true }, { where: { id } });
    return updateClient;
}

module.exports = { getClients, createClients, updateClients, deleteClients };
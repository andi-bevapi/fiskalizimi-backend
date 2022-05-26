const clientService = require("../services/ClientService");

const getClients = async(req,res,next)=>{
    try{
        const clients = await clientService.getClients();
        res.ok(clients,"Lista me kliente");
    }catch(error){
        next(error);
    }
}

const createClients = async(req,res,next)=>{
    try{
        const clients = await clientService.createClients(req.body);
        res.ok(clients,"Klienti u krijua me sukses!");
    }catch(error){
        next(error);
    }
}

const updateClients = async(req,res,next)=>{
    try{
        console.log(req.body);
        const clients = await clientService.updateClients(req.body,req.params.id);
        res.ok(clients,"Klienti u perditesua me sukses!");
    }catch(error){
        next(error);
    }
}

const deleteClients = async(req,res,next)=>{
    try{
        const clients = await clientService.deleteClients(req.params.id);
        res.ok(clients,"Klienti u fshi me sukses!");
    }catch(error){
        next(error);
    }
}

module.exports = {
    getClients,
    createClients,
    updateClients,
    deleteClients
};
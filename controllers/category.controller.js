const category = require("../db/models/category");
const getAllCategory = async(req,res) =>{
    try{
        const categories = await category.findAll({where:{isActive:true}});
        const payload = { statusCode: 200, message: "lista me kategorite", data: categories };
        return res.status(200).send(payload);
    }catch(error){
        const errorMessage = {statusCode : 500 ,message:"Internal server error", error : error};
        return res.status(500).send(errorMessage);
    }
}


const createCategory = async(req,res) =>{
    try{
        const checkIfExist = await category.findOne({where : {name : req.body.name.toUpperCase()}});
        if(checkIfExist) {
            const payload = { statusCode: 409, message: "Kjo kategori ekziston"};
            return res.status(409).send(payload);
        }
        const createdCategory = await category.create({name : req.body.name.toUpperCase() , isActive:true, isDeleted: false});
        const payload = { statusCode: 200, message: "Kategoria u krijua me sukses", data: createdCategory };
        return res.status(200).send(payload);
    }catch(error){
        const errorMessage = {statusCode : 500 ,message:"Internal server error", error : error};
        return res.status(500).send(errorMessage);
    }
}

const updateCategory = async(req,res) =>{
   try{
       const checkIfExist = await category.findOne({where : {name : req.body.name.toUpperCase()}});
       if(checkIfExist) {
           const payload = { statusCode: 409, message: "Kjo kategori ekziston"};
           return res.status(409).send(payload);
       }

       await category.update({name : req.body.name.toUpperCase()},{where: {id:req.params.id}, plain: true});
       const payload = { statusCode: 200, message: "category has  been updated"};
       return res.status(200).send(payload);
   }catch(error){
       const errorMessage = {statusCode : 500 ,message:"Internal server error", error : error};
       return res.status(500).send(errorMessage);
   }
}

const deleteCategory = async(req,res) => {
    try{
        const categoryToDelete = await category.update(
            {isActive : false , isDeleted : true},
            { where : { id : req.params.id }}
        )
        const payload = { statusCode: 200, message: "category has  been deleted" , category : categoryToDelete };
        return res.status(200).send(payload);
    }catch(error) {
        const errorMessage = {statusCode : 500 ,message:"Internal server error", error : error};
        return res.status(500).send(errorMessage);
    }
}

module.exports = {getAllCategory , createCategory ,updateCategory , deleteCategory};
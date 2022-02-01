const category = require("../../db/models/category");
const getAllCategory = async(req,res,next) =>{
    try{
        const categories = await category.findAll();
        const payload = { statusCode: 200, message: "lista me kategorite", data: categories };
        return res.send(payload);
    }catch(error){
        const errorMessage = {statusCode : 500 ,message:"Internal server error", error : error};
        return errorMessage;
    }
}


const createCategory = async(req,res,next) =>{
    try{
        const checkIfExist = await category.findOne({where : {name : req.body.name}});
        if(checkIfExist) {
            const payload = { statusCode: 409, message: "kategorite me kete emer ekziston"};
            return res.send(payload);
        }
        const createdCategory = await category.create({name : req.body.name});
        const payload = { statusCode: 200, message: "lista me kategorite", data: createdCategory };
        return res.send(payload);
    }catch(error){
        const errorMessage = {statusCode : 500 ,message:"Internal server error", error : error};
        return errorMessage;
    }
}

const updateCategory = async(req,res,next) =>{

    console.log("updateCategory------",req.body.data.name.toUpperCase());
    console.log("updateCategory------",req.params.id);
    try{
         await category.update(
            {name : req.body.data.name.toUpperCase()},
            {
                where: {id:req.params.id},
                plain: true,
                returning: true
            }
        );

        const categoryUpdated = await category.findOne(
            {
                where: {id:req.params.id},
                plain: true,
                returning: true
            }
        );
        const payload = { statusCode: 200, message: "category has  been updated" , category : categoryUpdated};
        return res.send(payload);
    }catch(error){
        const errorMessage = {statusCode : 500 ,message:"Internal server error", error : error};
        return errorMessage;
    }
}

module.exports = {getAllCategory , createCategory ,updateCategory};
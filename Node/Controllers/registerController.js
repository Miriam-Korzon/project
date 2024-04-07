const Register = require("../Schemas/registerSchema");
const User = require("../Schemas/UsersSchema")
const Course = require("../Schemas/CoursesSchema")

const getAllRegisters=async (req,res)=>{
    
    const registers= await Register.find().lean()
    if(!registers){
        return res.status(400).json({message:"no registers found"})
    }
    res.json(registers)
}
const getRegisterById=async (req,res)=>{

    const {id}=req.params
    const registers = await Register.findById(id).lean()
    if(!registers){
        return res.status(400).json({message:"no registers found"})
    }
    res.json(registers)
}
const getMyCourses=async (req,res)=>{

    const {userId}=req.params
    const registers = await Register.find({user:userId}).lean()
    if(!registers){
        return res.status(400).json({message:"no registers found"})
    }    
    const MyCorses = await Course.find({_id:registers.course})
    if(!MyCorses){
        return res.status(400).json({message:"no registers found"})
    }   
    res.json(MyCorses)
}

const createNewRegister=async (req,res)=>{//*
    const {user,course, registerDate,paid}=req.body
    if(!user || !course){
        return res.status(400).json({message:'Fields is required'})
    }
    const registers = await Register.create({user,course, registerDate,paid})
    
    if(registers){ 
        return res.status(201).json({message:"new register created"})
        }
    else{
        return res.status(400).json({message:"no registers found"})
    }

}
const deleteRegister=async (req,res)=>{

    const {_id}=req.params
    const register = await Register.findById(_id).exec()

    if(!register){ 
        return res.status(400).json({message:"no registers found to delete"})
    }
    const reply=`Register ${register.name } ID ${register._id} deleted`
    const result= await register.deleteOne()
    res.json(reply)
}
const updateRegister=async (req,res)=>{
    const {_id, user, registerDate,paid}=req.body
   
    if(!_id  || !user){ 
        return res.status(400).json({message:" _id or name not found"})
        }
    const register = await Register.findById(_id).exec()
    
    register.registerDate = registerDate
    register.paid = paid

    const updatedRegister=await register.save()
    res.json(`'${updatedRegister.user}' updated 😊😊😊`)
}

module.exports={getAllRegisters,getRegisterById,getMyCourses,createNewRegister,deleteRegister,updateRegister}
const User = require("../Schemas/UsersSchema");

const getAllUsers=async (req,res)=>{
    
    const users= await User.find({},{password:0}).lean()
    if(!users){
        return res.status(400).json({message:"no users found"})
    }
    res.json(users)
}
const getUserById=async (req,res)=>{

    const {id}=req.params
    const users = await User.findById(id,{password:0}).lean()
    if(!users){
        return res.status(400).json({message:"no users found"})
    }
    res.json(users)
}
// const createNewUser=async (req,res)=>{
//     const {username, password, name, ID, email, phone, secondPhone, birthDate, address, roles}=req.body
//     if(!username || !password || !name || !ID || !phone){
//         return res.status(400).json({message:'Fields is required'})
//     }
//     const user_check= await User.find({username}).lean()
//     if(user_check?.length)
//         return res.status(400).json({message:'There is the same username'})
//     if(roles)
//         if(roles!="User" &roles!="Admin"){
//             return res.status(400).json({message:'Invalid roles'})
//         }
//     const users = await User.create({username, password, name, ID, email, phone, secondPhone, birthDate, address, roles})
    
//     if(users){ 
//         return res.status(201).json({message:"new user created"})
//         }
//     else{
//         return res.status(400).json({message:"no users found"})
//     }

// }
const deleteUser=async (req,res)=>{

    const {_id}=req.params
    const user = await User.findById(_id).exec()

    if(!user){ 
        return res.status(400).json({message:"no users found to delete"})
    }
    const reply=`User ${user.username } ID ${user._id} deleted`
    const result= await user.deleteOne()
    res.json(reply)
}
const updateUser=async (req,res)=>{
    const {_id,username, password, name, ID, email, phone, address, secondPhone ,birthDate }=req.body
   
    if(!_id  || !username){ 
        return res.status(400).json({message:" _id or name not found"})
        }
    const user = await User.findById(_id).exec()
    if(user.username!=username){
        const userNames=await (await User.find({},{password:0})).map(use=>use.username)
        if(userNames.includes(username))
            return res.status(400).json({ message: 'username is not unique' })}
    
    user.username = username
    user.password = password
    user.name=name
    user.ID = ID
    user.email = email
    user.address = address
    user.phone = phone
    user.secondPhone = secondPhone
    user.birthDate = birthDate

    const updatedUser=await user.save()
    res.json(`'${updatedUser.username}' updated 😊😊😊`)
}

module.exports={getAllUsers,getUserById,deleteUser,updateUser}
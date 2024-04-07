const mongoose=require('mongoose')
const {format} = require("date-fns")

const registerSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,    
        ref: "User"    
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,    
        ref: "Coures"    
        
    },
    registerDate: {
        type: Date,
        default:format(new Date(),"yyyy-MM-dd\tHH:mm:ss")
    },
    paid:{
        type:Number,
        default:0,
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Register", registerSchema)

const express=require("express")
const router=express.Router()

const registerController=require("../Controllers/registerController")

    router.get("/",registerController.getAllRegisters)
    router.get("/:id",registerController.getRegisterById)
    router.get("/myCourses/:id",registerController.getMyCourses)
    router.post("/",registerController.createNewRegister)
    router.delete("/",registerController.deleteRegister)
    router.put("/",registerController.updateRegister)

module.exports=router

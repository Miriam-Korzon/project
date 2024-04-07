const express=require("express")
const router=express.Router()

const courseController=require("../Controllers/coursesController")

    router.get("/",courseController.getAllCourses)
    router.get("/:id",courseController.getCourseById)
    router.post("/",courseController.createNewCourse)
    router.delete("/",courseController.deleteCourse)
    router.put("/",courseController.updateCourse)

module.exports=router

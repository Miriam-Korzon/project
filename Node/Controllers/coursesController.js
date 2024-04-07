const Course = require("../Schemas/CoursesSchema");

const getAllCourses=async (req,res)=>{
    
    const courses= await Course.find().lean()
    if(!courses){
        return res.status(400).json({message:"no courses found"})
    }
    res.json(courses)
}
const getCourseById=async (req,res)=>{

    const {id}=req.params
    const courses = await Course.findById(id).lean()
    if(!courses){
        return res.status(400).json({message:"no courses found"})
    }
    res.json(courses)
}
const createNewCourse=async (req,res)=>{//*
    const {name, code, describe, lecturer, day, startDate, endDate, hours, numOfMeeting, AudienceStatus, Kategory}=req.body
    if(!name || !code || !lecturer){
        return res.status(400).json({message:'Fields is required'})
    }
    const course_check= await Course.find({code}).lean()
    if(course_check?.length)
        return res.status(400).json({message:'There is the same coursename'})
    if(Kategory)
        if(Kategory!="בוגרות סמינר" &Kategory!="גמלאיות" &Kategory!="נשים נשואות"){
            return res.status(400).json({message:'Invalid Kategory'})
        }
    if(AudienceStatus)
        if(AudienceStatus!="קודש חינוך מודעות" &AudienceStatus!= "ערבי עיון והעשרה" &AudienceStatus!= "קידום טיפול והתערבות"){
            return res.status(400).json({message:'Invalid AudienceStatus'})
        }
    const courses = await Course.create({name, code, describe, lecturer, day, startDate, endDate, hours, numOfMeeting, AudienceStatus, Kategory})
    
    if(courses){ 
        return res.status(201).json({message:"new course created"})
        }
    else{
        return res.status(400).json({message:"no courses found"})
    }

}
const deleteCourse=async (req,res)=>{

    const {_id}=req.params
    const course = await Course.findById(_id).exec()

    if(!course){ 
        return res.status(400).json({message:"no courses found to delete"})
    }
    const reply=`Course ${course.name } ID ${course._id} deleted`
    const result= await course.deleteOne()
    res.json(reply)
}
const updateCourse=async (req,res)=>{
    const {_id, name, code, describe, lecturer, day, startDate, endDate, hours, numOfMeeting, AudienceStatus}=req.body
   
    if(!_id  || !name){ 
        return res.status(400).json({message:" _id or name not found"})
        }
    const course = await Course.findById(_id).exec()
    
    course.name = name
    course.code = code
    course.describe=describe
    course.lecturer = lecturer
    course.startDate = startDate
    course.day = day
    course.endDate = endDate
    course.hours = hours
    course.numOfMeeting = numOfMeeting
    course.AudienceStatus = AudienceStatus


    const updatedCourse=await course.save()
    res.json(`'${updatedCourse.name}' updated 😊😊😊`)
}

module.exports={getAllCourses,getCourseById,createNewCourse,deleteCourse,updateCourse}
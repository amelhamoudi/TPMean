const express =require("express")
const Annotation =require('../models/annotation')

const router=express.Router()

router.post("",(req,res,next)=>{
    const annotation=new Annotation({
        type:req.body.type,
        width:req.body.width,
        height:req.body.height,
        left:req.body.left,
        top:req.body.top,
        angle:req.body.angle,
        fill:req.body.fill

    })
    annotation.save().then(createAnnotation=>{
    
     res.status(201).json({
         message : 'annotation add successfuly',
         annotationId:createAnnotation.id
 
    })
    
 })
 })
 
 



 


 module.exports=router
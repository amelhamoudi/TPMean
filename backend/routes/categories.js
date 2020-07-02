const express =require("express")
const Categorie =require('../models/categorie')

const router=express.Router()

router.post("",(req,res,next)=>{
    const categorie=new Categorie({
        title:req.body.title,
        content:req.body.content
    })
    categorie.save().then(createCategorie=>{
    
     res.status(201).json({
         message : 'Categorie add successfuly',
         categorieId:createCategorie.id
 
    })
    
 })
 })
 
 
 router.put("/:id",(req,res,next)=>{
   const categorie=new Categorie({
     _id: req.body.id,
     title:req.body.title,
     content:req.body.content
   })
 
   Categorie.updateOne({_id: req.params.id}, categorie).then(result =>{
     console.log(result)
     res.status(200).json({message:'categorie update'})
   
   })
 } )


 
 router.get("/:id",(req,res,next)=>{
  Categorie.findById(req.params.id).then(categorie=>{
   if(categorie){
     res.status(200).json(categorie)
   }
   else{
     res.status(404).json({
       message: 'categorie not found'
     })
   }
 })
 })


 router.get("",(req,res,next)=>{
 Categorie.find().then(documents=>{
     res.status(200).json({
         message : 'success',
         categories:documents})
     }) 
 })
 
 

 router.delete("/:id",(req,res,next)=>{
  Categorie.deleteOne({_id:req.params.id}).then(result=>{
     console.log(result)
     res.status(200).json({
       message : "Categorie deleted"
     })
   })
 })
 



 module.exports=router
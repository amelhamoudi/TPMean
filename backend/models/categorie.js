const mongoose=require('mongoose')

const categorieSchema=mongoose.Schema({
    title:{type : String, required:true},
    content:{ type:String,required:true}
})

module.exports=mongoose.model('Categorie',categorieSchema)
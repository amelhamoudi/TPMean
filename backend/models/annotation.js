const mongoose=require('mongoose')

const annotationSchema=mongoose.Schema({
    type:{type : String, required:true},
    width:{ type:Number,required:true},
    height:{ type:Number,required:true},
    left:{ type:Number,required:true},
    top:{ type:Number,required:true},
    angle:{ type:Number,required:true},
    fill:{ type:String,required:true}


})

module.exports=mongoose.model('Annotation',annotationSchema)


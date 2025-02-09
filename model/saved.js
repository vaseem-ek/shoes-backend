const mongoose=require('mongoose')


const savedSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    images:{
        type:Array,
        
    },
    description:{
        type:String,
    },
    userId:{
        type:String,
    },
    shoeId:{
        type:String,
    },
})

const saved=mongoose.model('saved',savedSchema)
module.exports=saved
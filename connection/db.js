const mongoose=require('mongoose')

const connetionString=process.env.MONGODB_URL

mongoose.connect(connetionString).then((res)=>{
    console.log("server connected to mongoDB")
}).catch((err)=>{
    console.log(err);
    
})
    

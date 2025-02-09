const saved=require('../model/saved')

exports.savedShoes=async(req,res)=>{
    const userId=req.payload
    const {name,images,description,shoeId}=req.body
    try {
        const existing=await saved.findOne({userId,shoeId})
        if(existing){
            return res.status(401).json({success:true,message:"shoe already saved"})
        }else{
            const newSaved=new saved({
                shoeId,name,images:JSON.parse(images),description,userId
            })
            await newSaved.save()
            return res.status(200).json({success:true,message:"shoes saved"})
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

exports.getSavedShoe=async(req,res)=>{
    try {
        const userId=req.payload
        const savedShoes=await saved.find({userId})
        return res.status(200).json({success:true,message:savedShoes})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

exports.removeSavedShoe=async(req,res)=>{
    try {
        const {sid}=req.params
        const result=await saved.findByIdAndDelete(sid)
        return res.status(200).json({success:true,message:result})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"internal server error"})  
    }
}
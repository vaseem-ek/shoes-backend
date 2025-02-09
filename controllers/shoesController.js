const { json } = require('express')
const shoes = require('../model/shoes')
const users = require('../model/users')

exports.addShoes = async (req, res) => {
    try {

        const { name, description, brand, color, price, gender, size, shoeType } = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter(item => item !== undefined)


        console.log(name, description, brand, color, price, gender, size, shoeType)
        console.log(images)
        const newShoe=new shoes({
            name, description, brand, color, price, gender, size:JSON.parse(size), shoeType,images
        })
        await newShoe.save()
        return res.status(200).json({success:true,message:"product added"})


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


exports.listShoes = async (req, res) =>{
    try {
        const result=await shoes.find()
        return res.status(200).json({success:true,result})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


exports.deletetShoes = async (req, res) => {
    try {
        const {sid}=req.params
        await shoes.findByIdAndDelete(sid)
        return res.status(200).json({success:true,message:"product deleted"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


exports.updateShoes = async (req, res) => {
    try {

        const {sid}=req.params    
        if(req.files){
            var image1 = req.files.image1 && req.files.image1[0]
            var image2 = req.files.image2 && req.files.image2[0]
            var image3 = req.files.image3 && req.files.image3[0]
            var image4 = req.files.image4 && req.files.image4[0]
            var images=[image1,image2,image3,image4].filter(item => item !== undefined)

            var { name, description, brand, color, price, gender, size, shoeType } = req.body

        }else{
            var { name, description, brand, color, price, gender, size, shoeType } = req.body

        }
        const result =await shoes.findByIdAndUpdate(sid,{
            name, description, brand, color, price, gender, size:JSON.parse(size), shoeType,images
        })
        res.status(200).json({success:true,result})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// users

exports.specificShoe=async(req,res)=>{
    try {
        const {sid}=req.params
        const existing=await shoes.findById(sid)
        res.status(200).json(existing)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
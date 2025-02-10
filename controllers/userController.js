const users = require('../model/users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ success: false, message: "User already registered" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new users({
            username,
            email,
            password: hashedPassword,
            profile: ""
        });

        await newUser.save();
        return res.status(201).json({ success: true, newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await users.findOne({ email })
        if (!existingUser) {
            return res.status(401).json({ success: false, message: "email is incorrect" })
        }
        const isMatch = await bcryptjs.compare(password, existingUser.password)
        if (isMatch || password == existingUser.password) {

            const token = jwt.sign({ userId: existingUser._id }, process.env.PRIVATE_KEY)
            return res.status(200).json({ success: true, user: existingUser, token })

        }else{
            return res.status(402).json({ success: false, message: "password is incorrect" })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}

//admin 

exports.getAllUsers=async(req,res)=>{
    try {
        const result=await users.find()
        return res.status(200).json({success:true,result})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


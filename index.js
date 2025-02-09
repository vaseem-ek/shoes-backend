const cors=require('cors')
const express=require('express')
require('dotenv').config()
require('./connection/db')
const router=require('./routes/router')

const app=express()

app.use(cors())
app.use(express.json())
app.use(router)
app.use('/upload',express.static('./uploads'))


const PORT =3000 || process.env.PORT

app.listen(PORT,()=>{
    console.log("server running at",PORT);
    
})

app.get('/',(req,res)=>{
    res.send('hellow')
})


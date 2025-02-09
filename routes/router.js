const express=require('express')
const userController=require('../controllers/userController')
const shoesController=require('../controllers/shoesController')
const upoload=require('../midllewares/multerMiddle')
const jwtMiddle=require('../midllewares/jwtMiddle')
const savedController=require('../controllers/savedController')

const router=express.Router()

router.post('/reg',userController.registerUser)
router.post('/log',userController.loginUser)


//admin
router.post('/admin/addShoes',jwtMiddle,upoload.fields([{name:'image1'},{name:'image2'},{name:'image3'},{name:'image4'}]),shoesController.addShoes)
router.delete('/admin/remove-shoes/:sid',jwtMiddle,shoesController.deletetShoes)
router.get('/admin/list-shoes',shoesController.listShoes)
router.put('/admin/update-shoes/:sid',shoesController.listShoes)

//users
router.get('/getSpecific/:sid',shoesController.specificShoe)

router.post('/savedShoe',jwtMiddle,savedController.savedShoes)
router.get('/listShoe',jwtMiddle,savedController.getSavedShoe)
router.delete('/removeShoe/:sid',jwtMiddle,savedController.removeSavedShoe)


module.exports=router
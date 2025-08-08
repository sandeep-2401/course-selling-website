const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin,Course} = require('../db');
const router = Router();
const jwt = require('jsonwebtoken');
const {jwt_pass} =require('../config.js');

// Admin Routes
router.post('/signup',(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username : username,
        password : password
    }).then(()=>{
        res.json({msg:'admin created successfully'})
    })
});

router.post('/signin',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user_exist = await Admin.findOne({
        username,
        password
    });
    
    if(user_exist){
        const token=jwt.sign({username},jwt_pass);
        res.json({token});
    }
    else{
        res.status(411).json({msg:"admin does not exist"});
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title= req.body.title;
    const desc= req.body.desc;
    const imageLink= req.body.imageLink;
    const price= req.body.price;

    const newcourse = await Course.create({
        title,
        desc,
        imageLink,
        price
    })
    if(newcourse){
        res.json({ msg : 'course created succesfully', courseId: newcourse._id})
    };



});

router.get('/courses', adminMiddleware, async (req, res) => {
    const details = await Course.find({});
    if(details){
        res.json({courses : details})
    }
});

module.exports = router;
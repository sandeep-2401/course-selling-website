const { Router } = require("express");
const router = Router();
const {User,Course} = require("../db");
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken');
const {jwt_pass} = require('../config.js');

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password =req.body.password;

    const status = await User.create({
        username,
        password
    })

    if(status){
        res.json({msg : "user created successfully"});
    }
    else{
        res.json({msg: "User Signup unsuccessful"})
    }
});

router.post('/signin',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user_exist = await User.findOne({
        username,
        password
    });
    
    if(user_exist){
        const token=jwt.sign({username},jwt_pass);
        res.json({token});
    }
    else{
        res.status(411).json({msg:"User does not exist"});
    }

});

router.get('/courses', async (req, res) => {
    const response = await Course.find({});

    res.json({
        courses : response
    });
    
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.username;
    try{       
        await User.updateOne({
            username:username
        },{
            "$push" :{
                purchasedCourses :courseId
            }
        });
    }
    catch(e){
        console.log(e);
    }
    res.json({msg:"purchase completed successful"});

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const response = await User.findOne({
        username : req.username
    })

    const courses = await Course.find({
        _id:{
            "$in": response.purchasedCourses
        }
    });

    res.json({
        courses : courses
    })
});

module.exports = router
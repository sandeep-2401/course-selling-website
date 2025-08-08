const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sandeepramesh2401:ee44370LV396eCOG@cluster0.jerw5tw.mongodb.net/course_selling_app');

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
    
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number
    
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}
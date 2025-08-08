const {User} = require('../db/index');
const jwt = require('jsonwebtoken');
const {jwt_pass} =require('../config.js');

async function userMiddleware(req, res, next) {
     const token = req.headers.authorization;
        const words =token.split(" ");
        const jwttoken =words[1];
        const response = jwt.verify(jwttoken,jwt_pass);
    
        if(response.username){
            req.username =response.username;
            next();
        }
        else{
            res.status(403).json({msg : 'User credentials wrong'});
        }
}

module.exports = userMiddleware;
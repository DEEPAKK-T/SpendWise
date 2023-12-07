const UsersModel = require("../models/user.model")
const crypto = require('crypto-js');
const jwt = require("jsonwebtoken")
require("dotenv").config();


async function Login(loggedInUserData){

    //Get user data by username
    const getUser = await UsersModel.findOne({
        where: {
            username: loggedInUserData.username
        }
    });

    if(!getUser){
        throw new Error("User doesn't exists please register")
    }
    
    const loggedInUserHashedPassword = crypto.SHA256(loggedInUserData.password.toString()).toString();
    if(loggedInUserHashedPassword != getUser.password){
        throw new Error("Invalid Password. Please login with Valid Password")
    }
    const expiresIn = '1h';
    const accessToken = jwt.sign({id: getUser.id, username: getUser.username}, process.env.SECRET_KEY, {
            expiresIn: expiresIn, //Token Expiration time
    })
    console.log("Access Token", accessToken)
    return {accessToken, expiresIn};

}

module.exports = {Login};
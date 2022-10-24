const express = require('express')
const mongoose      = require('mongoose');
// const bcrypt        = require('bcrypt');
const User          = require("../models/User")
const crypto =  require('crypto')

const router = express.Router()
router.post('/signup', async (req, res) => {
console.log("herrer in signup");
console.log("sdfsdfsdf", req.body)
const userFound = await User.findOne({ email: req.body.email });

if (userFound) {
    console.log("1111111111111111");
    res.send({
        success: "fasle",
        message: "user alaready exits"
    })
} else {
    console.log("222222222222222222222");
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    var token = crypto.randomBytes(32).toString('hex');
    const userr = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      type: "user",
      token: token
    });

    await userr.save();
    console.log("yesssssssssssssss");
    res.send({
        success: true,
        record:{
            success: "true"
        }
       
    })
  } catch (error) {
    console.log("nooooooooo", error);
    res.send({
        success: false,
        message: "wrong password",
        record:{
            success: "false"
        }
    })
    
  }
} 

});

router.post('/login_user', async (req, res) => {
    console.log("inlogin", req.body)
    const username = req.body.username
    const password = req.body.password
    const user = await User.findOne({email:username, password: password})
    if(user) {
        // const isMatch = await bcrypt.compare(password, user.password)
        if(user) {
            res.send({
                success: true,
                data: user,
                token: user.token,
                _id:user._id.toString(),
                name: user.name,
                username: user.email,
                type: user.type

            })
            console.log("the user_id", user._id.toString());
        }else {
            res.send({
                success: false,
                message: "wrong password",
                
            })
        }
    }else { 
        res.send({
            success: false,
            message: "no user with this username exits"
        })
    }
});

module.exports = router;
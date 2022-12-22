// const express = require('express')
// const mongoose      = require('mongoose');
// // const bcrypt        = require('bcrypt');
// // const User          = require("../models/Posts")
// // const crypto =  require('crypto');
// const Post = require('../models/Posts');
// const multer = require('multer')

// const router = express.Router()


// var storage = multer.diskStorage({ 
//   destination: (req, file, cb) => { 
//       cb(null, 'uploads') 
//   }, 
//   filename: (req, file, cb) => { 
//       cb(null, file.fieldname + '-' + Date.now()) 
//   } 
// }); 

// var upload = multer({ storage: storage });

// router.post('/posts',upload.single('image'), async (req, res) => {
// console.log("Post are Here");

//   try {
//     const postss = new Post({
//       name: req.body.name,
//       text: req.body.text,
//       image : req.file.path
//     //   images: req.body.images,  
//     });

//     await postss.save();
//     console.log("yesssssssssssssss");
//     res.send({
//         success: true,
//         record:{
//             success: "true"
//         }
       
//     })
//   } catch (error) {
//     console.log("nooooooooo", error);
//     res.send({
//         success: false,
//         message: "wrong",
//         record:{
//             success: "false"
//         }
//     })
    
//   }
// } );
// router.get('/getPosts', (req, res) => {
//     Post.find((err, posts) =>{
//         if(err){
//             res.send("error not found", err);
//         }
//         else{
//             res.json(posts)
//         }
//     })

//     } 
    
// ),

  


// module.exports = router;
const express = require('express')
const mongoose      = require('mongoose');
// const bcrypt        = require('bcrypt');
const User          = require("../models/User")
const crypto =  require('crypto')
const multer = require("multer");
const router = express.Router()
const Post = require("../models/Post")
const QrCode = require("../models/QrCode")

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
      foculty: req.body.foculty,
      minxada: req.body.minxada,
      phoneNo: req.body.phoneNo,
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

//        const users= User.findByIdAndUpdate({_id : req.body.userId}, {
//         name: req.body.name,
//         foculty: req.body.foculty,
//         minxada: req.body.minxada,
//         phoneNo: req.body.phoneNo,
//         email: req.body.email,
//         password: req.body.password,
//         type: "user",
//         token: token,


//             new:true,
//         })
//         .then(users=>{
//             res.json(users)
//         })
//         .catch(err=>{
//             res.json(err)
//         })
//     }),


router.get('/getUsers', (req, res) => {
    User.find((err, userrs) =>{
        if(err){
            res.send("error not found", err);
        }
        else{
            res.json(userrs)
        }
    })

    } 
    
),

router.put('/update/:userID', async (req, res, next) => {

  const updateUsers = User.findOneAndUpdate(
      { _id: req.params.userID },
      {
        $set: {
          name: req.body.name,
          foculty: req.body.foculty,
          minxada: req.body.minxada,
          phoneNo: req.body.phoneNo,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true },
      (err, users) => {
        if (err) {
          res.send(err);
        } else res.json({message : " users updated sucessfully"});
      }
    );
  });
  

router.delete('/deleteUsers/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const users = await User.findOne({
        _id: id,
      });
  
      // users does not exist
      if (!users) {
        return next();
      }
      await users.remove({
        _id: id,
      });
  
      res.json({
        message: 'User has been deleted',
      });
    } catch (error) {
      next(error);
    }
  });

//   var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//        cb(null, 'test');
//     },
//     filename: function (req, file, cb) {
//        cb(null, Date.now() + '-' + file.originalname);
//     }
//  });

//  var upload = multer({ storage: storage });
//  app.use(express.static(__dirname+'public/'));
//  app.use('/test', express.static('test'));
 

  // var storage = multer.diskStorage({ 
  //   destination: function(req, file, cb) { 
  //       cb(null, 'uploads/') 
  //   }, 
  //   filename:function (req, file, cb){ 
  //       cb(null, file.fieldname + '-' + Date.now()) 
  //   } 
  // }); 
  
  // var upload = multer({ storage: storage,
  // fileFilter : function(req, file, callback){
  //   if(
  //     file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"
  //   ){
   
  //     callback(null , true)
  //   }else{
  //     console.log("only png , jpg and jpeg supported")
  //     callback(null , false)
  //   }
  // },
  // limits :{
  //   fileSize : 1024 *1024 *2
  // }
  
  // });
  
  router.post('/posts',async (req, res) => {
    console.log("Post are Here");
  //   const obj = {
  //     img: {
  //         data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
  //         contentType: "image/png"
  //     }
  // }
      try {

        const postss = new Post({
          // name: req.body.name,
          text: req.body.text,
          // image :req.file.path
          // images: obj.img,  
        });
      
        await postss.save();
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
            message: "wrong",
            record:{
                success: "false"
            }
        })
        
      }
    } );

    
    router.get('/getPosts', (req, res) => {
        Post.find((err, posts) =>{
            if(err){
                res.send("error not found", err);
            }
            else{
                res.json(posts)
            }
        })
    
        } 
        
    ),
  router.post('/getminxa', async (req, res, next) => {
    console.log("the bodyyyyyyy", req.body);
    
       User.find({minxada: Number(req.body.minxada)}).then((data) => {
        res.json({
          data: data
        })
      })
 
     
    })

    router.post('/qrCode',async (req, res) => {
      console.log("Post are Here");
        try {
  
          const qr = new QrCode({
            QrCode: req.body.QrCode,
        
          });
        
          await qr.save();
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
              message: "wrong",
              record:{
                  success: "false"
              }
          })
          
        }
      } );

module.exports = router;
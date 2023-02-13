const express = require('express')
const mongoose      = require('mongoose');
// const bcrypt        = require('bcrypt');
const User          = require("../models/User")
const crypto =  require('crypto')
const multer = require("multer");
const router = express.Router()
const Post = require("../models/Post")
const QrCode = require("../models/QrCode.js")
const Status = require("../models/Status")
const Attendence = require("../models/Attendence")


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
        User.findOne({_id :req.body.user_id}).then((user)=>{

            const postss = new Post({
                // name: req.body.name,
                text: req.body.text,
                user_id : user._id,
                user_name : user.name,
                // image :req.file.path
                // images: obj.img,  
              });
            
               postss.save();
              console.log("yesssssssssssssss");
              res.send({
                  success: true,
                  record:{
                      success: "true"
                  }
                 
              })
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
      console.log("%%%%%%%%%%%%%5", req.body);
      console.log("Qr Here");
        try {
  
          // const qr = new QrCode({
          //   qrCode: Number(req.body.qrCode),
            
          // });
        
          // await qr.save();
          QrCode.findOneAndUpdate({type: 1}, {qrCode: Number(req.body.qrCode)}).then((data) => {
            if(data) {
              res.send({
                data :data,
                  success: true,
                  record:{
                      success: "true"
                  }
                 
              })
            }
          })

       
          console.log("yesssssssssssssss");
       
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


      router.post('/getQrInfo', async (req, res, next) => {
        console.log("the bodyyyyyyy", req.body);
        
           QrCode.findOne({type :1}).then((data) => {
            res.json({
              data: data
            })
          })
     
         
        }),

        

    router.post('/status',async (req, res) => {
      console.log("status Here");
    
        try {
  
            User.findOne({_d : req.body.user_id}).then((user)=>{
        
                const stTus = new Status({
                    IsAccept :req.body.IsAccept,
                    user_id : user._id,
                    user_name :user.name,
                    // accept: req.body.accept,
                    // reject:req.body.reject,
                
                  });
                
                   stTus.save();
                  // qr.createdAt
                  console.log("yesssssssssssssss");
                  res.send({
                    data :stTus,
                      success: true,
                      record:{
                          success: "true"
                      }
                     
                  })
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


      router.get('/getStatus', (req, res) => {
        Status.find((err, posts) =>{
            if(err){
                res.send("error not found", err);
            }
            else{
                res.json(posts)
            }
        })
    
        } 
        
    ),
      
    router.post('/qrData',async (req, res) => {
      // code iyo user_id
      console.log(req.body)
      QrCode.findOne({qrCode: Number(req.body.qrCode)}).then((found) => {
        if(found) {
          console.log("correct qr code")
          User.findOne({_id: req.body.user_id}).then((user) => {
            if(user) {
              console.log("-----user found---------", user);
              const present = new Attendence({
                user_id: user._id,
                user_name: user.name,
                user_phone: user.phoneNo
              })
              present.save().then((data) => {
                req.json({
                  success: true,
                  data: data
                })
              })
            }
          })
        }else{
            console.log("erooooooor")
          // wromg qrcode 
        }
      })

    });

    router.get('/getAttendence', (req, res) => {
        Attendence.find((err, att) =>{
            if(err){
                res.send("error not found", err);
            }
            else{
                res.json(att)
            }
        })
    
        } 
        
    ),

    // router.get('/qrCodebyid/:qrCodeId' , async (req, res)=>{
    //   try{
    //     const qrCode = QrCode.findById(req.params.qrCodeId);
    //     if(!qrCode) return res.status(404).json({message: 'QrCode not found'});
    //     res.json({qrCodeData : qrCode.data});
    //   }catch(err){
    //     res.status(500).json({message: 'Error finding qrCode'});
    //   }
    // })

module.exports = router;
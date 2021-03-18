const express = require("express")
const router = express.Router()
const Post = require("../Database/Post")
const multer  = require("multer")
const path = require("path")
const Users = require("../Database/Users")
const auth = require("../middleware/auth")
//storage

const storage = multer.diskStorage({
  destination : (req,file,cb) => {
    cb(null,"./uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
}) 

const upload = multer({ storage: storage })


router.post("/addpost" ,auth,upload.single('image') ,async(req,res) => {

  try{ 

    const user = await Users.findById(req.user);

    const newpost = new Post({  
      creator : user.username,
      image : req.file.filename,
      postComment : req.body.postComment
    })


    const savedpost = await newpost.save()
    res.json(savedpost)
  }catch(err){
    console.log(err)
  }
})



router.get("/allpost",(req,res) => {
  Post.find({},(err,data) => {
    if(err){
      console.log(err)
    }else{ 
      res.send(data)
    }
  })
})



router.delete("/delete/:id",(req,res) => { 
  Post.findOneAndDelete({creator : req.params.id},(err,data) => {
    if(err){
      res.send(err)
    }else{
      res.send(data)
    }
  })

})


router.put  ("/like",auth,async(req,res) => {
  try{
    const user = await Users.findById(req.user);


    Post.findByIdAndUpdate(req.body.id,{
      $push:{like:user.id}
  },{
      new:true
  }).exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })





  } catch(err){
    console.log(err)
  }
})






 router.put  ("/unlike",auth,async(req,res) => {
  try{
    const user = await Users.findById(req.user);
    Post.findByIdAndUpdate(req.body.id,{
      $pull:{like:user.id}
  },{
      new:true
  }).exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })   
  } catch(err){
    console.log(err)
  }
})

router.put("/comment",auth,async(req,res) => {

    try{
      const user = await Users.findById(req.user);
      Post.findByIdAndUpdate(req.body.id,{
        $push : {
          comments : [{
            username :user.username,
            comment : req.body.comment
          }]
        }
      },{new : true}).exec((err,result) => {
        if(err){
          console.log(err)
        }else{
          res.json(result)
        }
      })

    }catch(err){
      console.log(err)
    }

 

   
   
})










router.get("/my",auth,async(req,res) => {
  try{
    const user = await Users.findById(req.user);
    res.send(user.id)
  } catch(err){
    console.log(err)
  }
 
})

 

module.exports = router

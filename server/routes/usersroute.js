const express = require("express")
const router = express.Router()
const Users = require("../Database/Users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")


router.post("/sigin",async(req,res) => {
  try{
    let {username,email,password,passwordverify} = req.body


    if(!email || !password || !passwordverify){
      return res.status(400).send("butun degerler dolu olmali")
     }
   
     if(password != passwordverify)
     {
       return res.status(400).send("sifreler ayni olmali")
     }
   
     if(password.length < 6){
       return res.status(400).send("password 6 kaarakterden uzun olmali")
     } 
     

   
     if (!username) username = email;
    
   
     const salt = await bcrypt.genSalt()
     const passwordHash = await bcrypt.hash(password,salt)
   
   
   
     const newuser = new Users({
       username : username,
       email : email,
       passwordHash : passwordHash
     })
   
     const saveduser = newuser.save()
   
     const token = jwt.sign({
       user : saveduser._id
     },
     process.env.JWT_SECRET
     )
   
     res.cookie("token",token,{httpOnly : true}).send()

    
  }catch(err){
    console.log(err)
  }
})



router.post("/login",async(req,res) => {
  try{
    const {email,password} = req.body
  
    if(!email || !password){
      res.status(400).send("degerler dolu olmali")
    }
  
    const tokuser = await Users.findOne({email})
  
    if (!tokuser)
    return res.status(401).send("Wrong email or password");
  
  
    const passwordCorrect = await bcrypt.compare(
      password,
      tokuser.passwordHash
    );
  
    if (!passwordCorrect)
      return res.status(401).send("Wrong email or password.");
  
  
  
      const token = jwt.sign(
        {
          user: tokuser._id,
        },
        process.env.JWT_SECRET
      );
  
  
      res.cookie("token",token,{httpOnly : true}).send()
  
  
  }catch(err){
    console.log(err)
  }
  })
  
  

  router.get("/logout",(req,res) => {
    res.cookie("token","",{httpOnly : true}).send()
  })
  


  router.get("/loggedIn", (req, res) => {
    try {
      const token = req.cookies.token;
  
      if (!token) return res.json(false);
  
      jwt.verify(token, process.env.JWT_SECRET);
  
      res.send(true);
    } catch (err) {
      res.send(false);
    }
  });
  


  router.get("/", auth, async (req, res) => {
    const user = await Users.findById(req.user);
    res.send(user.username)
  });







module.exports = router



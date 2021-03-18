const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const Pusher = require("pusher")
require("dotenv/config")



app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin : true,
  credentials : true
}))

app.use("/uploads",express.static("uploads"))



const pusher = new Pusher({
  appId: "1153363",
  key: "4314359379c41a8851b3",
  secret: "402389e28aa3aac04727",
  cluster: "eu",
  useTLS: true
});



//middleware

const userrouter = require("./routes/usersroute")
app.use("/user",userrouter)

const postsroute = require("./routes/postsroute")
app.use("/post",postsroute)






mongoose.connect(process.env.DB_CONNECTION ,{useNewUrlParser : true},{ useUnifiedTopology: true })


mongoose.connection.once("open",() => {
  console.log("dataya baglando")

  const changeStream = mongoose.connection.collection("newposts").watch()

  changeStream.on("change",(change) => {
    if(change.operationType === "insert"){
      pusher.trigger("newposts","newnewpost",{
        'change' : change
      })
    }
  })



})





app.listen(process.env.PORT || 8100,() => {
  console.log("servere baglandi")
})




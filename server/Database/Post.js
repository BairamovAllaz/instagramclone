const mongoose = require("mongoose")

const newpost = new mongoose.Schema({
  creator : String,
  image : String,
  postComment  : String,
  like : [{type : String}],
  comments : [{username : String,comment : String}],
  created:  {type: Date, default: Date.now}
})


const post = mongoose.model("newpost",newpost)
module.exports = post





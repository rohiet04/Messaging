const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const socketio = require("socket.io")
const app = express()

app.set("view engine" , "ejs")
app.use(express.static("public"))


app.get("/", function(req,res){
  res.render("index")
})


const server = app.listen(3000,function(){
  console.log("listening on port 3000")
})


const io = socketio(server)

io.on("connection" , function(socket){
  console.log("New User connected")


socket.username = "Anonymous"
socket.on('change_username' , function(data){
  socket.username = data.username
})

socket.on('new_message',function(data){
  console.log("new message")

io.sockets.emit("receive_message",{message:data.message,username:socket.username})
})

socket.on('typing', function(data){
  socket.broadcast.emit('typing',{username:socket.username})
})

})

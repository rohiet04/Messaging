(function connect(){
  let socket =io.connect("http://localhost:3000")

let username = document.querySelector("#username")
let curUsername = document.querySelector(".card-header")
let usernameBtn = document.querySelector("#usernameBtn")

let message = document.querySelector("#message")
let messageBtn = document.querySelector("#messageBtn")
let messageList = document.querySelector("#message-list")

let info = document.querySelector(".info")

usernameBtn.addEventListener("click",function(event){
  console.log(username.value)
  socket.emit("change_username" , {username:username.value})
  curUsername.textContent = username.value
  username.value = ""

})

messageBtn.addEventListener("click", function(event){
  console.log(message.value)
  socket.emit("new_message",{message:message.value})
  message.value = ""
})

socket.on("receive_message" , function(data){
  console.log(data)
  let listItem = document.createElement("li")
  listItem.textContent = data.username + ":" + data.message
  listItem.classList.add("list-group-item")
  messageList.appendChild(listItem)
})

message.addEventListener('keypress',function(event){
  socket.emit('typing')
})

socket.on('typing' , function(data){
  info.textContent = data.username + " is typing..."
  setTimeout(function(){
    info.textContent=''},5000)
})

})()

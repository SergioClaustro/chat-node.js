var socket = io.connect("https://chat-node-js-c95z.onrender.com/");

//Query DOM
var output = document.getElementById("output"),
  handle = document.getElementById("handle"),
  message = document.getElementById("message"),
  btn = document.getElementById("send"),
  feedback = document.getElementById("feedback");

//Emit events
btn.addEventListener("click", function () {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
});

message.addEventListener("keypress", function () {
  socket.emit("typing", handle.value);
});

//Listen for events

socket.on("chat", function (data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function (data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});

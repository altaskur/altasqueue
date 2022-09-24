const socket = io("http://localhost:3005");

socket.on("connect", () => {});

let inputMessage = document.querySelector("input[type='text']");
let button = document.querySelector("button");
let pingButton = document.querySelectorAll("button")[1];
let textArea = document.querySelector("textarea");

button.addEventListener("click", () => {
  socket.emit("event", inputMessage.value);
});
pingButton.addEventListener("click", () => {
  socket.emit("ping");
  console.log("Sending ping");
});

socket.on("ping", () => {
  console.log("Received pong");
});

socket.on("event", (data) => {
  console.log("Received event", data);
  textArea.value = data;
});

socket.on("animation", (data) => {
  console.log("Status animation", data);
  if (data === "start") {
    textArea.style.backgroundColor = "red";
  } else {
    textArea.style.backgroundColor = "white";
  }
});

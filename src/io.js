const { checkAnimationTime, checkQue } = require("./queue");

const httpServer = require("http").createServer();
const io = require("socket.io")(
  (httpServer,
  {
    cors: {
      origin: "http://localhost:3004",
    },
  })
);

io.on("connection", (client) => {
  client.on("connect", () => {
    console.log("Client connected");
  });
  client.on("disconnect", () => {
    console.log("Client disconnected");
  });

  client.on("event", (data) => {
    console.log("Received event", data);

    if (checkQue(data) === "idle") {
      let time = checkAnimationTime(data);
      processQueue(data, time);
    } else {
      console.log("Queue busy");
    }

    client.on("ping", () => {
      console.log("Received ping");
      client.emit("ping", "pong");
    });
  });

  function processQueue(data, time) {
    queueStatus = "busy";
    console.log("Switch status to busy");
    console.log("Processing event", data);

    client.emit("event", data);
    client.emit("animation", "start");

    console.log("Sent event", data);
    console.log("Sent animation start");

    setTimeout(() => {
      client.emit("animation", "end");
      queue.shift();
      queueStatus = "idle";

      console.log("Sent animation end");
      console.log("set queue to: ", queueStatus);
      console.log("Queue array: ", queue);

      if (queue.length > 0) {
        processQueue(queue[0], client);
      } else {
        console.log("Queue empty");
      }
    }, time);
  }
});
module.exports = io;

const { checkAnimationTime, checkQueue, addQueue } = require("./queue");

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
    console.log("[New event] Received event", data);

    addQueue(data);
    if (checkQueue(data) === "idle") {
      processQueue();
    }
  });

  client.on("ping", () => {
    console.log("Received ping");
    client.emit("ping", "pong");
  });

  function processQueue() {
    queueStatus = "busy";
    console.log("------ Start processQueue --------");
    console.log("[Status] Switch status to busy");

    let actualEvent = queue.shift();
    let time = checkAnimationTime(actualEvent);
    actualEvent.time = time;

    console.log("[Event] Processing event", actualEvent);
    console.log("[Time] Time set to", time);

    console.log("[ Sending ] Sending data to client", actualEvent);
    console.log("[ Sending ] Sending animation start to client");

    client.emit("data", actualEvent);
    client.emit("animation", "start");

    console.log("[Delay] Delaying", time, "ms");

    setTimeout(() => {
      console.log("[ Delay Finished ] Delay finished");
      console.log("[ Sending ] Sending animation end to client");
      client.emit("animation", "end");

      queueStatus = "idle";
      console.log("[Status] Switch status to idle ", queueStatus);

      if (queue.length > 0) {
        console.log(
          " [ Queue ] Queue not empty, processing next event ",
          queue[0]
        );
        processQueue();
      } else {
        console.log(" [ Queue ] Queue empty");
      }
    }, actualEvent.time);

    console.log("---- End processQueue ----");
  }
});
module.exports = io;

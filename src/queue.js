queue = [];
queueStatus = "idle";
const defaultTime = 8000;

function checkQueue() {
  console.log("------ Start checkQueue --------");
  console.log("Queue status: ", queueStatus);
  console.log("------ End checkQueue --------");

  if (queueStatus === "idle") {
    return "idle";
  } else {
    return "busy";
  }
}

function addQueue(data) {
  console.log("------ Start addQueue --------");
  console.log("Adding event to queue", data);
  queue.push(data);
  console.log("Queue array: ", queue);
  console.log("------ End addQueue --------");
}

function checkAnimationTime(data) {
  let time = Number(data.time);

  if (data.time === undefined) {
    time = defaultTime;
  }
  return time;
}

module.exports = { checkQueue, addQueue, checkAnimationTime };

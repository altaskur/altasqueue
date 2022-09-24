queue = [];
queueStatus = "idle";
const defaultTime = 8000;

function checkQue(data) {
  queue.push(data);
  console.log("Queue", queue);
  console.log("New event loaded", data);
  console.log("Queue status", queueStatus);
  console.warn(queueStatus);
  if (queueStatus === "idle") {
    return "idle";
  } else {
    return "busy";
  }
}

function checkAnimationTime(data) {
  let time = Number(data.time);

  if (data.time === undefined) {
    time = defaultTime;
  }
  console.log("Time set to", time);
  return time;
}

module.exports = { checkQue, checkAnimationTime };

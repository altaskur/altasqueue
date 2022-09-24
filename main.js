require("dotenv").config();

const io = require("./src/io");
const app = require("./src/express");

io.listen(process.env.PORT_IO, () => {
  console.log("Socket-io server on port ", process.env.PORT_IO);
});

app.listen(process.env.PORT_EXPRESS, () => {
  console.log("Express server on port ", process.env.PORT_EXPRESS);
});

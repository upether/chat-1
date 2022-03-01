const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const roomList = {};

io.on("connection", (socket) => {
  socket.on("join", async ({ roomId }) => {
    console.log(roomId);
    socket.join(roomId);
  });
  socket.on("message", ({ roomId, name, message }) => {
    console.log(roomId, name, message);
    console.log(io.sockets.adapter);
    io.emit("message", { name, message });
  });
});
server.listen(4000, function () {
  console.log("listening on port 4000");
});

const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const { join } = require("path");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});


io.on("connection", (socket) => {
  socket.on("join Room", async ({ roomId }) => {
    console.log("join Room")
    console.log(roomId);
    for (let room of [...socket.rooms].slice(1)) {
      socket.leave(room);
    }
    socket.join(roomId);
  });
  socket.on("message", ({ roomId, name, message }) => {
    console.log(roomId, name, message);
    io.to(roomId).emit("message", { name, message });
  });
  socket.on("disconnect", () => {
    console.log("disconnect")
  });
});
server.listen(4000, function () {
  console.log("listening on port 4000");
});

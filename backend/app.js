require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const gameRoutes = require("./routes/game");
const authRoutes = require("./routes/auth");
const { app, io, server, express } = require("./server");

const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/games", gameRoutes);
app.use("/users", authRoutes);

app.use((error, req, res, next) => {
  console.log(error.message);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

app.get("./", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  console.log("New client connected");
  try {
    socket.on("join-room", (gameId, userId) => {
      console.log("joining room" + userId);
      socket.join(gameId);
      io.to(gameId).emit("user-connected", userId);
      socket.on("disconnect", () => {
        console.log("left room");
        io.to(gameId).emit("user-disconnected", userId);
      });
    });
  } catch (err) {
    console.log(err);
  }
});

mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

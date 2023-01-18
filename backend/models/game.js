const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    gameId: {
      type: String,
      required: true,
    },
    player1: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    player2: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    board: {
      type: Array,
      required: true,
    },
    status: {
      type: String, // p1turn, p2turn, p1win, p2win, draw
      required: true,
    },
  },
  {
    timestamps: true, // will automatically timestamp when a new version is added.
  }
);

module.exports = mongoose.model("Game", gameSchema);

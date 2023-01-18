const short = require("short-uuid")();
short.maxLength = 6;
const { winCheck } = require("../utils/winCheck");
const { io } = require("../server");
const Game = require("../models/game");
const User = require("../models/user");

exports.getGames = (req, res, next) => {
  const userId = req.userId;
  Game.find({ $or: [{ player1: userId }, { player2: userId }] }).then(
    (games) => {
      res
        .status(200)
        .json({ message: "Fetched games successfully.", games: games });
    }
  );
};

exports.getGame = (req, res, next) => {
  const gameId = req.params.gameId;
  Game.findOne({ gameId: gameId })
    .populate(["player1", "player2"])
    .then((game) => {
      if (!game) {
        const error = new Error("No such game exist");
        error.statusCode = 404;
        return next(error);
      }
      if (
        game.player1._id.toString() !== req.userId &&
        game.player2._id.toString() !== req.userId
      ) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        return next(error);
      }
      res
        .status(200)
        .json({ message: "Fetched game successfully.", game: game });
    });
};

exports.createGame = (req, res, next) => {
  const p2mail = req.body.opponent;
  let p1id = req.userId;
  let p2id;
  User.findOne({ email: p2mail }).then((user2) => {
    if (!user2) {
      const error = new Error("User 2 does not exist");
      error.statusCode = 404;
      return next(error);
    }
    p2id = user2._id;
    if (p1id === p2id) {
      const error = new Error("Cannot play with yourself");
      error.statusCode = 403;
      return next(error);
    }
    const game = new Game({
      gameId: short.new(),
      player1: p1id,
      player2: p2id,
      board: new Array(9).fill(0),
      status: "p1turn",
    });
    game.save();
    res.status(201).json({ message: "Game created!", gameId: game.gameId });
  });
};

exports.updateGame = (req, res, next) => {
  const gameId = req.params.gameId;
  console.log(gameId);
  const board = req.body.board;
  Game.findOne({ gameId: gameId }).then((game) => {
    if (!game) {
      const error = new Error("No such game exist");
      error.statusCode = 404;
      return next(error);
    }
    if (game.board.toString() === board.toString()) {
      const error = new Error("No changes made");
      error.statusCode = 403;
      return next(error);
    }
    if (
      game.player1._id.toString() === req.userId &&
      game.status !== "p1turn"
    ) {
      const error = new Error("Not your turn");
      error.statusCode = 403;
      return next(error);
    }
    if (
      game.player2._id.toString() === req.userId &&
      game.status !== "p2turn"
    ) {
      const error = new Error("Not your turn");
      error.statusCode = 403;
      return next(error);
    }
    if (
      game.player1._id.toString() !== req.userId &&
      game.player2._id.toString() !== req.userId
    ) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      return next(error);
    }
    if (
      game.status === "p1won" ||
      game.status === "p2won" ||
      game.status === "draw"
    ) {
      const error = new Error("Game is already over");
      error.statusCode = 403;
      return next(error);
    }

    if (winCheck(board) === 1) game.status = "p1won";
    else if (winCheck(board) === 2) game.status = "p2won";
    else if (winCheck(board) === 3) game.status = "draw";
    else {
      if (game.status === "p1turn") game.status = "p2turn";
      else game.status = "p1turn";
    }
    game.board = board;
    game
      .save()
      .then((game) => {
        // console.log(io.sockets.adapter.rooms);
        io.emit("gameUpdate");
        res
          .status(200)
          .json({ message: "Game updated successfully.", game: game });
      })
      .catch((err) => {
        const error = new Error(err);
        error.statusCode = 500;
        return next(error);
      });
  });
};

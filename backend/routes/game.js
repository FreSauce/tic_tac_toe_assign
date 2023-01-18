const express = require("express");

const router = express.Router();

const gameController = require("../controllers/game");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, gameController.getGames);

router.post("/create", isAuth, gameController.createGame);

router.get("/:gameId", isAuth, gameController.getGame);

router.put("/:gameId", isAuth, gameController.updateGame);

module.exports = router;

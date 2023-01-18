const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Game = require("../models/game");

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        username: username,
        name: name,
        games: [],
      });

      return user.save();
    })
    .then((result) => {
      res
        .status(201) // resource created.
        .json({ message: "User created!", userid: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  let loadedUser;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        const error = new Error("No such user exist");
        error.statusCode = 401; // Not authenticated
        return next(error);
      }

      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401; // Not authenticated
        return next(error);
      }

      // The sign method creates a new signature and packs that into a new JSON WEB TOKEN.

      // We can add any data we want into the token.

      // The second argument in the sign method is the private key that is used for signing the token.(which will only be known to the server)

      // The third argument is the options field where we can for example set how the long before the token expires.

      // Also we set the expiresIn to 1hr due to security becuase the token is stored on the browser and some person might steel it use it for himself so adding expiresIn will limit the amount of time other person can use his account.

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProfile = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("No such user exist");
        error.statusCode = 401; // Not authenticated
        return next(error);
      }
      Game.find({ $or: [{ player1: userId }, { player2: userId }] })
        .populate(["player1", "player2"])
        .then((games) => {
          res.status(200).json({
            username: user.username,
            email: user.email,
            games: games,
          });
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

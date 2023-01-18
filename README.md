
# Async Tic Tac Toe Game

A Tic Tac Toe game designed for mobile web, which supports multiplayer features.


## Workflow

User can register on the platform (Email and username must be unique).

After registration, he can use the credentials to login to the platform (username + password).

The user will be displayed a page of all the past games played by the user. And he can create a new game using the button at bottom right of screen.

On new game page, user needs to enter the opponent's email ID, and on submission a new game will be created.

The user will be redirected to the game page with a chance to make a move on the board.
The board state is updated to database on clicking submit, and then a socket event is triggered to update the pages of both the players.
This way, the game state is consistent in database, and socket is used only to refresh the page state.

All the buttons are disabled if the user has made its move, or if the game is completed.

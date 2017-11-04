// ========================================================================
// SCRIPT WITH POKER GAME FUNCTIONS USED IN THIS PROGRAM
// ========================================================================

// Function to rank a game hand according to the game rules
function rankHand(idxPlayer, hand) {
  
}

// Function to check the card hands of all players
function checkHands(listHands) {
  idxWinner = -1;
  var hand1 = listHands[0];
  rankHandPlayer1 = rankHand(idxPlayer1, hand1);
  var hand2 = listHands[1];
  rankHandPlayer2 = rankHand(idxPlayer2, hand2);
  if (rankHandPlayer1 > rankHandPlayer2) {
    // Result Case #01: Player 1 ranking is greater than player 2 ranking
    idxWinner = idxPlayer1;
  } else if (rankHandPlayer1 < rankHandPlayer2) {
    // Result Case #02: Player 1 ranking is less than player 2 ranking
    idxWinner = idxPlayer2;
  } else {
    // Result Case #02: Player 1 ranking is the same as player 2 ranking
    checkHighestValueCard(listHands);
  }
}

// Funtion to check the highest value card of all players
function checkHighestValueCard(listHands) {
  idxWinner = 0;
}

// Function to set the message of the game result
function setGameResultMessage() {
  var result = "";
  switch (idxWinner) {
    case idxPlayer1:
      result = "The winner of this game is: " + namePlayer1 + "!";
      break;
    case idxPlayer2:
      result = "The winner of this game is: " + namePlayer2 + "!";
      break;
    case 0:
      result = "It's a tie!";
      break;
    default:
      result = "Unknown result";
      break;
  }
  return result;
}

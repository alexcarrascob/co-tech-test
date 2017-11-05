// ========================================================================
// SCRIPT WITH POKER GAME FUNCTIONS USED IN THIS PROGRAM
// ========================================================================

// Function to check if a given quantity of cards of the input list share the same given number.
function checkEqualNumberCards(listCards, numberRequired, quantityRequired) {
  if (listCards.length < 2) {
    return false;
  }
  if (quantityRequired > listCards.length) {
    return false;
  }
  var quantityFound = 0;
  var number = numberRequired;
  var currentNumber = "";
  var i = 1;
  do {
    currentNumber = listCards[i].number;
    if (currentNumber == number) {
      quantityFound++;
    }
    if (quantityFound == quantityRequired) {
      return true;
    } else if (quantityFound > quantityRequired) {
      return false;
    }
    i++;
  } while (i < listCards.length);
  return false;
}

// Function to check if a given quantity of cards of the input list share the same given suit.
function checkEqualSuitCards(listCards, suiteRequired, quantityRequired) {
  if (listCards.length < 2) {
    return false;
  }
  if (quantityRequired > listCards.length) {
    return false;
  }
  var quantityFound = 0;
  var suit = suiteRequired;
  var currentSuit = "";
  var i = 1;
  do {
    currentSuit = listCards[i].suit;
    if (currentSuit == suit) {
      quantityFound++;
    }
    if (quantityFound == quantityRequired) {
      return true;
    } else if (quantityFound > quantityRequired) {
      return false;
    }
    i++;
  } while (i < listCards.length);
  return false;
}

// Function to check if all the cards of the input list have consecutive numbers.
function checkAllConsecutiveNumbersCards(listCards) {
  var prev = listCardNumbers.indexOf(listCards[0].number);
  var next = 0;
  var i = 1;
  do {
    next = listCardNumbers.indexOf(listCards[i].number);
    if (next==0) {
      if (prev!=12) {
        return false;
      } else {
        prev = next;
      }
    } else if (next != (prev+1)) {
        return false;
    } else {
      prev = next;
    }
    i++;
  } while (i < listCards.length);
  return true;
}

// Function to get the score of a card, according to its number.
function getCardScore(card) {
  var upperNumber = card.number.toUpperCase();
  var scoreNumber = mapNumberScore[upperNumber];
  return scoreNumber;
}

// Function to get the highest card value of the input hand.
function getHighestCard(hand) {
  console.log("ini function getHighestCard");
  console.log("param hand:\n" + convertToString(hand));
  console.log("-> hand.index=" + hand.index);
  console.log("-> hand.amountCards=" + hand.amountCards);
  console.log("-> hand.cards=\n" + convertToString(hand.cards));
  var maxScore = 0;
  var maxCard = null;
  var currentScore = 0;
  for (var i = 0; i < hand.cards.length; i++) {
    currentScore = getCardScore(hand.cards[i]);
    if(currentScore >= maxScore) {
      maxScore = currentScore;
      maxCard = hand.cards[i];
    }
  }
  console.log("-> maxScore=" + maxScore);
  console.log("-> maxCard=\n" + convertToString(maxCard));
  console.log("end function getHighestCard");
  return maxCard;
}

// Funtion to check the highest value card of all players.
function checkHighestValueCard(listHands, amountCards) {
  console.log("ini function checkHighestValueCard");
  console.log("-> amountCards=" + amountCards);
  console.log("-> listHands=\n" + convertToString(listHands));
  if (amountCards != 0) {
    var maxCardPlayer1 = getHighestCard(listHands[0]);
    var scoreMaxCardPlayer1 = getCardScore(maxCardPlayer1);
    var maxCardPlayer2 = getHighestCard(listHands[1]);
    var scoreMaxCardPlayer2 = getCardScore(maxCardPlayer2);
    if (scoreMaxCardPlayer1 > scoreMaxCardPlayer2) {
      console.log("return player1=" + maxCardPlayer1.index);
      console.log("end function checkHighestValueCard");
      return maxCardPlayer1.index;
    } else if (scoreMaxCardPlayer1 < scoreMaxCardPlayer2) {
        console.log("return player2=" + maxCardPlayer2.index);
        console.log("end function checkHighestValueCard");
        return maxCardPlayer2.index;
    } else {
      listHands[0].cards.shift();
      listHands[0].amountCards = listHands[0].amountCards - 1;
      listHands[1].cards.shift();
      listHands[1].amountCards = listHands[1].amountCards - 1;
      var newAmountCards = amountCards - 1;
      console.log("call recursively checkHighestValueCard");
      return checkHighestValueCard(listHands, newAmountCards);
    }
  } else {
    console.log("return tie=0");
    console.log("end function checkHighestValueCard");
    return 0;
  }
}

// Function to verify the movement of the Poker game
// called "One Pair".
function checkMoveOnePair(hand) {
  var currentCheck = false;
  var listViewedNumbers = [];
  for (card of hand.cards) {
    if (listViewedNumbers.indexOf(card.number) == -1) {
      currentCheck = checkEqualNumberCards(hand.cards, card.number, 2);
      if (currentCheck) {
        return true;
      }
      listViewedNumbers.push(card.number);
    }
  }
  return false;
}

// Function to verify the movement of the Poker game
// called "Two Pairs".
function checkMoveTwoPairs(hand) {
  var currentCheck = false;
  var listViewedNumbers = [];
  var listPairedNumbers = [];
  for (card of hand.cards) {
    if (listViewedNumbers.indexOf(card.number) == -1) {
      currentCheck = checkEqualNumberCards(hand.cards, card.number, 2);
      if (currentCheck) {
        listPairedNumbers.push(card.number);
      }
      listViewedNumbers.push(card.number);
    }
    if (listPairedNumbers.length == 2) {
      return true;
    }
  }
  return false;
}

// Function to verify the movement of the Poker game
// called "Three of a Kind".
function checkMoveThreeSameKind(hand) {
  var currentCheck = false;
  var listViewedNumbers = [];
  for (card of hand.cards) {
    if (listViewedNumbers.indexOf(card.number) == -1) {
      currentCheck = checkEqualNumberCards(hand.cards, card.number, 3);
      if (currentCheck) {
        return true;
      }
      listViewedNumbers.push(card.number);
    }
  }
  return false;
}

// Function to verify the movement of the Poker game
// called "Straight".
function checkMoveStraight(hand) {
  return checkAllConsecutiveNumbersCards(hand.cards);
}
// Function to verify the movement of the Poker game
// called "Flush".
function checkMoveFlush(hand) {
  return checkEqualNumberCards(hand.cards, hand.cards[0].suit, hand.cards.length);
}

// Function to verify the movement of the Poker game
// called "Full House".
function checkMoveFullHouse(hand) {
  var currentCheck = false;
  var listViewedNumbers = [];
  var pairedNumber = 0;
  var threesomeNumber = 0;
  for (card of hand.cards) {
    if (listViewedNumbers.indexOf(card.number) == -1) {
      currentCheck = checkEqualNumberCards(hand.cards, card.number, 2);
      if (currentCheck) {
        pairedNumber = card.number;
      }
      currentCheck = checkEqualNumberCards(hand.cards, card.number, 3);
      if (currentCheck) {
        threesomeNumber = card.number;
      }
      listViewedNumbers.push(card.number);
    }
    if ((pairedNumber != 0) && (threesomeNumber != 0)) {
      return true;
    }
  }
  return false;
}

// Function to verify the movement of the Poker game
// called "Four of a Kind".
function checkMoveFourSameKind(hand) {
  var currentCheck = false;
  var listViewedNumbers = [];
  for (card of hand.cards) {
    if (listViewedNumbers.indexOf(card.number) == -1) {
      currentCheck = checkEqualNumberCards(hand.cards, card.number, 4);
      if (currentCheck) {
        return true;
      }
      listViewedNumbers.push(card.number);
    }
  }
  return false;
}

// Function to verify the movement of the Poker game
// called "Straight Flush".
function checkMoveStraightFlush(hand) {
  var checkStraightHand = checkMoveStraight(hand);
  var checkFlushHand = checkMoveFlush(hand);
  if (checkStraightHand && checkFlushHand) {
    return true;
  }
  return false;
}

// Function to verify the movement of the Poker game
// called "Royal Flush".
function checkMoveRoyalFlush(hand) {
  var checkStraightFlushHand = checkMoveStraightFlush(hand);
  var checkRoyalValues = false;
  var checkListRoyalValuesInOrder = true;
  var checkListRoyalValuesInReverse = true;
  var arrayRoyalValues = ["10", "J", "Q", "K", "A"];
  for (var i = 0; i < hand.cards.length; i++) {
    if (hand.cards[i].number != arrayRoyalValues[i]) {
      checkListRoyalValuesInOrder = false;
      break;
    }
  }
  var reverseRoyalValues = arrayRoyalValues.reverse();
  for (var i = 0; i < hand.cards.length; i++) {
    if (hand.cards[i].number != reverseRoyalValues[i]) {
      checkListRoyalValuesInReverse = false;
      break;
    }
  }
  if (checkListRoyalValuesInOrder && checkListRoyalValuesInReverse) {
    checkRoyalValues = true;
  } else {
    checkRoyalValues = false;
  }
  if (checkStraightFlushHand && checkRoyalValues) {
    return true;
  } else {
    return false;
  }
}

// Function to rank a game hand according to the game rules.
function rankHand(hand) {
  console.log("ini function rankHand");
  console.log("param hand=\n" + convertToString(hand));
  var rank = 0;
  if (checkMoveOnePair(hand)) {
      rank = 1;
  }
  if (checkMoveTwoPairs(hand)) {
      rank = 2;
  }
  if (checkMoveThreeSameKind(hand)) {
      rank = 3;
  }
  if (checkMoveStraight(hand)) {
      rank = 4;
  }
  if (checkMoveFlush(hand)) {
      rank = 5;
  }
  if (checkMoveFullHouse(hand)) {
      rank = 6;
  }
  if (checkMoveFourSameKind(hand)) {
      rank = 7;
  }
  if (checkMoveStraightFlush(hand)) {
      rank = 8;
  }
  if (checkMoveRoyalFlush(hand)) {
      rank = 9;
  }
  console.log("-> rank=" + rank);
  console.log("end function rankHand");
  return rank;
}

// Function to check the card hands of all players.
function checkHands(listHands) {
  console.log("ini function checkHands");
  console.log("param listHands=\n" + convertToString(listHands));
  idxWinner = -1;
  var hand1 = listHands[0];
  console.log("-> hand1=\n" + convertToString(hand1));
  rankHandPlayer1 = rankHand(hand1);
  console.log("-> rankHandPlayer1=" + rankHandPlayer1);
  var hand2 = listHands[1];
  console.log("-> hand2=\n" + convertToString(hand2));
  rankHandPlayer2 = rankHand(hand2);
  console.log("-> rankHandPlayer2=" + rankHandPlayer2);
  if (rankHandPlayer1 > rankHandPlayer2) {
    // Result Case #01: Player 1 ranking is greater than player 2 ranking
    idxWinner = hand1.index;
  } else if (rankHandPlayer1 < rankHandPlayer2) {
    // Result Case #02: Player 1 ranking is less than player 2 ranking
    idxWinner = hand2.index;
  } else {
    // Result Case #02: Player 1 ranking is the same as player 2 ranking
    idxWinner = checkHighestValueCard(listHands, amountCardsByHand);
  }
  console.log("-> idxWinner=" + idxWinner);
  console.log("end function checkHands");
}

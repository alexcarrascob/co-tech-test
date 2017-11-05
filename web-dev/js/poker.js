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
  var maxScore = 0;
  var maxCard = null;
  var currentScore = 0;
  for (var i = 0; i < hand.amountCards; i++) {
    currentScore = getCardScore(hand.cards[i]);
    if(currentScore >= maxScore) {
      maxScore = currentScore;
      maxCard = hand.cards[i];
    }
  }
  return maxCard;
}

// Funtion to check the highest value card of all players.
function checkHighestValueCard(listHands) {
  if (listHands.length != 0) {
    var maxCardPlayer1 = getHighestCard(listHands[0]);
    var scoreMaxCardPlayer1 = getCardScore(maxCardPlayer1);
    var maxCardPlayer2 = getHighestCard(listHands[1]);
    var scoreMaxCardPlayer2 = getCardScore(maxCardPlayer2);
    if (scoreMaxCardPlayer1 > scoreMaxCardPlayer2) {
      return maxCardPlayer1.index;
    } else if (scoreMaxCardPlayer1 < scoreMaxCardPlayer2) {
        return maxCardPlayer2.index;
    } else {
      listHands.shift();
      return checkHighestValueCard(listHands);
    }
  } else {
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
  return checkEqualNumberCards(hand.cards, hand.cards[0].suit, hand.amountCards);
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
  return rank;
}

// Function to check the card hands of all players.
function checkHands(listHands) {
  idxWinner = -1;
  var hand1 = listHands[0];
  rankHandPlayer1 = rankHand(hand1);
  var hand2 = listHands[1];
  rankHandPlayer2 = rankHand(hand2);
  if (rankHandPlayer1 > rankHandPlayer2) {
    // Result Case #01: Player 1 ranking is greater than player 2 ranking
    idxWinner = hand1.index;
  } else if (rankHandPlayer1 < rankHandPlayer2) {
    // Result Case #02: Player 1 ranking is less than player 2 ranking
    idxWinner = hand2.index;
  } else {
    // Result Case #02: Player 1 ranking is the same as player 2 ranking
    idxWinner = checkHighestValueCard(listHands);
  }
}

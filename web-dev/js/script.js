// Execute when the view loads.
$(function () {
  codeMessage = "";
  typeMessage = "";
  descriptionMessage = "";
  fullMessage = "";
  classesMessage = "";
  idxPlayer1 = 1;
  idxPlayer2 = 2;
  $("#btnDealCards").prop("disabled", true);
  emptyAllTableCards();
  emptyMessages();
});

// Function AJAX to shuffle the deck.
function shuffleDeckAJAX() {
  // Set uri for Dealer Service
  var uri = "https://services.comparaonline.com/dealer/deck";
  // Declare and set initially some useful local response variables
  // for the Dealer service
  var responseData = null;
  // Call to the POST method of the Dealer service to shuffle the deck
  $.ajax({
    type: "post",
    url: uri,
    async: false,
    success: function (data, textStatus, jqXHR) {
      responseData = data
      respStatCode = jqXHR.status;
      $("#hidDeckId").val(responseData);
      $("#btnDealCards").prop("disabled", false);
    },
    error: function (jqXHR, textStatus, errorThrown ) {
      respStatCode = jqXHR.status;
      $("#hidDeckId").val("");
      $("#btnDealCards").prop("disabled", true);
    },
    statusCode: getStatusCodesActionsForShuffleDeckService()
  });
  // Return the status code of this operation
  return respStatCode;
}

// Function to shuffle the deck.
function shuffleDeck() {
  // Declare local variable for response status code and initialize it to 0.
  respStatCode = 0;
  // Empty the table cards of all the players
  emptyAllTableCards();
  //Empty all the current messages
  emptyMessages();
  // Deal cards from deck to Player #1
  var statusCode1 = shuffleDeckAJAX();
  // Show message according to status codes obtained
  // from all the service callings
  var arrStatusCodes = [];
  arrStatusCodes[0] = statusCode1;
  generateTypeMessages(arrStatusCodes);
  showMessages();
}

// Function AJAX to deal the cards from the deck to all players.
function dealCardsAJAXForPlayer(idxPlayer) {
  // Read the token of the deck
  var tokenDeck = $("#hidDeckId").val();
  // Set the amount of cards to deal to each player
  var amountCardsByHand = 5;
  // Set uri for Dealer Service
  var uri = "https://services.comparaonline.com/dealer/deck/" + tokenDeck + "/deal/" + amountCardsByHand;
  // Declare and set initially some useful local response variables
  // for the Dealer service
  var responseData = null;
  // Call to the GET method of the Dealer service to deal cards
  // from the deck to all the players
  $.ajax({
    type: "get",
    url: uri,
    async: false,
    dataType: "json",
    success: function (data, textStatus, jqXHR) {
      responseData = data;
      respStatCode = jqXHR.status;
      paintTableCardsForPlayer(idxPlayer, responseData, amountCardsByHand);
    },
    statusCode: getStatusCodesActionsForDealHandService()
  });
  // Return the status code of this operation
  return respStatCode;
}

// Function to deal the cards from the deck to all players.
function dealAllCards() {
  // Declare local variable for response status code and initialize it to 0.
  respStatCode = 0;
  // Empty the table cards of all the players
  emptyAllTableCards();
  //Empty all the current messages
  emptyMessages();
  // Deal cards from deck to Player #1
  var statusCode1 = dealCardsAJAXForPlayer(idxPlayer1);
  // Deal cards from deck to Player #2
  var statusCode2 = dealCardsAJAXForPlayer(idxPlayer2);
  // Show message according to status codes obtained
  // from all the service callings
  var arrStatusCodes = [];
  arrStatusCodes[0] = statusCode1;
  arrStatusCodes[1] = statusCode2;
  generateTypeMessages(arrStatusCodes);
  showMessages();
}

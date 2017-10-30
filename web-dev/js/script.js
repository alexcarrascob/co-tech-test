// ========================================================================
// MAIN SCRIPT OF THIS PROGRAM
// ========================================================================

// Declare a global variable that store the list of hands
// of all players in the current game
var listHands;

// Execute when the view loads.
$(function () {
  initGeneralVars();
  listHands = [];
  codeMessage = "";
  typeMessage = "";
  classesMessage = "";
  fullMessage = "";
  descriptionMessage = "";
  matrixMessages = [];
  nameCurrentService = "";
  argsCurrentService = "";
  idxPlayer1 = 1;
  idxPlayer2 = 2;
  $("#btnDealCards").prop("disabled", true);
  emptyAllTableCards();
  emptyMessages();
});

// Function AJAX to shuffle the deck.
function shuffleDeckAJAX() {
  // Declare a local variable for response state code of service to call.
  // Initialize this variable to 0.
  var respStatCode = 0;
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
  // Re-initialize the general global variables
  initGeneralVars();
  // Empty the table cards of all the players
  emptyAllTableCards();
  //Empty all the current messages
  emptyMessages();
  // Set the general global variable relative to
  // the current service
  nameCurrentService = "Shuffle Deck"
  // Set the general global variable relative to
  // the current call of this service
  argsCurrentService = "";
  // Deal cards from deck to Player #1
  var statusCode1 = shuffleDeckAJAX();
  // Set the final status code of the current service
  // according to status codes obtainerd from all the service callings
  setFinalStatusCodeService();
  // Show message of the service
  showMessage();
}

// Function AJAX to deal the cards from the deck to all players.
function dealCardsAJAXForPlayer(idxPlayer) {
  // Declare a local variable for response state code of service to call.
  // Initialize this variable to 0.
  var respStatCode = 0;
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
      console.log(respStatCode);
      var currentHand = {};
      currentHand["index"] = idxPlayer;
      currentHand["amountCards"] = amountCardsByHand;
      currentHand["cards"] = responseData;
      listHands.push(currentHand);
    },
    error: function (jqXHR, textStatus, errorThrown ) {
      respStatCode = jqXHR.status;
      console.log(respStatCode);
    },
    statusCode: getStatusCodesActionsForDealHandService()
  });
  // Return the status code of this operation
  return respStatCode;
}

// Function to deal the cards from the deck to all players.
function dealAllCards() {
  // Re-initialize the general global variables
  initGeneralVars();
  // Empty the table cards of all the players
  emptyAllTableCards();
  //Empty all the current messages
  emptyMessages();
  // Set the general global variable relative to
  // the current service
  nameCurrentService = "Deal Cards"
  // Set the general global variable relative to
  // the current call of this service
  argsCurrentService = "Player N." + idxPlayer1;
  // Deal cards from deck to Player #1
  var statusCode1 = dealCardsAJAXForPlayer(idxPlayer1);
  // Set the general global variable relative to
  // the current call of this service
  argsCurrentService = "Player N." + idxPlayer2;
  // Deal cards from deck to Player #2
  var statusCode2 = dealCardsAJAXForPlayer(idxPlayer2);
  // Set the final status code of the current service
  // according to status codes obtainerd from all the service callings
  setFinalStatusCodeService();
  // Print all the hands of all players on the table
  // according to the value of codeFinalCurrentService
  if (codeFinalCurrentService == "OK") {
    paintAllTableCards();
  }
  // Show message of the service
  showMessage();
}

// ========================================================================
// MAIN SCRIPT OF THIS PROGRAM
// ========================================================================

// Declare a global variable that store the list of hands
// of all players in the current game
var listHands;

// Execute when the view loads.
$(function () {
  // Empty the current hands of all players
  listHands = [];
  // Re-initialize the general global variables
  initGeneralVars();
  // Empty the table cards of all the players
  emptyAllTableCards();
  //Empty all the current messages
  emptyMessages();
  // Disable the button for Deal Cards to players.
  $("#btnDealCards").prop("disabled", true);
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
  var nameCurrentService = "Shuffle Deck";
  var argsCurrentService = "";
  var mapCustomServiceStatus = {};
  mapCustomServiceStatus["200"] = "Deck shuffled successful.";
  var listStatusCodes = getStatusCodesActionsForShuffleDeckService(nameCurrentService, argsCurrentService, mapCustomServiceStatus);
  // Call to the POST method of the Dealer service to shuffle the deck
  $.ajax({
    type: "post",
    url: uri,
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
    statusCode: listStatusCodes
  });
}

// Function to shuffle the deck.
function shuffleDeck() {
  // Empty the current hands of all players
  listHands = [];
  // Re-initialize the general global variables
  initGeneralVars();
  // Empty the table cards of all the players
  emptyAllTableCards();
  //Empty all the current messages
  emptyMessages();
  // Deal cards from deck to Player #1
  shuffleDeckAJAX();
  // Set the final status code of the current service
  // according to status codes obtainerd from all the service callings
  setFinalStatusCodeService();
  // Show message of the service
  showMessage();
}

function dealAllCardsAJAX() {
  // Read the token of the deck
  var tokenDeck = $("#hidDeckId").val();
  // Set uri for Dealer Service
  var uri = "https://services.comparaonline.com/dealer/deck/" + tokenDeck + "/deal/" + amountCardsByHand;
  // Declare and set initially some useful local response variables
  // for the Dealer service
  var responseData = null;
  var currentStatusCode = 0;
  var nameCurrentService = "Deal Cards";
  for (var idx = 1; idx <= totalPlayers; idx++) {
    var stringIndex = convertNumberToString(idx);
    var argsCurrentService = "Player #" + stringIndex;
    var mapCustomServiceStatus = {};
    mapCustomServiceStatus["200"] = "Hands dealt successful.";
    mapCustomServiceStatus["404"] = "Deck isn't found. It doesn’t exist or has expired.";
    mapCustomServiceStatus["405"] = "There aren’t enough cards in the deck to deal the amount requested.";
    var listStatusCodes = getStatusCodesActionsForDealHandService(nameCurrentService, argsCurrentService, mapCustomServiceStatus);

    console.log("deal cards to player #" + stringIndex + " - 1) Ini - Uri: " + uri);

    // Call to the GET method of the Dealer service to deal cards
    // from the deck to all the players
    $.ajax({
      type: "get",
      url: uri,
      // async: false,
      dataType: "json",
      beforeSend: function (jqXHR) {
        currentStatusCode =jqXHR.status;
      },
      success: function (data, textStatus, jqXHR) {
        currentStatusCode =jqXHR.status;
        argsCurrentService = "Player #" + convertNumberToString(stringIndex);

        console.log("deal cards to player #" + stringIndex + " - 2) OK - status code: " + jqXHR.status);
        console.log("argsCurrentService = " + argsCurrentService);

        responseData = data;
        var currentHand = {};
        currentHand["index"] = 1;
        currentHand["amountCards"] = amountCardsByHand;
        currentHand["cards"] = responseData;
        listHands.push(currentHand);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        currentStatusCode =jqXHR.status;
        argsCurrentService = "Player N" + convertNumberToString(stringIndex);

        console.log("deal cards to player #" + stringIndex + " - 2) ERR - status code: " + jqXHR.status);

      },
      statusCode: listStatusCodes,
      complete: function (jqXHR, textStatus) {
        currentStatusCode =jqXHR.status;

        console.log("deal cards to player #" + stringIndex + " - 3) COMPLETE - status code: " + jqXHR.status);

      }
    });

    console.log("deal cards to player #" + stringIndex + " - 4) End");

  }
}

// Function to deal the cards from the deck to all players.
function dealAllCards() {
  // Empty the current hands of all players
  listHands = [];
  // Re-initialize the general global variables
  initGeneralVars();
  // Empty the table cards of all the players
  emptyAllTableCards();
  //Empty all the current messages
  emptyMessages();
  // Deal cards from deck to all players
  dealAllCardsAJAX();

  logMatrixMessages();

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

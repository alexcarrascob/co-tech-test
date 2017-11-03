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
  // Set uri for Dealer Service
  var uri = "https://services.comparaonline.com/dealer/deck";
  // Declare and set initially some useful local response variables
  // for the Dealer service
  var responseData = null;
  var currentStatusCode = 0;
  var nameCurrentService = "Shuffle Deck";
  var argsCurrentService = "";
  var mapCustomServiceStatus = {};
  mapCustomServiceStatus["200"] = "Deck shuffled successful.";
  var mapActions = $.extend({}, mapServiceStatus, mapCustomServiceStatus);
  // Call to the POST method of the Dealer service to shuffle the deck
  $.ajax({
    type: "post",
    url: uri,
    async: false,
    beforeSend: function (jqXHR) {
      currentStatusCode =jqXHR.status;
    },
    success: function (data, textStatus, jqXHR) {
      responseData = data
      currentStatusCode = jqXHR.status;
      $("#hidDeckId").val(responseData);
      $("#btnDealCards").prop("disabled", false);
      addMessage(currentStatusCode, nameCurrentService, argsCurrentService, mapActions);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      currentStatusCode = jqXHR.status;
      $("#hidDeckId").val("");
      $("#btnDealCards").prop("disabled", true);
      addMessage(currentStatusCode, nameCurrentService, argsCurrentService, mapActions);
    }
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
  // logMatrixMessages();
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
    mapCustomServiceStatus["200"] = "Hand dealt successful.";
    mapCustomServiceStatus["404"] = "Deck isn't found. It doesn’t exist or has expired.";
    mapCustomServiceStatus["405"] = "There aren’t enough cards in the deck to deal the amount requested. YOU MUST RE-SHUFFLE THE DECK.";
    var mapActions = $.extend({}, mapServiceStatus, mapCustomServiceStatus);
    // Call to the GET method of the Dealer service to deal cards
    // from the deck to all the players
    $.ajax({
      type: "get",
      url: uri,
      dataType: "json",
      async: false,
      beforeSend: function (jqXHR) {
        currentStatusCode =jqXHR.status;
      },
      success: function (data, textStatus, jqXHR) {
        currentStatusCode =jqXHR.status;
        argsCurrentService = "Player #" + stringIndex;
        responseData = data;
        var currentHand = {};
        currentHand["index"] = idx;
        currentHand["amountCards"] = amountCardsByHand;
        currentHand["cards"] = responseData;
        listHands.push(currentHand);
        addMessage(currentStatusCode, nameCurrentService, argsCurrentService, mapActions);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        currentStatusCode =jqXHR.status;
        if (currentStatusCode == 405) {
          $("#btnDealCards").prop("disabled", true);
        }
        argsCurrentService = "Player #" + stringIndex;
        addMessage(currentStatusCode, nameCurrentService, argsCurrentService, mapActions);
      }
    });
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
  // Set the final status code of the current service
  // according to status codes obtainerd from all the service callings
  setFinalStatusCodeService();
  // Print all the hands of all players on the table
  paintAllTableCards();
  // Show message of the service
  showMessage();
  // logMatrixMessages();
}

// ========================================================================
// SCRIPT WITH UTILITY FUNCTIONS USED IN THIS PROGRAM
// ========================================================================

// Function to initialize the general global variables to their default values
function initGeneralVars() {
  nameCurrentService = "";
  argsCurrentService = "";
  codeFinalCurrentService = "";
}

// Function to empty the message components in the view.
function emptyMessages() {
  initGeneralVars();
  codeMessage = "";
  typeMessage = "";
  classesMessage = "";
  fullMessage = "";
  descriptionMessage = "";
  matrixMessages = [];

  $("#secMessages").removeClass();
  $("#blkMessages").removeClass();

  $("#secMessages").addClass("messageNotVisible");
  $("#blkMessages").addClass("messageNotVisible");

  $("#blkMessages").html(fullMessage);
}

// Function to empty the table cards of all players.
function emptyAllTableCards() {
  listHands = [];
  $("#blkTableCardsP1").html("");
  $("#blkTableCardsP2").html("");
}

// Function to get the list of defaults actions
// for error status codes for any service.
function getDefaultErrorStatusCodesActions() {
  var listActions =
  {
    404: function() {
      var scMes = 404;
      var sourceMes = "";
      if (argsCurrentService == "") {
        sourceMes = nameCurrentService;
      } else {
        sourceMes = nameCurrentService + " / " + argsCurrentService;
      }
      var descMes = "Deck isn't found. It doesn’t exist or has expired.";
      var listMes = [];
      listMes["statusCode"] = scMes;
      listMes["source"] = sourceMes;
      listMes["description"] = descMes;
      matrixMessages.push(listMes);
    },
    405: function() {
      var scMes = 405;
      var sourceMes = "";
      if (argsCurrentService == "") {
        sourceMes = nameCurrentService;
      } else {
        sourceMes = nameCurrentService + " / " + argsCurrentService;
      }
      var descMes = "There aren’t enough cards in the deck to deal the amount requested.";
      var listMes = [];
      listMes["statusCode"] = scMes;
      listMes["source"] = sourceMes;
      listMes["description"] = descMes;
      matrixMessages.push(listMes);
    },
    500: function() {
      var scMes = 500;
      var sourceMes = "";
      if (argsCurrentService == "") {
        sourceMes = nameCurrentService;
      } else {
        sourceMes = nameCurrentService + " / " + argsCurrentService;
      }
      var descMes = "An internal server error occurred.";
      var listMes = [];
      listMes["statusCode"] = scMes;
      listMes["source"] = sourceMes;
      listMes["description"] = descMes;
      matrixMessages.push(listMes);
    },
    502: function() {
      var scMes = 502;
      var sourceMes = "";
      if (argsCurrentService == "") {
        sourceMes = nameCurrentService;
      } else {
        sourceMes = nameCurrentService + " / " + argsCurrentService;
      }
      var descMes = "Bad Getaway.";
      var listMes = [];
      listMes["statusCode"] = scMes;
      listMes["source"] = sourceMes;
      listMes["description"] = descMes;
      matrixMessages.push(listMes);
    }
  };
  return listActions;
}

// Function to get the list of actions to execute
// for all the possibles status codes of the Shuffle Deck service.
function getStatusCodesActionsForShuffleDeckService() {
  var listOKActions =
  {
    200: function() {
      var scMes = 200;
      var sourceMes = "";
      if (argsCurrentService == "") {
        sourceMes = nameCurrentService;
      } else {
        sourceMes = nameCurrentService + " / " + argsCurrentService;
      }
      var descMes = "Deck shuffled successful.";
      var listMes = [];
      listMes["statusCode"] = scMes;
      listMes["source"] = sourceMes;
      listMes["description"] = descMes;
      matrixMessages.push(listMes);
    }
  };
  var listErrorActions = getDefaultErrorStatusCodesActions();
  var listActions = $.extend({}, listOKActions, listErrorActions);
  return listActions;
}

// Function to get the list of actions to execute
// for all the possibles status codes of the Deal Hand service.
function getStatusCodesActionsForDealHandService() {
  var listOKActions =
  {
    200: function() {
      var scMes = 200;
      var sourceMes = "";
      if (argsCurrentService == "") {
        sourceMes = nameCurrentService;
      } else {
        sourceMes = nameCurrentService + " / " + argsCurrentService;
      }
      var descMes = "Hands dealt successful.";
      var listMes = [];
      listMes["statusCode"] = scMes;
      listMes["source"] = sourceMes;
      listMes["description"] = descMes;
      matrixMessages.push(listMes);
    }
  };
  var listErrorActions = getDefaultErrorStatusCodesActions();
  var listActions = $.extend({}, listOKActions, listErrorActions);
  return listActions;
}

// Function to determine the type of message to display of a service
// based on a collection of status codes obtained
// from multiple calls to this service.
function generateTypeMessage() {
  codeMessage = "OK";
  typeMessage = "Success";
  classesMessage = "messageOK";
  for (var i = 0; i < matrixMessages.length; i++) {
    if (matrixMessages[i]["statusCode"] != 200) {
      codeMessage = "ERR";
      typeMessage = "Error";
      classesMessage = "messageError";
    }
  }
}

// Function to generate the full message to display in the view.
function generateFullMessage() {
  fullMessage = typeMessage + "<br><br>";
  for (var i = 0; i < matrixMessages.length; i++) {
    fullMessage += matrixMessages[i]["source"] + " : " + matrixMessages[i]["description"] + "<br>";
  }
}

// Function to show the message in the view.
function showMessage() {
  generateTypeMessage();
  generateFullMessage();
  $("#secMessages").removeClass();
  $("#blkMessages").removeClass();
  $("#secMessages").addClass("messageVisible");
  $("#blkMessages").addClass("messageVisible " + classesMessage);
  $("#blkMessages").html(fullMessage);
}

function setFinalStatusCodeService() {
  codeFinalCurrentService = "OK";
  for (var i = 0; i < matrixMessages.length; i++) {
    if (matrixMessages[i]["statusCode"] != 200) {
      codeFinalCurrentService = "ERR";
    }
  }
}

function paintAllTableCards() {
  for (var i = 0; i < listHands.length; i++) {
    paintTableCardsForPlayer(listHands[i].index, listHands[i].amountCards, listHands[i].cards);
  }
}

function paintTableCardsForPlayer(idxPlayer, amountCards, dataCards) {
  var htmlCards = "";
  for (var i = 0; i < amountCards; i++) {
    var elem = "";
    var number = dataCards[i].number;
    var suit = dataCards[i].suit;
    elem = number + "-" + suit;
    htmlCards += elem;
    if (i < amountCards - 1) {
      htmlCards += "<br>";
    }
  }
  $("#blkTableCardsP" + idxPlayer).html(htmlCards);
}

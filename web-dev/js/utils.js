// ========================================================================
// SCRIPT WITH UTILITY FUNCTIONS USED IN THIS PROGRAM
// ========================================================================

// Function to log the variable matrixMessages with the response
// from the current services calls on the web console.
function logMatrixMessages() {
  console.log("ini logMatrixMessages");
  console.log("size matrixMessages = " + matrixMessages.length.toString());
  for (var i = 0; i < matrixMessages.length; i++) {
    console.log("matrixMessages[" + i + "]=|" + matrixMessages[i].statusCode + "|" + matrixMessages[i].source + "|" + matrixMessages[i].description+"|");
  }
  console.log("fin logMatrixMessages");
}

// Function to convert a number to a string, prefixing a zero
// if the number is less than 10.
function convertNumberToString(number) {
  var numString = "";
  if (number < 10) {
    numString = "0" + number.toString();
  } else {
    numString = number.toString();
  }
  return numString;
}

// Function to initialize the general global variables to their default values.
function initGeneralVars() {
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
function getDefaultErrorStatusCodesActions(nameCurrentService, argsCurrentService, mapCustomServiceStatus) {
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
      var descMes = "";
      if (scMes.toString() in mapCustomServiceStatus) {
        descMes = mapCustomServiceStatus[scMes.toString()]
      } else {
        descMes = mapServiceStatus[scMes.toString()];
      }
      var objMes = [];
      objMes["statusCode"] = scMes;
      objMes["source"] = sourceMes;
      objMes["description"] = descMes;
      matrixMessages.push(objMes);
    },
    405: function() {
      var scMes = 405;
      var sourceMes = "";
      if (argsCurrentService == "") {
        sourceMes = nameCurrentService;
      } else {
        sourceMes = nameCurrentService + " / " + argsCurrentService;
      }
      var descMes = "";
      if (scMes.toString() in mapCustomServiceStatus) {
        descMes = mapCustomServiceStatus[scMes.toString()]
      } else {
        descMes = mapServiceStatus[scMes.toString()];
      }
      var objMes = [];
      objMes["statusCode"] = scMes;
      objMes["source"] = sourceMes;
      objMes["description"] = descMes;
      matrixMessages.push(objMes);
    },
    500: function() {
      var scMes = 500;
      var sourceMes = "";
      if (argsCurrentService == "") {
        sourceMes = nameCurrentService;
      } else {
        sourceMes = nameCurrentService + " / " + argsCurrentService;
      }
      var descMes = "";
      if (scMes.toString() in mapCustomServiceStatus) {
        descMes = mapCustomServiceStatus[scMes.toString()]
      } else {
        descMes = mapServiceStatus[scMes.toString()];
      }
      var objMes = [];
      objMes["statusCode"] = scMes;
      objMes["source"] = sourceMes;
      objMes["description"] = descMes;
      matrixMessages.push(objMes);
    },
    502: function() {
      var scMes = 502;
      var sourceMes = "";
      if (argsCurrentService == "") {
        sourceMes = nameCurrentService;
      } else {
        sourceMes = nameCurrentService + " / " + argsCurrentService;
      }
      var descMes = "";
      if (scMes.toString() in mapCustomServiceStatus) {
        descMes = mapCustomServiceStatus[scMes.toString()]
      } else {
        descMes = mapServiceStatus[scMes.toString()];
      }
      var objMes = [];
      objMes["statusCode"] = scMes;
      objMes["source"] = sourceMes;
      objMes["description"] = descMes;
      matrixMessages.push(objMes);
    }
  };
  return listActions;
}

// Function to get the list of actions to execute
// for all the possibles status codes of the Shuffle Deck service.
function getStatusCodesActionsForShuffleDeckService(nameCurrentService, argsCurrentService, mapCustomServiceStatus) {
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
      var descMes = "";
      if (scMes.toString() in mapCustomServiceStatus) {
        descMes = mapCustomServiceStatus[scMes.toString()]
      } else {
        descMes = mapServiceStatus[scMes.toString()];
      }
      var objMes = [];
      objMes["statusCode"] = scMes;
      objMes["source"] = sourceMes;
      objMes["description"] = descMes;
      matrixMessages.push(objMes);
    }
  };
  var listErrorActions = getDefaultErrorStatusCodesActions(nameCurrentService, argsCurrentService, mapCustomServiceStatus);
  var listActions = $.extend({}, listOKActions, listErrorActions);
  return listActions;
}

// Function to get the list of actions to execute
// for all the possibles status codes of the Deal Hand service.
function getStatusCodesActionsForDealHandService(nameCurrentService, argsCurrentService, mapCustomServiceStatus) {
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
      var descMes = "";
      if (scMes.toString() in mapCustomServiceStatus) {
        descMes = mapCustomServiceStatus[scMes.toString()]
      } else {
        descMes = mapServiceStatus[scMes.toString()];
      }
      var objMes = [];
      objMes["statusCode"] = scMes;
      objMes["source"] = sourceMes;
      objMes["description"] = descMes;
      matrixMessages.push(objMes);
    }
  };
  var listErrorActions = getDefaultErrorStatusCodesActions(nameCurrentService, argsCurrentService, mapCustomServiceStatus);
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
    if (matrixMessages[i].statusCode != 200) {
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
    fullMessage += matrixMessages[i].source + " : " + matrixMessages[i].description + "<br>";
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

// Function to set the final status code service
// according to the calls made to it.
function setFinalStatusCodeService() {
  codeFinalCurrentService = "OK";
  for (var i = 0; i < matrixMessages.length; i++) {
    if (matrixMessages[i].statusCode != 200) {
      codeFinalCurrentService = "ERR";
    }
  }
}

// Funtion to paint the table cards of all players.
function paintAllTableCards() {
  for (var i = 0; i < listHands.length; i++) {
    paintTableCardsForPlayer(listHands[i].index, listHands[i].amountCards, listHands[i].cards);
  }
}

// Function to paint the table cards of a specific player.
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

function addMessage(statusCode, nameCurrentService, argsCurrentService, mapCustomServiceStatus) {
  var scMsj = statusCode;
  var sourceMsj = "";
  if (argsCurrentService == "") {
    sourceMsj = nameCurrentService;
  } else {
    sourceMsj = nameCurrentService + " / " + argsCurrentService;
  }
  var descMsj = "";
  if (scMsj.toString() in mapCustomServiceStatus) {
    descMsj = mapCustomServiceStatus[scMsj.toString()]
  } else {
    descMsj = mapServiceStatus[scMsj.toString()];
  }
  var objMsj = [];
  objMsj["statusCode"] = scMsj;
  objMsj["source"] = sourceMsj;
  objMsj["description"] = descMsj;
  matrixMessages.push(objMsj);
}

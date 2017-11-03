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

function convertSuiteFromJsToCss(suiteJs) {
  var suiteCss = "";
  switch (suiteJs) {
    case "diamonds":
      suiteCss = "diams";
      break;
    case "hearts":
      suiteCss = "hearts";
      break;
    case "clubs":
      suiteCss = "clubs";
      break;
    case "spades":
      suiteCss = "spades";
      break;
    default:
      suiteCss = "other";
      break;
  }
  return suiteCss;
}

function convertSuiteFromCssToJs(suiteCss) {
  var suiteJs = "";
  switch (suiteCss) {
    case "diams":
      suiteJs = "diamonds";
      break;
    case "hearts":
      suiteJs = "hearts";
      break;
    case "clubs":
      suiteJs = "clubs";
      break;
    case "spades":
      suiteJs = "spades";
      break;
    default:
      suiteJs = "other";
      break;
  }
  return suiteJs;
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
  if (codeFinalCurrentService == "OK") {
    codeMessage = "OK";
    typeMessage = "Success";
    classesMessage = "messageOK";
  } else {
    codeMessage = "ERR";
    typeMessage = "Error";
    classesMessage = "messageError";
  }
}

// Function to generate the full message to display in the view.
function generateFullMessage() {
  fullMessage = "<span class='headerMessage'>" + typeMessage + "</span><br><br>";
  for (var i = 0; i < matrixMessages.length; i++) {
    fullMessage += matrixMessages[i].source + " : " + matrixMessages[i].description + "<br><br>";
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

// Funtion to paint the table cards of all players
// according to the value of codeFinalCurrentService
function paintAllTableCards() {
  if (codeFinalCurrentService == "OK") {
    for (var i = 0; i < listHands.length; i++) {
      paintTableCardsForPlayer(listHands[i].index, listHands[i].amountCards, listHands[i].cards);
    }
  }
}

// Function to paint the table cards of a specific player.
function paintTableCardsForPlayer(idxPlayer, amountCards, dataCards) {
  var html = "";
  var suiteCss = "";
  var number = "";
  var suit = "";
  html += "<ul class='table'>";
  for (var i = 0; i < amountCards; i++) {
    number = dataCards[i].number;
    suit = dataCards[i].suit;
    suiteCss = convertSuiteFromJsToCss(suit);
    html += "<li>";
    html += "<span class='card rank-" + number.toLowerCase() + " " + suiteCss + "'>";
    html += "<span class='rank'>" + number + "</span>";
    html += "<span class='suit'>&" + suiteCss + ";</span>";
    html += "</span>";
    html += "</li>";
  }
  html += "</ul>";
  $("#blkTableCardsP" + idxPlayer).html(html);
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

function timingDeck() {
  var dateNow = new Date();
  var dateDurationDeck = new Date(dateNow.getTime());
  var distance = 0;
  dateDurationDeck.setMinutes(dateDurationDeck.getMinutes() + 5)
  var x = setInterval(function() {
    dateNow = new Date();
    distance = dateDurationDeck - dateNow;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    minutes = convertNumberToString(minutes);
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    seconds = convertNumberToString(seconds);
    document.getElementById("blkTiming").innerHTML = minutes + "m " + seconds + "s ";
    if (distance < 0) {
      clearInternval(x);
      document.getElementById("blkTiming").innerHTML = "Expired time for the current deck.";
    }
  }, 1000);
}

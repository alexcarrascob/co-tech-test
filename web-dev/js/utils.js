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

function getMinutesFromIntervalTime(i) {
  var min = Math.floor((i % (1000 * 60 * 60)) / (1000 * 60));
  return min;
}

function getSecondsFromIntervalTime(i) {
  var sec = Math.floor((i % (1000 * 60)) / 1000);
  return sec;
}

// Function to execute timer for current deck
function timingDeck(startDateTime, milliSecsDuration, milliSecInterval) {
  // Set local variables of the function
  var minutes = 0;
  var minutesString = "";
  var seconds = 0;
  var secondsString = "";
  var dateStart = null;
  var dateEnd = null;
  var distance = 0;
  // Get the current datetime as start datetime
  // dateStart = new Date(startDateTime.getTime());
  // Set final datetime to the duration time of the current deck
  // adding the number of milliseconds given in the input parameter milliSecsDuration
  dateEnd = new Date(startDateTime);
  dateEnd.setMilliseconds(dateEnd.getMilliseconds() + milliSecsDuration);
  // Calculate the time difference between start and end datetime
  // distance = dateEnd - dateStart;
  distance = milliSecsDuration;
  // Get the minutes of the calculated time distance
  minutes = getMinutesFromIntervalTime(distance);
  minutesString = convertNumberToString(minutes);
  // Get the seconds of the calculated time distance
  seconds = getSecondsFromIntervalTime(distance);
  secondsString = convertNumberToString(seconds);
  // Show the current time difference in the view
  $("#blkTiming").css("color", "#ffffff");
  $("#blkTiming").html("Deck duration: " + minutesString + " mins, " + secondsString + " secs");
  // Initiate the deck timer with given input parameters and calculated variables
  console.log("start deck timer");
  timerDeckID = setInterval(function() {
    // Set start datetime to now
    dateStart = new Date();
    // Calculate the time difference between start and end datetime
    distance = dateEnd - dateStart;
    // Get the minutes of the calculated time distance
    minutes = getMinutesFromIntervalTime(distance);
    minutesString = convertNumberToString(minutes);
    // Get the seconds of the calculated time distance
    seconds = getSecondsFromIntervalTime(distance);
    secondsString = convertNumberToString(seconds);
    // Show the current time difference in the view
    $("#blkTiming").css("color", "#ffffff");
    $("#blkTiming").html("Deck duration: " + minutesString + " mins, " + secondsString + " secs");
    // If it has reached the end of the duration time,
    // then stop the timer and show in the view that this time has expired.
    if (distance < 0) {
      clearInterval(timerDeckID);
      $("#blkTiming").css("color", "#ff0000");
      $("#blkTiming").html("Expired time for current deck.");
    }
  }, milliSecInterval);
}

function countDown(startDateTime, milliSecsDuration, milliSecInterval){
  var dias=0;
  var horas=0;
  var minutos=0;
  var segundos=0;

  var final=new Date(startDateTime);
  final.setMilliseconds(final.getMilliseconds() + milliSecsDuration);
  var inicio=new Date(startDateTime);

  if (final > inicio){
    var diferencia=(final.getTime()-inicio.getTime())/1000;
    dias=Math.floor(diferencia/86400);
    diferencia=diferencia-(86400*dias);
    horas=Math.floor(diferencia/3600);
    diferencia=diferencia-(3600*horas);
    minutos=Math.floor(diferencia/60);
    diferencia=diferencia-(60*minutos);
    segundos=Math.floor(diferencia);
    // Show the current time difference in the view
    minutesString = convertNumberToString(minutos);
    secondsString = convertNumberToString(segundos);
    $("#blkTiming").css("color", "#ffffff");
    $("#blkTiming").html("Deck duration: " + minutesString + " mins, " + secondsString + " secs");
    if (dias > 0 || horas > 0 || minutos > 0 || segundos > 0){
      timerDeckID = setTimeout("countDown('" + startDateTime + "'," + (milliSecsDuration - milliSecInterval) + "," + milliSecInterval + ")", milliSecInterval);
    }
  }
  else {
    stopTimer();
  }
}

function startTimer() {
  // Show the block for current deck timing
  $("#blkTiming").show();
  // Set datetime at which the current deck was generated to now
  var startDateTimeDeck = new Date();
  // Set duration of current deck in milliseconds: 5 minutes
  var milliSecsDurationDeck = 300000;
  // Set duration of interval timer in milliseconds: 1 minute
  var milliSecsIntervalTimer = 1000;
  // Start the current deck timer
  // timerDeckID = timingDeck(startDateTimeDeck, milliSecsDurationDeck, milliSecsIntervalTimer);
  countDown(startDateTimeDeck, milliSecsDurationDeck, milliSecsIntervalTimer);
}

function stopTimer() {
  // Hide the block for current deck timing
  $("#blkTiming").hide();
  // Stop the current deck timer
  console.log("stop deck timer");
  clearInterval(timerDeckID);
  // Set default style of timing block
  $("#blkTiming").css("color", "#ffffff");
  // Empty content of timing block
  $("#blkTiming").html("");
}

function startloading() {
  // Set HTML content for loading block
  var imgLoading = "<img id='imgLoading' alt='Loading...' src='img/loading.gif' width='50' height='50' />";
  var breakLine = "<br>";
  var spnTxtLoading = "<span style='font-weight: bold; color: #ffffff;' id='spnTxtLoading'>Loading...</span>";
  var htmlLoading = imgLoading + breakLine + spnTxtLoading;
  // Load this content in loading block
  $("#blkLoading").html(htmlLoading);
  // Show the loading block
  $("#blkLoading").show();
}

function stopLoading() {
  // Empty content of loading block
  $("#blkLoading").html("");
  // Hide the loading block
  $("#blkLoading").hide();
}

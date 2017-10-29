// Function to empty the message components in the view.
function emptyMessages() {
  codeMessage = "";
  typeMessage = "";
  classesMessage = "";
  descriptionMessage = "";
  fullMessage = "";

  respStatCode = 0;

  $("#secMessages").removeClass();
  $("#blkMessages").removeClass();

  $("#secMessages").addClass("messageNotVisible");
  $("#blkMessages").addClass("messageNotVisible");

  $("#blkMessages").html(fullMessage);
}

// Function to empty the table cards of all players.
function emptyAllTableCards() {
  $("#blkTableCardsP1").html("");
  $("#blkTableCardsP2").html("");
}

// Function to get the list of defaults actions
// for error status codes for any service.
function getDefaultErrorStatusCodesActions() {
  var listActions =
  {
    404: function() {
      descriptionMessage = "Deck isn't found. It doesn’t exist or has expired.";
    },
    405: function() {
      descriptionMessage = "There aren’t enough cards in the deck to deal the amount requested.";
    },
    500: function() {
      descriptionMessage = "An internal server error occurred.";
    },
    502: function() {
      descriptionMessage = "Bad Getaway.";
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
      descriptionMessage = "Deck shuffled successful.";
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
      descriptionMessage = "Hands dealt successful.";
    }
  };
  var listErrorActions = getDefaultErrorStatusCodesActions();
  var listActions = $.extend({}, listOKActions, listErrorActions);
  return listActions;
}

// Function to determine the type of message to display of a service
// based on a collection of status codes obtained
// from multiple calls to this service.
function generateTypeMessages(arrayStatusCodes) {
  codeMessage = "OK";
  typeMessage = "Success";
  classesMessage = "messageOK";
  console.log("Inside function generateTypeMessages(arrayStatusCodes)");
  for (var i = 0; i < arrayStatusCodes.length; i++) {
    console.log("-> arrayStatusCodes[" + i + "] = " + arrayStatusCodes[i]);
    if (arrayStatusCodes[i] != 200) {
      codeMessage = "ERR"
      typeMessage = "Error";
      classesMessage = "messageError";
    }
  }
}

// Function to generate the full message to display in the view.
function generateFullMessage() {
  fullMessage = typeMessage + ": " + descriptionMessage;
}

// Function to show the message in the view.
function showMessages() {
  $("#secMessages").removeClass();
  $("#blkMessages").removeClass();

  $("#secMessages").addClass("messageVisible");
  $("#blkMessages").addClass("messageVisible " + classesMessage);

  generateFullMessage();
  $("#blkMessages").html(fullMessage);
}

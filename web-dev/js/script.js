var idxPlayer01;
var idxPlayer02;

$(function () {
  idxPlayer01 = 1;
  idxPlayer02 = 2
  $("#btnDealCardsP01").prop("disabled", true);
  $("#btnDealCardsP02").prop("disabled", true);
});

function shuffleDeck() {
  // Set url for Dealer Service
  var url = "https://services.comparaonline.com/dealer/deck";
  var responseData;
  $.post(url, function (data) {
    responseData = data;
    $("#hidDeckId").val(responseData);
    $("#btnDealCardsP01").prop("disabled", false);
    $("#btnDealCardsP02").prop("disabled", false);
  })
  .fail(function() {
    $("#hidDeckId").val("");
    $("#btnDealCardsP01").prop("disabled", true);
    $("#btnDealCardsP02").prop("disabled", true);
  });
}

function dealAllCards() {
  dealCardsPlayer(idxPlayer01);
  dealCardsPlayer(idxPlayer02);
}

function dealCardsPlayer(idxPlayer) {
  var tokenDeck = $("#hidDeckId").val();
  var amountCardsByHand = 5;
  var url = "https://services.comparaonline.com/dealer/deck/" + tokenDeck + "/deal/" + amountCardsByHand;
  var response, htmlCards;
  $.getJSON(
    url,
    function (data) {
      response = data;
      htmlCards = "<div>";
      $.each(response, function (key, val) {
        $.each(val, function (key2, val2) {
          htmlCards += "{" + key2  + ":" + val2 + "}";
          htmlCards += "<br>";
        });
      });
      htmlCards += "</div>";
      switch (idxPlayer) {
        case idxPlayer01:
          $("#artHandP01").html("");
          $("#artHandP01").html(htmlCards);
          break;
        case idxPlayer02:
          $("#artHandP02").html("");
          $("#artHandP02").html(htmlCards);
          break;
        default:
          break;
      }
    }
  );
}

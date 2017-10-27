$(function () {
  $("#btnDealCardsP01").prop("disabled", true);
  $("#btnDealCardsP02").prop("disabled", true);
});

function shuffleDeck() {
  var url = "https://services.comparaonline.com/dealer/deck";
  var response;
  $.post(
    url,
    function (data) {
      response = data;
      $("#hidDeckId").val(response);
      $("#txtDeckId").val(response);
      $("#btnDealCardsP01").prop("disabled", false);
      $("#btnDealCardsP02").prop("disabled", false);
    }
  );
}

function dealCards(idxPlayer) {
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
        case 1:
          $("#artHandP01").html("");
          $("#artHandP01").html(htmlCards);
          break;
        case 2:
          $("#artHandP02").html("");
          $("#artHandP02").html(htmlCards);
          break;
        default:
          break;
      }
    }
  );
}

// ========================================================================
// SCRIPT WITH GLOBAL CONSTANTS USED IN THIS PROGRAM
// ========================================================================

// Constants relative to the Web view
// var imgLoading =
// "<img id='imgLoading' alt='Loading...' src='/img/loading.gif' width='100' height='100' align='center' />";
// var spnTxtLoading = "<span id='spnTxtLoading'>Loading...</span>";

// Constants relative to the services
var mapServiceStatus = {};
mapServiceStatus["200"] = "OK";
mapServiceStatus["405"] = "Method Not Allowed";
mapServiceStatus["500"] = "An internal server error occurred.";
mapServiceStatus["502"] = "Bad Getaway.";
mapServiceStatus["0"] = "Unknown Error.";

// Constants relatives to the game
var totalPlayers = 2;
var amountCardsByHand = 5;
var idxPlayer1 = 1;
var idxPlayer2 = 2;
var namePlayer1 = "Player #01";
var namePlayer2 = "Player #02";
var listCardNumbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var listCardSuits = ["diamonds", "hearts", "clubs", "spades"];
var mapNumberScore = [];
mapNumberScore["2"] = 1;
mapNumberScore["3"] = 2;
mapNumberScore["4"] = 3;
mapNumberScore["5"] = 4;
mapNumberScore["6"] = 5;
mapNumberScore["7"] = 6;
mapNumberScore["8"] = 7;
mapNumberScore["9"] = 8;
mapNumberScore["10"] = 9;
mapNumberScore["J"] = 11;
mapNumberScore["Q"] = 12;
mapNumberScore["K"] = 13;
mapNumberScore["A"] = 14;

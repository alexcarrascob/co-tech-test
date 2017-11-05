// ========================================================================
// SCRIPT WITH GLOBAL UTILITY FUNCTIONS USED IN THIS PROGRAM
// ========================================================================

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

function getMaxNumber(listNumbers) {
  var maxNumber = Number.MIN_SAFE_INTEGER;
  for (var i = 0; i < listNumbers.length; i++) {
    if (listNumbers[i] >= maxNumber) {
      maxNumber = listNumbers[i];
    }
  }
  return maxNumber;
}

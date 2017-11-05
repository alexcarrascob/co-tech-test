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

// Function to get the maximum value of a list of numbers
function getMaxNumber(listNumbers) {
  var maxNumber = Number.MIN_SAFE_INTEGER;
  for (var i = 0; i < listNumbers.length; i++) {
    if (listNumbers[i] >= maxNumber) {
      maxNumber = listNumbers[i];
    }
  }
  return maxNumber;
}

// Function to check if the input data is JSON type.
function isJSON(input) {
  try {
    JSON.parse(input);
    return true;
  } catch (e) {
    return false;
  }
}

// Function to convert any data type to its representation in String.
// It's useful for show log messages during debug phase.
function typeOf(data) {
  try {
    if (typeof data == "string") {
      return "STRING";
    }
    if (typeof data == "number") {
      return "NUMBER";
    }
    if (typeof data == "boolean") {
      return "BOOLEAN";
    }
    if (typeof data == "object") {
      if (Array.isArray(data)) {
        return "ARRAY";
      }
      if (isJSON(data)) {
        return "JSON";
      }
      return "OBJECT";
    }
    if (typeof data == "function") {
      return "FUNCTION";
    }
    if (typeof data == "symbol") {
      return "SYMBOL";
    }
    if (typeof data == "undefined") {
      return "UNDEFINED";
    }
  } catch (e) {
    return "<ERROR> : " + e.name + " - " + e.message;
  }
}

function convertToString(data) {
  try {
    var t = typeOf(data);
    switch (t) {
      case "STRING":
        return data;
        break;
      case "NUMBER":
        return data.toString();
        break;
      case "BOOLEAN":
        return data.toString();
        break;
      case "ARRAY": // TODO: call recursively to this same function for every component of the input array data
        // return data.toString();
        var elem = "";
        var output = "";
        output += "[";
        for (var i = 0; i < data.length; i++) {
          elem = convertToString(data[i]);
          output += elem;
          if(i < (data.length-1)) {
            output += ",";
          }
        }
        output += "]";
        break;
      case "JSON": // TODO: call recursively to this same function for every component of the input JSON data
        return JSON.stringify();
        break;
      case "SYMBOL":
        return data.toString();
        break;
      case "OBJECT":
        return "<OBJECT>";
        break;
      case "FUNCTION":
        return "<FUNCTION>";
        break;
      case "UNDEFINED":
        return "<UNDEFINED>";
        break;
      default:
        throw data;
    }
  } catch (e) {
    return e;
  }
}

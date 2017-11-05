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
  console.log("ini function typeOf");
  try {
    if (typeof data == "string") {
      console.log("-> string");
      console.log("end function typeOf");
      return "STRING";
    }
    if (typeof data == "number") {
      console.log("number");
      console.log("end function typeOf");
      return "NUMBER";
    }
    if (typeof data == "boolean") {
      console.log("-> boolean");
      console.log("end function typeOf");
      return "BOOLEAN";
    }
    if (typeof data == "object") {
      console.log("-> object:\n" + data);
      if (Array.isArray(data)) {
        console.log("-> array");
        console.log("end function typeOf");
        return "ARRAY";
      }
      if (isJSON(data)) {
        console.log("-> json");
        console.log("end function typeOf");
        return "JSON";
      }
      console.log("end function typeOf");
      return "OBJECT";
    }
    if (typeof data == "function") {
      console.log("-> function");
      console.log("end function typeOf");
      return "FUNCTION";
    }
    if (typeof data == "symbol") {
      console.log("-> symbol");
      console.log("end function typeOf");
      return "SYMBOL";
    }
    if (typeof data == "undefined") {
      console.log("-> undefined");
      console.log("end function typeOf");
      return "UNDEFINED";
    }
  } catch (e) {
    console.log("-> error");
    console.log("end function typeOf");
    return "ERROR : " + e.name + " - " + e.message;
  }
}

function convertToString(data) {
  console.log("ini function convertToString");
  try {
    var t = typeOf(data);
    switch (t) {
      case "STRING":
        console.log("-> STRING");
        console.log("end function convertToString");
        return data;
      case "NUMBER":
        console.log("-> NUMBER");
        console.log("end function convertToString");
        return data.toString();
      case "BOOLEAN":
        console.log("-> BOOLEAN");
        console.log("end function convertToString");
        return data.toString();
      case "ARRAY":
        console.log("-> ARRAY");
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
        console.log("end function convertToString");
        return output;
      case "JSON":
        console.log("JSON");
        var i = 0;
        var output = "{";
        for (var elem in data) {
          output += elem + ":" + data[elem];
          if (i < (data.length-1)) {
            output += ",";
          }
          i++;
        }
        output += "}";
        console.log("end function convertToString");
        return JSON.stringify();
      case "SYMBOL":
        console.log("-> SYMBOL");
        console.log("end function convertToString");
        return data.toString();
      case "OBJECT":
        console.log("-> OBJECT");
        console.log("end function convertToString");
        return "OBJECT";
      case "FUNCTION":
        console.log("-> FUNCTION");
        console.log("end function convertToString");
        return "FUNCTION";
      case "UNDEFINED":
        console.log("-> UNDEFINED");
        console.log("end function convertToString");
        return "UNDEFINED";
      default:
        console.log("-> default");
        throw data;
    }
  } catch (e) {
    console.log(e);
    console.log("end function convertToString");
    return e;
  }
}

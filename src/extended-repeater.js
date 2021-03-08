const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options) {
  if (!options || options.length == 0) {
    options = {};
  }
  if (!options.additionSeparator || options.additionSeparator.length == 0) {
    options.additionSeparator = "|";
  }
	String(str);
  String(options.separator);
  String(options.additionSeparator);

  const finalAddArray = [];
  const finalArray = [];

  function repeatStr(
    string = "",
    array,
    repeatTimes = 1,
    separator = "+",
    addition = ""
  ) {
    if (repeatTimes === 1) {
      const modString = `${string}${addition}`;
      array.push(modString);
    } else {
      for (let i = 0; i < repeatTimes; i++) {
        if (i == repeatTimes - 1) {
          const modString = `${string}${addition}`;
          array.push(modString);
        } else {
          const modString = `${string}${addition}${separator}`;
          array.push(modString);
        }
      }
    }
  }

  repeatStr(
    options.addition,
    finalAddArray,
    options.additionRepeatTimes,
    options.additionSeparator
  );

  repeatStr(
    str,
    finalArray,
    options.repeatTimes,
    options.separator,
    finalAddArray.join("")
  );

  return finalArray.join("");
};

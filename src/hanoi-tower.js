const CustomError = require("../extensions/custom-error");

module.exports = function calculateHanoi(disksNumber, turnsSpeed) {
  const turns = Math.pow(2, disksNumber) - 1,
    turnsPerSecond = turnsSpeed / 3600,
    seconds = Math.floor(turns / turnsPerSecond);

  return {
    turns,
    seconds,
  };
};

const CustomError = require("../extensions/custom-error");

module.exports = function getSeason(date) {
	if (!date) {
    return 'Unable to determine the time of year!';
  } else if (!(date instanceof Date)) {
    throw Error('Error');
  } else if (Object.prototype.toString.call(date) !== '[object Date]') { //if context isn't from new Date
    throw new Error('THROWN');
  }

	const month = (date.getMonth() + 1);
  if (month == 12 || month <= 2) {
    return 'winter';
  } else if (month > 2 && month <= 5) {
    return 'spring';
  } else if (month > 5 && month <= 8) {
    return 'summer';
  } else {
    return 'autumn';
  }
};

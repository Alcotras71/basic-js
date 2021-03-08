const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

module.exports = function dateSample(sampleActivity) {
  if (typeof sampleActivity !== 'string' || !sampleActivity || isNaN(sampleActivity)) {
    return false;
  } else {
    sampleActivity = +sampleActivity;
    if (sampleActivity == 0 || sampleActivity > 15 || sampleActivity < 0) {
      return false;
    }
    return Math.ceil((Math.log(MODERN_ACTIVITY / sampleActivity) * HALF_LIFE_PERIOD) / 0.693);
  }
};

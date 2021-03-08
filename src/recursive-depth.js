const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  calculateDepth(arr) {
    if (!Array.isArray(arr)) {
			return 0;
		} else {
			if (arr.length === 0) {
				return 1;
			} else {
				const depthArray = arr.map(elem => this.calculateDepth(elem));
				return Math.max(...depthArray) + 1
			}
		}
  }
};


// return Math.max(...arr.map(element => this.calculateDepth(element))) + 1
const CustomError = require("../extensions/custom-error");

module.exports = function countCats(matrix) {
	if (!matrix || matrix == undefined) {
    return 0;
  }
  const flatMatrix = matrix.flat();
  const newArr = [];
  for (let cat of flatMatrix) {
    if (cat == '^^') {
      newArr.push(cat)
    }
  }
  return newArr.length
};

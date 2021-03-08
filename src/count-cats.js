const CustomError = require("../extensions/custom-error");

module.exports = function countCats(matrix) {
  if (!matrix || matrix == undefined) {
    return 0;
  }
  const newArr = [];
  for (let mat of matrix) {
    for (let cat of mat) {
      if (cat == "^^") {
        newArr.push(cat);
      }
    }
  }
  return newArr.length;
};

const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr) {
  const conditions = [
    "--discard-next",
    "--discard-prev",
    "--double-next",
    "--double-prev",
  ];

  if (!Array.isArray(arr)) {
    throw new Error("THROWN");
  }
  let resultArray = [];
  let el;
  for (i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case conditions[0]:
        i++;
        break;

      case conditions[1]:
        if (arr[i - 2] != conditions[0]) {
          resultArray.pop();
        }
        break;

      case conditions[2]:
        if (i + 1 < arr.length) {
          resultArray.push(arr[i + 1]);
        }
        break;

      case conditions[3]:
        if (arr[i - 2] != conditions[0]) {
          el = resultArray[resultArray.length - 1];
          if (el != undefined) {
            resultArray.push(el);
          }
        }
        break;
      default:
        resultArray.push(arr[i]);
        break;
    }
  }
  return resultArray;
};

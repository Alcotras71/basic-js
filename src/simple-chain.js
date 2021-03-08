const CustomError = require("../extensions/custom-error");

const chainMaker = {
  _arr: [],
  getLength() {
    return this._arr.length;
  },
  addLink(value) {
    if (value !== undefined) {
      this._arr.push(String(value));
    } else {
      this._arr.push("");
    }
    return this;
  },
  removeLink(position) {
    if (position < 1 || typeof position !== "number" || position > this.getLength() ) {
      this._arr = [];
      throw new Error("THROWN");
    }
    this._arr.splice(position - 1, 1);
    return this;
  },
  reverseChain() {
    this._arr.reverse();
    return this;
  },
  finishChain() {
    let result = this._arr.map((e) => `( ${e} )`);
    this._arr = [];
    return result.join("~~");
  },
};

module.exports = chainMaker;

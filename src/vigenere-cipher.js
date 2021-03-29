const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = "";
  }
  createAlphabet() {
    for (let i = 65; i <= 90; i++) {
      this.alphabet += String.fromCharCode(i);
    }
  }

	encrypt(message, key) {
		this.createAlphabet();
    message = message.toUpperCase().split('');
    key = key.toUpperCase().split('');
    let position = 0;

    let result = message.map(item => {
      if (this.alphabet.includes(item)) {
        let index = (this.alphabet.indexOf(key[position]) + this.alphabet.indexOf(item)) % this.alphabet.length;
        position = (position + 1) % key.length;
        return this.alphabet[index];
      }
      return item;
    });
    return this.isDirect ? result.join('') : result.reverse().join('');
  }

  decrypt(message, key) {
		this.createAlphabet();
    message = message.toString().toUpperCase().split('');
    key = key.toString().toUpperCase().split('');
    let position = 0;

    let result = message.map(item => {
      if (this.alphabet.includes(item)) {
        let index = this.alphabet.indexOf(item) - this.alphabet.indexOf(key[position]);
        if (index < 0) index += this.alphabet.length;
        position = (position + 1) % key.length;
        return this.alphabet[index];
      }
      return item;
    });
    return this.isDirect ? result.join('') : result.reverse().join('');
  }
}

module.exports = VigenereCipheringMachine;

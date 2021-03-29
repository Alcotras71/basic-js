const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
	constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = "";
    this.tabulaRecta = [];
	}
  createAlphabet() {
    for (let i = 65; i <= 90; i++) {
      this.alphabet += String.fromCharCode(i);
    }
  }

  createTabulaRecta() {
    this.createAlphabet();
    for (let i = 0; i < this.alphabet.length; i++) {
      let row = this.alphabet.slice(i);
      row += this.alphabet.slice(0, i);
      this.tabulaRecta.push(row);
    }
  }

  equalizeLength(message, key) {
    message = String(message);
    key = String(key);
    let newKey = key;
    const messageArray = message.split("");
    let keyArray;
    let newMessage = messageArray.join("");
    if (message.length > key.length) {
      while (key.length < message.length) {
        key += key;
      }
      if (key.length > newMessage.length) {
        newKey = key.slice(0, newMessage.length);
      }
      keyArray = newKey.split("");
      for (let i = 0; i < messageArray.length; i++) {
        if (messageArray[i] == " ") {
          keyArray.splice(i, 0, " ");
        }
      }
      newKey = keyArray.join("");
    } else {
      newKey = key.slice(0, newMessage.length);
    }
    return {
      newKey: newKey,
      newMessage: newMessage,
    };
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error("Message or key is not passed");
    } else {
      this.createTabulaRecta();
      const result = this.equalizeLength(message, key),
        eqMessage = result.newMessage.toUpperCase(),
        eqKey = result.newKey.toUpperCase();
      let encryptSolution = "";

      for (let i = 0; i < eqMessage.length; i++) {
        if (this.alphabet.indexOf(eqMessage[i]) >= 0) {
          let m = this.alphabet.indexOf(eqMessage[i]);
          let k = this.alphabet.indexOf(eqKey[i]);

          encryptSolution += this.tabulaRecta[m][k];
        } else {
          encryptSolution += eqMessage[i];
        }
      }
      if (this.isDirect) {
        return encryptSolution;
      } else {
        const reverseEncryptSolution = encryptSolution
          .split("")
          .reverse()
          .join("");
        return reverseEncryptSolution;
      }
    }
  }

  decrypt(message, key) {
    if (!message || !key) {
      throw new Error("Message or key is not passed");
    } else {
      this.createTabulaRecta();
      const result = this.equalizeLength(message, key),
        eqMessage = result.newMessage.toUpperCase(),
        eqKey = result.newKey.toUpperCase();
      let decryptSolution = "";

      for (let i = 0; i < eqMessage.length; i++) {
        if (this.alphabet.indexOf(eqMessage[i]) >= 0) {
          let m = this.alphabet.indexOf(eqKey[i]);
          let k = this.tabulaRecta[m].indexOf(eqMessage[i]);

          decryptSolution += this.alphabet[k];
        } else {
          decryptSolution += eqMessage[i];
        }
      }
      if (this.isDirect) {
        return decryptSolution;
      } else {
        const reverseDecryptSolution = decryptSolution
          .split("")
          .reverse()
          .join("");
        return reverseDecryptSolution;
      }
    }
	}
}

module.exports = VigenereCipheringMachine;

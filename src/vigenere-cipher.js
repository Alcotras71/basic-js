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
    key = key.toUpperCase();
    message = message.toUpperCase();
    const messageArr = message.split("");
    let newKey = "";
    while (newKey.length < messageArr.length) {
      newKey += key;
    }
    return {
      newKey: newKey,
      newMessage: message,
    };
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error("Message or key is not passed");
    } else {
      this.createTabulaRecta();
      const result = this.equalizeLength(message, key);
      message = result.newMessage;
      key = result.newKey;
      let encryptSolution = [];

      for (let i = 0, j = 0; i < message.length; i++, j++) {
        let elM = message[i],
          elK = key[j];
        if (elM == " ") {
          encryptSolution.push(elM);
          j--;
        } else {
          if (this.alphabet.indexOf(elM) >= 0) {
            let m = this.alphabet.indexOf(elM);
            let k = this.alphabet.indexOf(elK);

            encryptSolution.push(this.tabulaRecta[m][k]);
          } else {
            encryptSolution.push(message[i]);
          }
        }
      }

      encryptSolution = encryptSolution.join("");
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
      const result = this.equalizeLength(message, key);
      message = result.newMessage;
      key = result.newKey;
      let decryptSolution = [];

      for (let i = 0, j = 0; i < message.length; i++, j++) {
        let elM = message[i],
          elK = key[j];
        if (elM == " ") {
          decryptSolution.push(elM);
          j--;
        } else {
          if (this.alphabet.indexOf(elM) >= 0) {
            let m = this.alphabet.indexOf(elK);
            let k = this.tabulaRecta[m].indexOf(elM);

            decryptSolution.push(this.alphabet[k]);
          } else {
            decryptSolution.push(elM);
          }
        }
      }
      decryptSolution = decryptSolution.join("");

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

import Utils from '../../../services/Utils';

class Game {
  constructor(words) {
    this.words = this.shuffle(words);
    this.index = 0;
  }

  shuffle = (array) => {
    const newArray = array;

    for (let n = array.length - 1; n > 0; n -= 1) {
      const t = Math.floor(Math.random() * (n + 1));

      const e = newArray[t];
      newArray[t] = newArray[n];
      newArray[n] = e;
    }

    return newArray;
  }

  getWord() {
    if (!this.words[this.index]) {
      return null;
    }

    const correct = Math.random() >= 0.5;

    let wordTranslate;
    if (correct) {
      wordTranslate = this.words[this.index].wordTranslate;
    } else {
      let r = Utils.random(0, 120);
      if (r === this.index) {
        r = (r + 1) % 120;
      }
      wordTranslate = this.words[r].wordTranslate;
    }

    const word = {
      word: this.words[this.index].word,
      wordTranslate,
      correct,
    };

    this.index += 1;

    return word;
  }
}

export default Game;

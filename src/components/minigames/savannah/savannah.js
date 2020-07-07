import './savanna.scss';

function keyDownHandler(event) {
  switch (event.key) {
    case '1':
      document.querySelector('.Content__wordParagraph.first').parentElement.classList.add('active');
      break;
    case '2':
      document.querySelector('.Content__wordParagraph.second').parentElement.classList.add('active');
      break;
    case '3':
      document.querySelector('.Content__wordParagraph.thirty').parentElement.classList.add('active');
      break;
    case '4':
      document.querySelector('.Content__wordParagraph.fourth').parentElement.classList.add('active');
      break;
    default:
      break;
  }
}

class SavannahMiniGame {
  constructor() {
    this.currentWord = {};
    this.fallTime = 500;
    this.loadTime = 2000;
    this.words = [];
    this.answerNum = null;
    this.answers = [];
    this.choosenAnswerId = null;
    this.onMouseListener = null;
    this.gameLoad = this.gameLoad.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.fetchWords = this.fetchWords.bind(this);
    this.chooseWord = this.chooseWord.bind(this);
  }

  view = `
        <main>
          <div class="Index__wrapper">
            <button class="Content__backBtn" type="submit" onClick="location.href='/#/'">&lt;</button>
            <p class="Index__titleText">Savanna</p>
            <button class="Index__startBtn">Начать игру</button>
          </div>
          <div class="Content__wrapper">
            <button class="Content__backBtn">&lt;</button>
            <div class="Content__wordContentWrapper">
              <div id ='1' class="Content__wordContent">
                <div class="Content__wordNum">1</div>
                <p class="Content__wordParagraph first">BirdIsTheWord</p>
              </div>
              <div id ='2' class="Content__wordContent">
                <div class="Content__wordNum">2</div>
                <p class="Content__wordParagraph second">BirdIsTheWord</p>
              </div>
              <div id ='3' class="Content__wordContent">
                <div class="Content__wordNum">3</div>
                <p class="Content__wordParagraph thirty">BirdIsTheWord</p>
              </div>
              <div id ='4' class="Content__wordContent">
                <div class="Content__wordNum">4</div>
                <p class="Content__wordParagraph fourth">BirdIsTheWord</p>
              </div>
            </div>
            <div class="Content__lifesContainer">
              <p id="1">♥</p>
              <p id="2">♥</p>
              <p id="3">♥</p>
              <p id="4">♥</p>
              <p id="5">♥</p>
            </div>
<!--            <div class="Content__fallingWord">Падающее слово</div>-->
          </div>
          <div class="start-game__overlay">
            <div class="overlay">
              <div class="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              <p class="game-hint">Используй клавиши 1, 2, 3 и 4, или кликнув по кнопке со словом чтобы дать ответ</p>
            </div>
          </div>
          <div class="savannah-popup__container">
            <div class="savannah-popup">
              <div class="popup-header">
                <p class="popup-header-title">Неплохо, но есть над чем поработать</p>
                <p class="popup-header-stats"><span class="word--green">12</span> слов изучено, <span class="word--red">5</span> на изучении</p>
              </div>
              <div class="popup-body">
                <div class="learning-words unknown-words">
                  <p class="title word--red">Ошибок: 5</p>
                  <div class="words-list"></div>
                </div>
                <hr>
                <div class="learning-words known-words">
                  <p class="title word--green">Знаю: 12</p>
                  <div class="words-list"></div>
                </div>
              <div class="popup-footer">
                <a href="#" class="resume">Продолжить тренировку</a>
                <a href="/#/" class="games">В главное меню</a>
              </div>
            </div>
          </div>
        </main>
        `;

  startGame() {
    this.chooseWord()
      .then((res) => this.setAnswers(res))
      .then(() => this.createAnswerBtns())
      .then(() => this.mouseDown())
      .then(() => this.createFallWord());
    // console.log(this.word);
    // console.log(this.words);
    // console.log(this.answers);
    window.addEventListener('keyup', this.keyUpHandler);
    window.addEventListener('keydown', keyDownHandler);
  }

  createFallWord() {
    if (this.words.length > 3) {
      const fallWord = document.createElement('div');
      fallWord.classList.add('Content__fallingWord');
      fallWord.innerHTML = this.currentWord.word;
      document.querySelector('.Content__wrapper').append(fallWord);
      fallWord.classList.add('animate');
    }
  }

  async gameOverlay() {
    return new Promise((resolve) => {
      this.fetchWords();
      setTimeout(() => {
        document.querySelector('.start-game__overlay').style.zIndex = '0';
        document.querySelector('.start-game__overlay').classList.add('disabled');
        document.querySelector('.Content__wrapper').style.zIndex = '2';
        resolve();
      }, this.loadTime);
    });
  }

  async gameLoad() {
    document.querySelector('.Index__wrapper').classList.add('disabled');
    document.querySelector('.Content__wrapper').classList.add('enabled');
    await this.gameOverlay().then(() => {
      this.startGame();
    });
  }

  fetchWords() {
    return new Promise((resolve) => {
      const MIN_PAGE = 0;
      const MAX_PAGE = 29;
      const MIN_GROUP = 0;
      const MAX_GROUP = 5;
      const groupNum = Math.floor(Math.random() * (MAX_GROUP - MIN_GROUP + 1)) + MIN_GROUP;
      const pageNum = Math.floor(Math.random() * (MAX_PAGE - MIN_PAGE + 1)) + MIN_PAGE;
      resolve(fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${pageNum}&group=${groupNum}`)
        .then((res) => res.json().then((data) => data.forEach((el, index) => {
          const updWord = { id: index, word: el.word, translate: el.wordTranslate };
          return this.words.push(updWord);
        }))));
    });
  }

  getRandomNum(min, max) {
    this.answerNum = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async chooseWord() {
    return new Promise((resolve) => {
      resolve(this.currentWord = {
        word: this.words[this.words.length - 1].word,
        translate: this.words[this.words.length - 1].translate,
      });
    });
  }

  setAnswers(wordTranslate) {
    if (this.words.length > 3) {
      this.answers = [];
      this.answers.push(wordTranslate.translate);
      for (let i = 0; i < 3; i += 1) {
        this.getRandomNum(0, this.words.length - 1);
        if (!this.answers.includes(this.words[this.answerNum].translate)) {
          this.answers.push(this.words[this.answerNum].translate);
        } else {
          i -= 1;
        }
      }
    } else {
      alert('Pop up с результатами');
    }
  }

  async createAnswerBtns() {
    document.querySelector('.Content__wordContentWrapper')
      .removeEventListener('click', this.onMouseListener);
    return new Promise((resolve) => {
      this.answers.sort(() => Math.random() - 0.5);
      // eslint-disable-next-line prefer-destructuring
      resolve(document.querySelector('.Content__wordParagraph.first').innerText = this.answers[0],
        // eslint-disable-next-line prefer-destructuring
        document.querySelector('.Content__wordParagraph.second').innerText = this.answers[1],
        // eslint-disable-next-line prefer-destructuring
        document.querySelector('.Content__wordParagraph.thirty').innerText = this.answers[2],
        // eslint-disable-next-line prefer-destructuring
        document.querySelector('.Content__wordParagraph.fourth').innerText = this.answers[3]);
    });
  }

  keyUpHandler(event) {
    const fallWordTranslate = this.currentWord.translate;
    document.querySelectorAll('.Content__wordParagraph').forEach((elem) => {
      elem.parentElement.classList.remove('active');
    });
    switch (event.key) {
      case '1':
        if (document.querySelector('.Content__wordParagraph.first').innerText === fallWordTranslate) {
          document.querySelector('.Content__fallingWord').remove();
          this.words.pop();
          this.startGame();
        } else {
          console.log('Минус жизнь');
        }
        break;
      case '2':
        if (document.querySelector('.Content__wordParagraph.second').innerText === fallWordTranslate) {
          document.querySelector('.Content__fallingWord').remove();
          this.words.pop();
          this.startGame();
        } else {
          console.log('Минус жизнь');
        }
        break;
      case '3':
        if (document.querySelector('.Content__wordParagraph.thirty').innerHTML === fallWordTranslate) {
          document.querySelector('.Content__fallingWord').remove();
          this.words.pop();
          this.startGame();
        } else {
          console.log('Минус жизнь');
        }
        break;
      case '4':
        if (document.querySelector('.Content__wordParagraph.fourth').innerHTML === fallWordTranslate) {
          document.querySelector('.Content__fallingWord').remove();
          this.words.pop();
          this.startGame();
        } else {
          console.log('Минус жизнь');
        }
        break;
      default:
        break;
    }
  }

  mouseDown() {
    return new Promise((resolve) => {
      this.onMouseListener = (event) => {
        let parentElement = event.target;
        if (parentElement.id !== '') {
          this.choosenAnswerId = parentElement.id;
        } else if (!event.target.classList.contains('Content__wordContentWrapper')) {
          parentElement = event.target.parentElement;
          this.choosenAnswerId = parentElement.id;
        }
        this.checkMouseAnswer();
      };

      resolve(document.querySelector('.Content__wordContentWrapper')
        .addEventListener('click', this.onMouseListener));
    });
  }

  checkMouseAnswer() {
    const fallWordTranslate = this.currentWord.translate;
    const allAnswers = Array.from(document.querySelectorAll('.Content__wordContent'));
    const choosen = allAnswers.filter((el) => el.id === this.choosenAnswerId);
    if (choosen[0].querySelector('.Content__wordParagraph').innerText === fallWordTranslate) {
      document.querySelector('.Content__fallingWord').remove();
      this.words.pop();
      this.startGame();
    } else {
      console.log('Минус жизнь');
    }
  }

  async render() {
    return this.view;
  }

  afterRender() {
    document.querySelector('.Index__startBtn').addEventListener('click', this.gameLoad);
  }
}

export default new SavannahMiniGame();

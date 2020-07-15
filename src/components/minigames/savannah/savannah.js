import './savannah.scss';

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

function statisticsWordInner(word, translate, audio) {
  return `
        <div class="word-audio" id="${audio}"></div>
        <p class="word-name"><span class="word--blue">${word}</span> - <span>${translate}</span></p>
      `;
}

function playGameAudio(sound) {
  if (document.querySelector('audio')) {
    document.querySelector('audio').remove();
  }

  const audio = document.createElement('audio');
  document.body.append(audio);
  audio.src = sound;
  audio.play();
}

const finalTitles = {
  bad: 'В этот раз не получилось, но продолжай тренироваться!',
  good: 'Неплохо, но есть над чем поработать',
  nice: 'Отлично, молодец',
};
class SavannahMiniGame {
  constructor() {
    this.resourcesURL = 'https://raw.githubusercontent.com/tsyman/rslang-data/master/';
    this.currentWord = {};
    this.correctWords = [];
    this.unCorrectWords = [];
    this.loadTime = 4000;
    this.words = [];
    this.answerNum = null;
    this.answers = [];
    this.chosenAnswerId = null;
    this.onMouseListener = null;
    this.remainingLifes = 5;
    this.correctAnswerAudio = '../../../assets/audio/savannah/correct.mp3';
    this.unCorrectAnswerAudio = '../../../assets/audio/savannah/incorrect.mp3';
    this.endGameAudio = '../../../assets/audio/savannah/endgame.mp3';
    this.startGameAudio = '../../../assets/audio/savannah/startgame.mp3';
    this.gameLoad = this.gameLoad.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.fetchWords = this.fetchWords.bind(this);
    this.chooseWord = this.chooseWord.bind(this);
    this.playWordAudio = this.playWordAudio.bind(this);
    this.checkWordPosition = this.checkWordPosition.bind(this);
  }

  view = `
        <main>
          <div class="Index__wrapper">
            <button class="Content__backBtn" type="submit" onClick="location.href='/#main'">&lt;</button>
            <p class="Index__titleText">Savannah</p>
            <button class="Index__startBtn">Начать игру</button>
          </div>
          <div class="Content__wrapper">
            <button class="Content__backBtn">&lt;</button>
            <div class="Content__wordContentWrapper">
              <button type"button" id ='1' class="Content__wordContent">
                <div class="Content__wordNum">1</div>
                <p class="Content__wordParagraph first">BirdIsTheWord</p>
              </button>
              <button type"button" id ='2' class="Content__wordContent">
                <div class="Content__wordNum">2</div>
                <p class="Content__wordParagraph second">BirdIsTheWord</p>
              </button>
              <button type"button" id ='3' class="Content__wordContent">
                <div class="Content__wordNum">3</div>
                <p class="Content__wordParagraph thirty">BirdIsTheWord</p>
              </button>
              <button type"button" id ='4' class="Content__wordContent">
                <div class="Content__wordNum">4</div>
                <p class="Content__wordParagraph fourth">BirdIsTheWord</p>
              </button>
            </div>
            <div class="Content__lifesContainer">
              <p id="0">♥</p>
              <p id="1">♥</p>
              <p id="2">♥</p>
              <p id="3">♥</p>
              <p id="4">♥</p>
            </div>
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
                <p class="popup-header-title"></p>
                <p class="popup-header-stats"><span class="word--green"></span> слов изучено, <span class="word--red"></span> на изучении</p>
              </div>
              <div class="popup-body">
                <div class="learning-words unknown-words">
                  <p class="title word--red"></p>
                  <div class="words-list"></div>
                </div>
                <hr>
                <div class="learning-words known-words">
                  <p class="title word--green"></p>
                  <div class="words-list"></div>
                </div>
              </div>
              <div class="popup-footer">
                <a href="/#savannah" class="resume">Продолжить тренировку</a>
                <a href="/#main" class="menu">В главное меню</a>
              </div>
            </div>
          </div>
        </main>
        `;

  async startGame() {
    this.chooseWord()
      .then((res) => this.setAnswers(res))
      .then(() => this.createAnswerBtns())
      .then(() => this.mouseDown())
      .then(() => this.createFallWord());
  }

  createFallWord() {
    if (this.words.length > 3) {
      const fallWord = document.createElement('div');
      fallWord.classList.add('Content__fallingWord');
      fallWord.innerHTML = this.currentWord.word;
      fallWord.addEventListener('animationend', this.checkWordPosition);
      document.querySelector('.Content__wrapper').append(fallWord);
      fallWord.classList.add('animate');
    }
  }

  async gameOverlay() {
    return new Promise((resolve) => {
      this.fetchWords().then(() => {
        setTimeout(() => {
          document.querySelector('.start-game__overlay').style.zIndex = '0';
          document.querySelector('.start-game__overlay').classList.add('disabled');
          document.querySelector('.Content__wrapper').style.zIndex = '2';
          window.addEventListener('keyup', this.keyUpHandler);
          window.addEventListener('keydown', keyDownHandler);
          resolve();
        }, this.loadTime);
      });
    });
  }

  async gameLoad() {
    document.querySelector('.Index__wrapper').classList.add('disabled');
    document.querySelector('.Content__wrapper').classList.add('enabled');
    playGameAudio(this.startGameAudio);
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
        .then((res) => res.json()
          .then((data) => data.forEach((el, index) => {
            const updWord = {
              id: index,
              word: el.word,
              translate: el.wordTranslate,
              image: el.image,
              audio: el.audio,
            };
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
        audio: this.words[this.words.length - 1].audio,
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
      this.removeKeyHandler();
      setTimeout(() => {
        playGameAudio(this.endGameAudio);
        this.setStatistics();
      }, 500);
    }
  }

  async createAnswerBtns() {
    document.querySelector('.Content__wordContentWrapper')
      .removeEventListener('click', this.onMouseListener);
    return new Promise((resolve) => {
      this.answers.sort(() => Math.random() - 0.5);
      resolve(document.querySelectorAll('.Content__wordParagraph').forEach((elem, index) => {
        const element = elem;
        element.innerText = this.answers[index];
      }));
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
          playGameAudio(this.correctAnswerAudio);
          document.querySelector('.Content__fallingWord').remove();
          this.correctWords.push(this.currentWord);
          this.words.pop();
          this.startGame();
        } else {
          playGameAudio(this.unCorrectAnswerAudio);
          this.unCorrectWords.push(this.currentWord);
          document.querySelector('.Content__fallingWord').remove();
          this.words.pop();
          this.checkRemainingLifes();
        }
        break;
      case '2':
        if (document.querySelector('.Content__wordParagraph.second').innerText === fallWordTranslate) {
          playGameAudio(this.correctAnswerAudio);
          document.querySelector('.Content__fallingWord').remove();
          this.correctWords.push(this.currentWord);
          this.words.pop();
          this.startGame();
        } else {
          playGameAudio(this.unCorrectAnswerAudio);
          this.unCorrectWords.push(this.currentWord);
          document.querySelector('.Content__fallingWord').remove();
          this.words.pop();
          this.checkRemainingLifes();
        }
        break;
      case '3':
        if (document.querySelector('.Content__wordParagraph.thirty').innerHTML === fallWordTranslate) {
          playGameAudio(this.correctAnswerAudio);
          document.querySelector('.Content__fallingWord').remove();
          this.correctWords.push(this.currentWord);
          this.words.pop();
          this.startGame();
        } else {
          playGameAudio(this.unCorrectAnswerAudio);
          this.unCorrectWords.push(this.currentWord);
          document.querySelector('.Content__fallingWord').remove();
          this.words.pop();
          this.checkRemainingLifes();
        }
        break;
      case '4':
        if (document.querySelector('.Content__wordParagraph.fourth').innerHTML === fallWordTranslate) {
          playGameAudio(this.correctAnswerAudio);
          document.querySelector('.Content__fallingWord').remove();
          this.correctWords.push(this.currentWord);
          this.words.pop();
          this.startGame();
        } else {
          playGameAudio(this.unCorrectAnswerAudio);
          this.unCorrectWords.push(this.currentWord);
          document.querySelector('.Content__fallingWord').remove();
          this.words.pop();
          this.checkRemainingLifes();
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
          this.chosenAnswerId = parentElement.id;
        } else if (!event.target.classList.contains('Content__wordContentWrapper')) {
          parentElement = event.target.parentElement;
          this.chosenAnswerId = parentElement.id;
        } else if (event.target.classList.contains('Content__wordContentWrapper')) {
          return;
        }
        this.checkMouseAnswer();
      };

      resolve(document.querySelector('.Content__wordContentWrapper')
        .addEventListener('click', this.onMouseListener));
    });
  }

  checkMouseAnswer() {
    const fallWordTranslate = this.currentWord.translate;
    const allAnswers = [...document.querySelectorAll('.Content__wordContent')];
    const chosen = allAnswers.filter((el) => el.id === this.chosenAnswerId);
    if (chosen[0].querySelector('.Content__wordParagraph').innerText === fallWordTranslate) {
      playGameAudio(this.correctAnswerAudio);
      document.querySelector('.Content__fallingWord').remove();
      this.correctWords.push(this.currentWord);
      this.words.pop();
      this.startGame();
    } else {
      playGameAudio(this.unCorrectAnswerAudio);
      this.unCorrectWords.push(this.currentWord);
      document.querySelector('.Content__fallingWord').remove();
      this.words.pop();
      this.checkRemainingLifes();
    }
  }

  checkRemainingLifes() {
    this.remainingLifes -= 1;
    const lifesContainer = [...document.querySelector('.Content__lifesContainer').children];
    lifesContainer[this.remainingLifes].style.opacity = '0.25';

    if (this.remainingLifes === 0) {
      this.removeKeyHandler();
      setTimeout(() => {
        playGameAudio(this.endGameAudio);
        this.setStatistics();
      }, 500);
    } else {
      this.startGame();
    }
  }

  checkWordPosition() {
    playGameAudio(this.unCorrectAnswerAudio);
    document.querySelector('.Content__fallingWord').remove();
    this.unCorrectWords.push(this.currentWord);
    this.words.pop();
    this.checkRemainingLifes();
  }

  setStatistics() {
    this.unCorrectWords
      .forEach((elem) => {
        const wordInner = document.createElement('div');
        wordInner.classList.add('word');
        wordInner.innerHTML = statisticsWordInner(elem.word, elem.translate, elem.audio);
        document.querySelector('.unknown-words .words-list').append(wordInner);
      });

    this.correctWords.forEach((elem) => {
      const wordInner = document.createElement('div');
      wordInner.classList.add('word');
      wordInner.innerHTML = statisticsWordInner(elem.word, elem.translate, elem.audio);
      document.querySelector('.known-words .words-list').append(wordInner);
    });

    document.querySelector('.unknown-words .title').textContent = `Ошибок: ${this.unCorrectWords.length}`;
    document.querySelector('.known-words .title').textContent = `Знаю: ${this.correctWords.length}`;
    document.querySelector('.popup-header-stats .word--green').textContent = this.correctWords.length;
    document.querySelector('.popup-header-stats .word--red').textContent = this.unCorrectWords.length;
    document.querySelector('.savannah-popup__container').style.display = 'block';
    document.querySelectorAll('.word-audio').forEach((elem) => {
      elem.addEventListener('click', this.playWordAudio);
    });

    if (this.correctWords.length <= 5) {
      document.querySelector('.popup-header-title').textContent = finalTitles.bad;
    } else if (this.correctWords.length > 5 && this.correctWords.length <= 14) {
      document.querySelector('.popup-header-title').textContent = finalTitles.good;
    } else {
      document.querySelector('.popup-header-title').textContent = finalTitles.nice;
    }
  }

  playWordAudio(event) {
    const audio = document.createElement('audio');
    document.body.append(audio);
    audio.src = `${this.resourcesURL}${event.target.id}`;
    audio.play();
    document.querySelectorAll('.word-audio').forEach((elem) => {
      const element = elem;
      element.style.pointerEvents = 'none';
    });
    audio.onended = () => {
      document.querySelectorAll('audio').forEach((elem) => {
        elem.remove();
        document.querySelectorAll('.word-audio').forEach((e) => {
          e.style.pointerEvents = 'auto';
        });
      });
    };
  }

  removeKeyHandler() {
    window.removeEventListener('keyup', this.keyUpHandler);
    window.removeEventListener('keydown', keyDownHandler);
  }

  resetGame() {
    this.remainingLifes = 5;
    this.currentWord = {};
    this.correctWords = [];
    this.unCorrectWords = [];
    this.words = [];
    this.answerNum = null;
    this.answers = [];
    this.chosenAnswerId = null;
    this.onMouseListener = null;
  }

  async render() {
    return this.view;
  }

  afterRender() {
    document.getElementById('header_container').style.display = 'none';
    document.querySelector('.Index__startBtn').addEventListener('click', this.gameLoad);
    document.querySelector('.Content__backBtn').addEventListener('click', () => {
      document.getElementById('header_container').style.display = 'block';
      document.getElementById('footer_container').style.display = 'block';
      this.resetGame();
    });
    document.querySelector('.popup-footer .resume').addEventListener('click', () => {
      document.getElementById('page_container').innerHTML = this.view;
      this.afterRender();
      this.resetGame();
    });

    document.querySelector('.popup-footer .menu').addEventListener('click', () => {
      this.afterRender();
      document.getElementById('header_container').style.display = 'block';
      document.getElementById('footer_container').style.display = 'block';

      this.resetGame();
    });
  }
}

export default new SavannahMiniGame();

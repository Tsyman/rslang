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
    this.word = 'Savannah';
    this.fallTime = 500;
    this.loadTime = 3000;
    this.gameLoad = this.gameLoad.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
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
              <div class="Content__wordContent">
                <div class="Content__wordNum">1</div>
                <p class="Content__wordParagraph first">BirdIsTheWord</p>
              </div>
              <div class="Content__wordContent">
                <div class="Content__wordNum">2</div>
                <p class="Content__wordParagraph second">BirdIsTheWord</p>
              </div>
              <div class="Content__wordContent">
                <div class="Content__wordNum">3</div>
                <p class="Content__wordParagraph thirty">Savannah</p>
              </div>
              <div class="Content__wordContent">
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
            <div class="Content__fallingWord">Savannah</div>
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
    window.addEventListener('keyup', this.keyUpHandler);
    window.addEventListener('keydown', keyDownHandler);
    document.querySelector('.Content__fallingWord').classList.add('animate');
  }

  createFallWord() {
    const fallWord = document.createElement('div');
    fallWord.classList.add('Content__fallingWord');
    fallWord.innerHTML = this.word;
    document.querySelector('.Content__wrapper').append(fallWord);
    fallWord.classList.add('animate');
  }

  async gameOverlay() {
    return new Promise((resolve) => {
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
    this.gameOverlay().then(() => {
      this.startGame();
    });
  }

  keyUpHandler(event) {
    const fallWord = document.querySelector('.Content__fallingWord').innerHTML;
    document.querySelectorAll('.Content__wordParagraph').forEach((elem) => {
      elem.parentElement.classList.remove('active');
    });
    switch (event.key) {
      case '1':
        if (document.querySelector('.Content__wordParagraph.first').innerHTML === fallWord) {
          document.querySelector('.Content__fallingWord').remove();
          this.createFallWord();
        }
        break;
      case '2':
        if (document.querySelector('.Content__wordParagraph.second').innerHTML === fallWord) {
          document.querySelector('.Content__fallingWord').remove();
          this.createFallWord();
        }
        break;
      case '3':
        if (document.querySelector('.Content__wordParagraph.thirty').innerHTML === fallWord) {
          document.querySelector('.Content__fallingWord').remove();
          this.createFallWord();
        }
        break;
      case '4':
        if (document.querySelector('.Content__wordParagraph.fourth').innerHTML === fallWord) {
          document.querySelector('.Content__fallingWord').remove();
          this.createFallWord();
        }
        break;
      default:
        break;
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

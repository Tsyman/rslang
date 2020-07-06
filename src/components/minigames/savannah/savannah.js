import './savanna.scss';

class SavannahMiniGame {
  constructor() {
    this.fallTime = 500;
  }

  view = `
        <main>
          <div class="Index__wrapper">
            <p class="Index__titleText">Savanna</p>
            <button class="Index__startBtn">Начать игру</button>
          </div>
          <div class="Content__wrapper">
            <button class="Content__backBtn">&lt;</button>
            <div class="Content__wordContentWrapper">
              <div class="Content__wordContent">
                <div class="Content__wordNum">1</div>
                <p class="Content__wordParagraph">BirdIsTheWord</p>
              </div>
              <div class="Content__wordContent">
                <div class="Content__wordNum">1</div>
                <p class="Content__wordParagraph">BirdIsTheWord</p>
              </div>
              <div class="Content__wordContent">
                <div class="Content__wordNum">1</div>
                <p class="Content__wordParagraph">BirdIsTheWord</p>
              </div>
              <div class="Content__wordContent">
                <div class="Content__wordNum">1</div>
                <p class="Content__wordParagraph">BirdIsTheWord</p>
              </div>
            </div>
            <div class="Content__lifesContainer">
              <p id="1">♥</p>
              <p id="2">♥</p>
              <p id="3">♥</p>
              <p id="4">♥</p>
              <p id="5">♥</p>
            </div>
            <div class="Content__fallingWord">ENGLISHWORD</div>
          </div>
        </main>
        `;

  async render() {
    return this.view;
  }

  afterRender() {
    document.querySelector('.Index__startBtn').addEventListener('click', () => {
      document.querySelector('.Index__wrapper').classList.add('disabled');
      document.querySelector('.Content__wrapper').classList.add('enabled');
      setTimeout(() => {
        document.querySelector('.Index__wrapper').remove();
        document.querySelector('.Content__fallingWord').classList.add('animate');
      }, this.fallTime);
    });
    const int = setInterval(() => {
      const coordY = document.querySelector('.Content__fallingWord').getBoundingClientRect().y + 35;
      const wordContentY = document.querySelector('.Content__wordContent').getBoundingClientRect().y;
      if (coordY > wordContentY) {
        document.querySelector('.Content__fallingWord').remove();
        clearInterval(int);
      }
    }, 50);
  }
}

export default new SavannahMiniGame();

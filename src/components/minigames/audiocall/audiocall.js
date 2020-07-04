import './audiocall.scss';

class Audiocall {
  audioCallContainer = null;

  startGameButton = null;

  mainGamePage = `
    <div class="audiocall-start__container">
      <div class="audiocall-game__wrapper">
        <div class="audiocall-game__inner">
          <div class="audiocall-game__sound audiocall-game__sound-bg">
            <img class="audiocall-game__img" src="../../../assets/images/audio-call-game-icon.svg">
          </div>
          <div class="audiocall-game__english-word visually-hidden">lorem ipsum</div>
        </div>
        <ul class="audiocall-game__list">
          <li class="audiocall-game__item">
            <p class="audiocall-game__number">1</p>
            <p class="audiocall-game__word">Lorem</p>
          </li>
          <li class="audiocall-game__item audiocall-game__item-incorrect">
            <p class="audiocall-game__number">2</p>
            <p class="audiocall-game__word">Lorem</p>
          </li>
          <li class="audiocall-game__item">
            <p class="audiocall-game__number">3</p>
            <p class="audiocall-game__word">Lorem</p>
          </li>
          <li class="audiocall-game__item">
            <p class="audiocall-game__number">4</p>
            <p class="audiocall-game__word">Lorem</p>
          </li>
          <li class="audiocall-game__item">
            <p class="audiocall-game__number">5</p>
            <p class="audiocall-game__word">Lorem</p>
          </li>
        </ul>
        <button class="audiocall-game__btn audiocall-game__btn-next">Не знаю</button>
      </div>
      </div>
    </div>
  `

  constructor() {
    this.goToMainGamePage = this.goToMainGamePage.bind(this);
  }

  view = `
        <section class="audiocall-start" id="audio-call-container">
          <div class="audiocall-start__container">
            <div class="audiocall-start__wrapper">
              <p class="audiocall-start__title">Аудиовызов</p>
              <div class="audiocall-start__button" id="start-game-button">Начать игру</div>
            </div>
          </div>
        </section>
        `;

  async render() {
    return this.view;
  }

  async afterRender() {
    this.audioCallContainer = document.getElementById('audio-call-container');
    this.startGameButton = document.getElementById('start-game-button');
    this.startGameButton.addEventListener('click', this.goToMainGamePage);
  }

  goToMainGamePage() {
    this.audioCallContainer.innerHTML = this.mainGamePage;
  }
}

export default new Audiocall();

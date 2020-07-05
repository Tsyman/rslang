import './audiocall.scss';
import Swiper from './swiper';

class Audiocall {
  audioCallContainer = null;

  startGameButton = null;

  closeGameButton = null;

  closeConfirmExitPopupButton = null;

  confirmExitFromGameButton = null;

  confirmExitPopup = null;

  confirmExitPopupContent = null;

  urlForHomePage = '/';

  whereToAppendSwiper = null;

  arrayOfWordsData = 'Element';

  constructor() {
    this.goToMainGamePage = this.goToMainGamePage.bind(this);
    this.openConfirmExitPopup = this.openConfirmExitPopup.bind(this);
    this.closeConfirmExitPopup = this.closeConfirmExitPopup.bind(this);
    this.goToMainWebsitePage = this.goToMainWebsitePage.bind(this);
    this.renderGameSlides = this.renderGameSlides.bind(this);
  }

  popup = `
            <div class="audiocall__close-game-button" id="audiocall__close-game-button">
              &times;
            </div>
            <div class="audiocall__confirm-exit-popup" id="audiocall__confirm-exit-popup">
              <div class="audiocall__confirm-exit-popup-content" id="audiocall__confirm-exit-popup-content">
                <div class="audiocall__confirm-exit-popup-content__heading">
                  Игра не закончена!
                </div>
                <div class="audiocall__confirm-exit-popup-content__text">
                  Если вы выйдете из игры, прогресс будет потерян.
                </div>
                <a class="btn btn--animated btn--blue" id="audiocall__confirm-exit-popup-content__close-game">Закрыть</a>
                <a class="btn btn--animated btn--green" id="audiocall__confirm-exit-popup-content__close-popup">Отмена</a>
              </div>
            </div>`;

  mainGamePage = `
      <div class="audiocall-start__container" id="audiocall__swiper-container">
        <div class="swiper-container">
            <div class="swiper-wrapper">
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
  `;

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
    const previousHTML = this.audioCallContainer.innerHTML;
    this.audioCallContainer.innerHTML = (previousHTML + this.popup);
    this.closeGameButton = document.getElementById('audiocall__close-game-button');
    this.confirmExitPopup = document.getElementById('audiocall__confirm-exit-popup');
    this.confirmExitPopupContent = document.getElementById('audiocall__confirm-exit-popup-content');
    this.closeConfirmExitPopupButton = document.getElementById('audiocall__confirm-exit-popup-content__close-popup');
    this.confirmExitFromGameButton = document.getElementById('audiocall__confirm-exit-popup-content__close-game');
    this.whereToAppendSwiper = document.getElementById('audiocall__swiper-container');
    this.closeGameButton.addEventListener('click', this.openConfirmExitPopup);
    this.closeConfirmExitPopupButton.addEventListener('click', this.closeConfirmExitPopup);
    this.confirmExitFromGameButton.addEventListener('click', this.goToMainWebsitePage);
    const mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 1,
      spaceBetween: 20,
      updateOnWindowResize: true,
      grabCurcor: false,
      simulateTouch: false,
    });
    this.renderGameSlides(mySwiper, this.arrayOfWordsData);
  }

  openConfirmExitPopup() {
    this.confirmExitPopup.style.opacity = '1';
    this.confirmExitPopup.style.visibility = 'visible';
    this.confirmExitPopupContent.style.opacity = '1';
    this.confirmExitPopupContent.style.transform = 'translate(-50%, -50%) scale(1)';
  }

  closeConfirmExitPopup() {
    this.confirmExitPopup.style.opacity = '0';
    this.confirmExitPopup.style.visibility = 'hidden';
    this.confirmExitPopupContent.style.opacity = '0';
    this.confirmExitPopupContent.style.transform = 'translate(-50%, -50%) scale(.25)';
  }

  goToMainWebsitePage() {
    window.location.href = this.urlForHomePage;
  }

  renderGameSlides(whereToAppend) {
    for (let i = 0; i < 20; i += 1) {
      whereToAppend.appendSlide(`
        <div class="audiocall-game__wrapper swiper-slide">
          <div class="audiocall-game__inner">
            <div class="audiocall-game__sound audiocall-game__sound-bg">
              <img class="audiocall-game__img" src="">
            </div>
            <div class="audiocall-game__english-word visually-hidden">lorem ipsum</div>
          </div>
          <ul class="audiocall-game__list">
            <li class="audiocall-game__item">
              <p class="audiocall-game__number">1</p>
              <p class="audiocall-game__word">${this.arrayOfWordsData}</p>
            </li>
            <li class="audiocall-game__item audiocall-game__item-incorrect">
              <p class="audiocall-game__number">2</p>
              <p class="audiocall-game__word">I: ${i}</p>
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
          <div class="audiocall-game__btn-inner">
            <button class="audiocall-game__btn">Не знаю</button>
            <button class="audiocall-game__btn-next visually-hidden">Дальше</button>
          </div>
        </div>
      `);
    }
  }
}
export default new Audiocall();

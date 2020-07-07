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

  satisticsFirstButton = null;

  statisticsPopup = null;

  statisticPlayButton = null;

  urlForHomePageGame = '/#games';

  statisticsPopupOpositePage = null;

  whereToAppendSwiper = null;

  arrayOfWordsData = [];

  goToNextSlideButton = null;

  mySwiper = null;

  countSlides = null;

  words = null;

  constructor() {
    this.goToMainGamePage = this.goToMainGamePage.bind(this);
    this.openConfirmExitPopup = this.openConfirmExitPopup.bind(this);
    this.closeConfirmExitPopup = this.closeConfirmExitPopup.bind(this);
    this.goToMainWebsitePage = this.goToMainWebsitePage.bind(this);
    this.openStatisticsFirstPage = this.openStatisticsFirstPage.bind(this);
    this.goToStartGamePage = this.goToStartGamePage.bind(this);
    this.openStatisticsSecondPage = this.openStatisticsSecondPage.bind(this);
    this.renderGameSlides = this.renderGameSlides.bind(this);
    this.fetchWords = this.fetchWords.bind(this);
    this.words = [];
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
        <div class="audiocall-game__btn-inner">
          <button class="audiocall-game__btn">Не знаю</button>
          <button class="audiocall-game__btn-next" id="button-next">Дальше</button>
        </div>


        <button id="result-1">Статистика1</button>
        <button id="result-2">Статистика2</button>
        <section class="audiocall-statistics" id="statistics-popup-1">
          <div class="audiocall-statistics__popup">
            <div class="audiocall-statistics__container">
              <p class="audiocall-statistics__title">Неплохо, но есть над чем поработать</p>
              <div class="audiocall-statistics__img"></div>
              <div class="audiocall-statistics__btn-inner">
                <a class="audiocall-statistics__play-btn audiocall-statistics__btn" id="audiocall-statistics__play-btn">Сыграем еще?</a>
                <a class="audiocall-statistics__exit-btn audiocall-statistics__btn" id="audiocall-statistics__exit-btn">Выход из игры</a>
              </div>
            </div>
          </div>
        </section>
        <section class="audiocall-statistics" id="statistics-popup-2">
          <div class="audiocall-statistics__popup">
            <div class="audiocall-statistics__container">
                <p class="audiocall-statistics__title">Неплохо, но есть над чем поработать</p>
                <div class="audiocall-statistics__content">
                  <div class="audiocall-statistics__content-mistake">
                    <div class="audiocall-statistics__content-mistake-inner">
                      <p class="audiocall-statistics__content-mistake-heading">Ошибок</p>
                      <p class="audiocall-statistics__content-mistake-number">&nbsp-&nbsp</p>
                      <p class="audiocall-statistics__content-mistake-number">5</p>
                    </div>
                    <div class="audiocall-statistics__content-mistake-inner">
                      <div class="audiocall-statistics__mistake-wrapper">
                        <img class="audiocall-statistics__mistake-img" src="../../../assets/images/audio-call-game-icon.svg">
                        <p class="audiocall-statistics__english-word-mistake">arm</p>
                        <p class="audiocall-statistics__english-word-correct">&nbsp-&nbsp</p>
                        <p class="audiocall-statistics__translation-mistake">рука</p>
                      </div>
                    </div>
                  </div>
                  <div class="audiocall-statistics__content-correct-answer">
                  <div class="audiocall-statistics__content-correct-inner">
                    <p class="audiocall-statistics__content-correct-heading">Знаю</p>
                    <p class="audiocall-statistics__content-correct-number">&nbsp-&nbsp</p>
                    <p class="audiocall-statistics__content-correct-number">15</p>
                  </div>
                    <div class="audiocall-statistics__correct-wrapper">
                      <div class="audiocall-statistics__content-correct-inner">
                        <img class="audiocall-statistics__correct-img" src="../../../assets/images/audio-call-game-icon.svg">
                        <p class="audiocall-statistics__english-word-correct">leg</p>
                        <p class="audiocall-statistics__english-word-correct">&nbsp-&nbsp</p>
                        <p class="audiocall-statistics__translation-correct">нога</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="audiocall-statistics__btn-inner">
                  <a class="audiocall-statistics__play-btn audiocall-statistics__btn" id="audiocall-statistics__play-btn">Сыграем еще?</a>
                  <a class="audiocall-statistics__exit-btn audiocall-statistics__btn" id="audiocall-statistics__exit-btn">Выход из игры</a>
                </div>
            </div>
          </div>
        </section>
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
    this.startGameButton = document.getElementById('start-game-button');
    this.startGameButton.addEventListener('click', this.goToMainGamePage);
    this.startGameButton.addEventListener('click', this.fetchWords);
  }

  goToMainGamePage() {
    this.audioCallContainer.innerHTML = this.mainGamePage;
    this.satisticsFirstButton = document.getElementById('result-1');
    this.satisticsSecondButton = document.getElementById('result-2');
    this.statisticsPopup = document.getElementById('statistics-popup-1');
    this.statisticPlayButton = document.getElementById('audiocall-statistics__play-btn');
    this.statisticExitButton = document.getElementById('audiocall-statistics__exit-btn');
    this.statisticPlayButton.addEventListener('click', this.goToStartGamePage);
    this.statisticExitButton.addEventListener('click', this.goToMainWebsitePage);
    this.satisticsFirstButton.addEventListener('click', this.openStatisticsFirstPage);
    this.statisticsPopupOpositePage = document.getElementById('statistics-popup-2');
    this.satisticsSecondButton.addEventListener('click', this.openStatisticsSecondPage);
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
    this.mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 1,
      spaceBetween: 20,
      updateOnWindowResize: true,
      grabCurcor: false,
      simulateTouch: false,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
    });
    this.renderGameSlides(this.mySwiper, this.arrayOfWordsData);
    this.goToNextSlideButton = document.getElementById('button-next');
    this.goToNextSlideButton.addEventListener('click', () => {
      this.goToNextSlide(this.mySwiper);
    });
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

  goToStartGamePage() {
    window.location.href = this.urlForHomePageGame;
  }

  openStatisticsFirstPage() {
    this.statisticsPopup.style.display = 'block';
  }

  openStatisticsSecondPage() {
    this.statisticsPopupOpositePage.style.display = 'block';
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
        </div>
      `);
    }
  }

  goToNextSlide(swiper) {
    swiper.slideNext();
    this.countSlides += 1;
  }

  async fetchWords() {
    return new Promise((resolve) => {
      const MIN_PAGE = 0;
      const MAX_PAGE = 29;
      const MIN_GROUP = 0;
      const MAX_GROUP = 5;
      const groupNum = Math.floor(Math.random() * (MAX_GROUP - MIN_GROUP + 1)) + MIN_GROUP;
      const pageNum = Math.floor(Math.random() * (MAX_PAGE - MIN_PAGE + 1)) + MIN_PAGE;
      resolve(fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${pageNum}&group=${groupNum}`)
        .then((res) => res.json().then((data) => data.forEach((el) => {
          const updWord = {
            id: el.id, word: el.word, translate: el.wordTranslate, audio: el.audio, image: el.image,
          };
          return this.arrayOfWordsData.push(updWord);
        }))));
    });
  }
}
export default new Audiocall();

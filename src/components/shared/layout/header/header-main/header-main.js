import './header-main.scss';
import Utils from '../../../../../services/Utils';

class HeaderMain {
  linksGameContainer = null;

  itemsGame = null;

  alreadyRenderedPage = false;

  activeItemClassGame = 'main-active-link';

  constructor() {
    this.changeActiveIteamGames = this.changeActiveIteamGames.bind(this);
  }

  view = `
          <header class="header-main">
            <div class="header-main__container">
              <nav class="header-main__nav">
                <div class="header-main__logo header-main__start">
                  <a class="header-main__link-logo" href="/#/">
                    <img class="header-main__img-logo" src="../../../../../assets/images//main-logo.png">
                  </a>
                </div>
                <div class="header-main__middle">
                  <ul class="header-main__list">
                    <li class="header-main__item main-active-item" id="main-tab1">
                      <a class="header-main__link main-active-link" href="/#games">
                        <span class="header-main__heading">Игры</span>
                        <img class="header-main__img" src="../../../../../assets/images/games-icon.svg">
                      </a>
                    </li>
                    <li class="header-main__item" id="main-tab2">
                      <a class="header-main__link" href="/#dictionary">
                        <span class="header-main__heading">Словари</span>
                        <img class="header-main__img" src="../../../../../assets/images/dictionary-icon.svg">
                      </a>
                  </li>
                  <li class="header-main__item" id="main-tab3">
                    <a class="header-main__link" href="/#statistics">
                      <span class="header-main__heading">Статистика</span>
                      <img class="header-main__img" src="../../../../../assets/images/statistics-icon.svg">
                    </a>
                  </li>
                  <li class="header-main__item" id="main-tab4">
                    <a class="header-main__link" href="/#new-words">
                      <span class="header-main__heading">Новые слова</span>
                      <img class="header-main__img" src="../../../../../assets/images/new-words-icon.svg">
                    </a>
                  </li>
                  </ul>
                </div>
                <div class="header-main__end">
                  <div class="header-main__account">
                    <p class="header-main__text">Мария</p>
                    <div >
                      <a class="account-btn" href="/#/">М</a>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </header>
        `;

  async render() {
    return this.view;
  }

  async afterRender() {
    if (!this.alreadyRenderedPage) {
      this.linksGameContainer = document.querySelector('.header-promo__list');
      this.itemsGame = [...document.querySelectorAll('.header-promo__link')];
      const request = Utils.parseRequestURL();
      this.changeActiveIteamGames(request?.resource);
    }
  }

  changeActiveIteamGames(page) {
    this.itemsGame.forEach((element) => {
      element.classList.remove(this.activeItemClassGame);
    });
    if (page === 'vocabularies') {
      document.getElementById('main-tab2').children[0].classList.add(this.activeItemClassGame);
    } else if (page === 'statistics') {
      document.getElementById('main-tab3').children[0].classList.add(this.activeItemClassGame);
    } else if (page === 'new-words') {
      document.getElementById('main-tab4').children[0].classList.add(this.activeItemClassGame);
    } else {
      document.getElementById('main-tab1').children[0].classList.add(this.activeItemClassGame);
    }
  }
}

export default new HeaderMain();

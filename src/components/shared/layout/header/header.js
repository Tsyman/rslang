import './header.scss';

import Utils from '../../../../services/Utils';
import state from '../../../../common/state';

class Header {
  linksGameContainer = null;

  items = null;

  alreadyRenderedPage = false;

  activeItemClassGame = 'main-active-link';

  viewMain = () => `
          <header class="header-main">
            <div class="header-main__container">
              <nav class="header-main__nav">
                <div class="header-main__logo header-main__start">
                  <a class="header-main__link-logo" href="/#/">
                    <img class="header-main__img-logo" src="../../../../../assets/images/main-logo.png">
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
                  <li class="header-main__item" id="main-tab5">
                    <a class="header-main__link" href="/#team">
                      <span class="header-main__heading">Наша команда</span>
                      <img class="header-main__img" src="../../../../../assets/images/team.svg">
                    </a>
                  </li>
                  </ul>
                </div>
                <div class="header-main__end">
                  <div class="header-main__account">
                    <p class="header-main__text">${state.getName()}</p>
                    <div >
                      <a class="account-btn" href="/#/">${state.getName() && state.getName()[0].toUpperCase()}</a>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </header>
        `;

  viewPromo = `
          <header class="header-promo">
            <div class="header-promo__container">
              <nav class="header-promo__nav">
                <div class="header-promo__logo header-promo__start">
                  <a class="header-promo__link" href="/">
                    <img src="../../../../assets/images/logo.png">
                  </a>
                </div>
                <div class="sidebar">
                  <input class="sidebar__input" id="sidebar__input" type="checkbox">
                  <label for="sidebar__input" class="sidebar__label">
                    <div class="burger diagonal diagonal-1"></div>
                    <div class="burger horizontal"></div>
                    <div class="burger diagonal diagonal-2"></div>
                  </label>
                  <div class="header-promo__end sidebar__menu">
                    <ul class="header-promo__list sidebar__list">
                      <li class="header-promo__item sidebar__item promo-tab1" id="promo-tab1">
                        <a class="header-promo__link promo-active-link" href="/#/">Главная</a>
                      </li>
                      <li class="header-promo__item sidebar__item promo-tab2" id="promo-tab2">
                        <a class="header-promo__link" href="/#team">Наша команда</a>
                      </li>
                      <li class="registration sidebar__item">
                        <a class="registration__secondary-btn" href="/#login">Создать аккаунт</a>
                      </li>
                      <li class="registration sidebar__item">
                        <a class="registration__light-btn" href="/#login">Войти</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </header>
        `;

  constructor() {
    this.changeActiveItemGames = this.changeActiveItemGames.bind(this);
  }

  async render() {
    return state.isAuthenticated() ? this.viewMain() : this.viewPromo;
  }

  async afterRender() {
    if (!state.isAuthenticated()) {
      const hideHeaderAndFooter = () => {
        document.getElementById('header_container').style.display = 'none';
        document.getElementById('footer_container').style.display = 'none';
      };
      document.querySelector('.registration__secondary-btn').addEventListener('click', hideHeaderAndFooter);
      document.querySelector('.registration__light-btn').addEventListener('click', hideHeaderAndFooter);
    }
    if (!this.alreadyRenderedPage) {
      this.linksGameContainer = document.querySelector('.header-promo__list');
      this.items = [...document.querySelectorAll('.header-promo__link')];
      const request = Utils.parseRequestURL();
      this.changeActiveItemGames(request?.resource);
    }
  }

  changeActiveItemGames(page) {
    this.items.forEach((element) => {
      element.classList.remove(this.activeItemClassGame);
    });
    if (!state.isAuthenticated()) {
      if (page === 'team') {
        document.getElementById('promo-tab2').children[0].classList.add(this.activeItemClass);
      } else {
        document.getElementById('promo-tab1').children[0].classList.add(this.activeItemClass);
      }
    } else if (page === 'vocabularies') {
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

export default new Header();

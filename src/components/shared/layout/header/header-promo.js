import './header.scss';

import Header from './header';
import Utils from '../../../../services/Utils';

class HeaderPromo extends Header {
  constructor() {
    super();
    this.activeItemClass = 'promo-active-link';
    this.view = () => `
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
  }

  afterRender = async () => {
    const hideHeaderAndFooter = () => {
      document.getElementById('header_container').style.display = 'none';
      document.getElementById('footer_container').style.display = 'none';
    };
    document.querySelector('.registration__secondary-btn').addEventListener('click', hideHeaderAndFooter);
    document.querySelector('.registration__light-btn').addEventListener('click', hideHeaderAndFooter);
    this.items = [...document.querySelectorAll('.header-promo__link')];
    const request = Utils.parseRequestURL();
    this.changeActiveItem(request?.resource);
  }

  changeActiveItem = (page) => {
    this.items.forEach((element) => {
      element.classList.remove(this.activeItemClass);
    });
    if (page === 'team') {
      document.getElementById('promo-tab2').children[0].classList.add(this.activeItemClass);
    } else {
      document.getElementById('promo-tab1').children[0].classList.add(this.activeItemClass);
    }
  }
}

export default new HeaderPromo();

import './header-promo.scss';
import Utils from '../../../../../services/Utils';

class HeaderPromo {
  linksContainer = null;

  items = null;

  alreadyRendered = false;

  activeItemClass = 'promo-active-link';

  constructor() {
    this.changeActiveIteam = this.changeActiveIteam.bind(this);
  }

  view = `
          <header class="header-promo">
            <div class="container">
              <nav class="header-promo__nav">
                <div class="header-promo__logo header-promo__start">
                  <a class="header-promo__link" href="/#/">
                    <img src="../../../../../assets/images/logo.png">
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
                        <a class="registration__secondary-btn" href="/#/register">Создать аккаунт</a>
                      </li>
                      <li class="registration sidebar__item">
                        <a class="registration__light-btn" href="/#/signin">Войти</a>
                      </li>
                    </ul>
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
    if (!this.alreadyRendered) {
      this.items = [...document.querySelectorAll('.header-promo__link')];
      this.linksContainer = document.querySelector('.header-promo__list');
      const request = Utils.parseRequestURL();
      this.changeActiveIteam(request?.resource);
    }
  }

  changeActiveIteam(page) {
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

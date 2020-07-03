import './header-promo.scss';

class HeaderPromo {
  linksContainer = null;

  items = null;

  alreadyRendered = false;

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
      this.linksContainer.addEventListener('click', this.changeActiveIteam);
    }
  }

  changeActiveIteam(event) {
    window.setTimeout(() => {
      if (event.target.classList.contains('header-promo__link')) {
        this.items.forEach((element) => {
          element.classList.toggle('promo-active-link');
        });
      }
    }, 0);
  }
}

export default new HeaderPromo();

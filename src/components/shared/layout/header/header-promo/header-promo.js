import './header-promo.scss';

class HeaderPromo {
  message = 'after render';

  view = `
          <header class="header-promo">
            <div class="container">
              <nav class="header-promo__nav">
                <div class="header-promo__logo header-promo__start"></div>
                <div class="sidebar">
                  <input class="sidebar__input" id="sidebar__input" type="checkbox">
                  <label for="sidebar__input" class="sidebar__label">
                    <div class="burger diagonal diagonal-1"></div>
                    <div class="burger horizontal"></div>
                    <div class="burger diagonal diagonal-2"></div>
                  </label>
                  <div class="header-promo__end sidebar__menu">
                    <ul class="header-promo__list sidebar__list">
                      <li class="header-promo__item promo-active-item sidebar__item" id="promo-tab1">
                        <a class="header-promo__link" href="/#/">Главная</a>
                      </li>
                      <li class="header-promo__item sidebar__item" id="promo-tab2">
                        <a class="header-promo__link" href="/#team">Наша команда</a>
                      </li>
                      <li class="registration-btn sidebar__item">
                        <a class="button secondary-btn" href="/#/register">Создать аккаунт</a>
                      </li>
                      <li class="registration-btn sidebar__item">
                        <a class="button secondary-light-btn" href="/#/signin">Войти</a>
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
    console.log(this.message);
  }
}

export default new HeaderPromo();

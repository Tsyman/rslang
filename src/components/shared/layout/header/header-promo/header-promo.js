import './header-promo.scss';

class HeaderPromo {
  message = 'after render';

  view = `
          <header class="header-promo">
            <div class="container">
              <nav class="header-promo__nav">
                <div class="header-promo__logo header-promo__start"></div>
                <div class="header-promo__inner">
                  <div class="header-promo__middle">
                    <ul class="header-promo__list">
                      <li class="header-promo__item promo-active-item" id="promo-tab1"><a class="header-promo__link" href="/#/">Главная</a></li>
                      <li class="header-promo__item" id="promo-tab2"><a class="header-promo__link" href="/#team">Наша команда</a></li>
                    </ul>
                  </div>
                  <div class="header-promo__end">
                    <div class="header-promo__btn">
                      <a class="button secondary-btn" href="/#login">Создать аккаунт</a>
                      <a class="button secondary-light-btn" href="/#login">Войти</a>
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
    console.log(this.message);
    document.querySelector('.button.secondary-btn').addEventListener('click', () => {
      document.getElementById('header_container').style.display = 'none';
      document.getElementById('footer_container').style.display = 'none';
    });
    document.querySelector('.button.secondary-light-btn').addEventListener('click', () => {
      document.getElementById('header_container').style.display = 'none';
      document.getElementById('footer_container').style.display = 'none';
      setTimeout(() => {
        document.querySelector('.form-footer button').click();
      }, 0);
    });
  }
}

export default new HeaderPromo();

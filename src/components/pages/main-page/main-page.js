import './main-page.scss';

class MainPage {
  view = `
          <header class="header-main">
            <div class="container">
              <nav class="header-main__nav">
                <div class="header-main__logo header-main__start"></div>
                <div class="header-main__middle">
                  <ul class="header-main__list">
                    <li class="header-main__item main-active-item">
                      <a class="header-main__link" href="/#games">Игры</a>
                    </li>
                    <li class="header-main__item">
                      <a class="header-main__link" href="/#dictionary">Словари</a>
                  </li>
                  <li class="header-main__item">
                    <a class="header-main__link" href="/#statistics">Статитсика</a>
                  </li>
                  <li class="header-main__item">
                    <a class="header-main__link" href="/#learning">Новые слова</a>
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
}

export default new MainPage();

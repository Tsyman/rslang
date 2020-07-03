import './header-main.scss';

class HeaderMain {
  message = 'after render';

  view = `
          <header class="header-main">
            <div class="container">
              <nav class="header-main__nav">
                <div class="header-main__logo header-main__start">
                  <a class="header-main__link-logo" href="/#/">
                    <img class="header-main__img-logo" src="../../../../../assets/images//main-logo.png">
                  </a>
                </div>
                <div class="header-main__middle">
                  <ul class="header-main__list">
                    <li class="header-main__item main-active-item">
                      <a class="header-main__link" href="/#games">
                        <span class="header-main__heading">Игры</span>
                        <img class="header-main__img" src="../../../../../assets/images/games-icon.svg">
                      </a>
                      <div class="current-page"></div>
                    </li>
                    <li class="header-main__item">
                      <a class="header-main__link" href="/#vocabularies">
                        <span class="header-main__heading">Словари</span>
                        <img class="header-main__img" src="../../../../../assets/images/vocabulary-icon.svg">
                      </a>
                      <div id="current-page"></div>
                  </li>
                  <li class="header-main__item">
                    <a class="header-main__link" href="/#statistics">
                      <span class="header-main__heading">Статистика</span>
                      <img class="header-main__img" src="../../../../../assets/images/statistics-icon.svg">
                    </a>
                    <div id="current-page"></div>
                  </li>
                  <li class="header-main__item">
                    <a class="header-main__link" href="/#new-words">
                      <span class="header-main__heading">Новые слова</span>
                      <img class="header-main__img" src="../../../../../assets/images/new-words-icon.svg">
                    </a>
                    <div id="current-page"></div>
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
    return this.message;
  }
}

export default new HeaderMain();

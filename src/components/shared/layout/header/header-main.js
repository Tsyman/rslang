import './header.scss';
import Header from './header';
import state from '../../../../common/state';
import Utils from '../../../../services/Utils';

class HeaderMain extends Header {
  constructor() {
    super();
    this.activeItemClass = 'main-active-link';
    this.view = () => `
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
  }

  afterRender = async () => {
    this.items = [...document.querySelectorAll('.header-main__link')];
    const request = Utils.parseRequestURL();
    this.changeActiveItem(request?.resource);
  }

  changeActiveItem = (page) => {
    super.changeActiveItem();
    if (page === 'dictionary') {
      document.getElementById('main-tab2').children[0].classList.add(this.activeItemClass);
    } else if (page === 'statistics') {
      document.getElementById('main-tab3').children[0].classList.add(this.activeItemClass);
    } else if (page === 'new-words') {
      document.getElementById('main-tab4').children[0].classList.add(this.activeItemClass);
    } else if (page === 'team') {
      document.getElementById('main-tab5').children[0].classList.add(this.activeItemClass);
    } else {
      document.getElementById('main-tab1').children[0].classList.add(this.activeItemClass);
    }
  }
}

export default new HeaderMain();

import './main-page.scss';

class MainPage {
  popupOpenButton = null;

  popup = null;

  popupContent = null;

  popupCloseButton = null;

  constructor() {
    this.openPopupFunction = this.openPopupFunction.bind(this);
    this.closePopupFunction = this.closePopupFunction.bind(this);
  }

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

  async afterRender() {
    this.popupOpenButton = document.querySelector('#open-popup');
    this.popup = document.querySelector('#popup');
    this.popupContent = document.querySelector('#popup-content');
    this.popupCloseButton = document.querySelector('#popup-close-button');

    this.popupOpenButton.addEventListener('click', this.openPopupFunction);
    this.popupCloseButton.addEventListener('click', this.closePopupFunction);
  }

  openPopupFunction() {
    this.popup.style.opacity = '1';
    this.popup.style.visibility = 'visible';
    this.popupContent.style.opacity = '1';
    this.popupContent.style.transform = 'translate(-50%, -50%) scale(1)';
  }

  closePopupFunction() {
    this.popup.style.opacity = '0';
    this.popup.style.visibility = 'hidden';
    this.popupContent.style.opacity = '0';
    this.popupContent.style.transform = 'translate(-50%, -50%) scale(.25)';
  }
}

export default new MainPage();

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
    <section class="section">
      <h1> Main Page </h1>
    </section>
    <div class="popup" id="popup">
      <div class="popup__content" id="popup-content">
      <a class="popup__close" id="popup-close-button">&times;</a>
      <h2 class="heading-tertiary u-margin-bottom-small" id="popup-header">Something went wrong</h2>
      <p class="popup__text" id="popup-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.
      </p>
      </div>
    </div>
    <a id="open-popup">Open Popup</a>
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

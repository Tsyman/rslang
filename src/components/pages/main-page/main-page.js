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
    </section>
    <div class="popup" id="popup">
      <div class="popup-content" id="popup-content">
        <div class="popup-content__control-section">
          <div class="popup-content__control-section--information-part">
            <div class="popup-content__control-section--logo"></div>
            <div class="popup-content__control-section--name">Настройки</div>
          </div>
          <a class="popup__close" id="popup-close-button">&times;</a>
        </div>
        <div class="popup-content__settings-section">

        </div>
        <div class="popup-content__save-button">
          <a class="btn">Сохранить</a>
        </div>
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

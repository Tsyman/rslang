import './settings-popup.scss';
import state from '../../../common/state';
import SettingsService from '../../../services/SettingsService';

class SettingsPage {
  popupOpenButton = null;

  popup = null;

  popupContent = null;

  popupCloseButton = null;

  popupSaveButton = null;

  settings = null;

  constructor() {
    this.openPopupFunction = this.openPopupFunction.bind(this);
    this.closePopupFunction = this.closePopupFunction.bind(this);
  }

  view = `
  <div class="popup" id="popup">
    <div class="popup-content" id="popup-content">
    <div class="popup-content__info">
      <div class="popup-content__control-section">
        <div class="popup-content__control-section--information-part">
          <div class="popup-content__control-section--logo">
          </div>
          <div class="popup-content__control-section--name">
            Настройки
          </div>
        </div>
        <div class="popup__close" id="popup-close-button">
          &times;
        </div>
      </div>
      <div class="popup-content__settings-section">
        <div class="popup-content__settings-section--figure-container">
            <div class="popup-content__settings-section--figure-row">
              <div class="popup-content__settings-section--figure-text">
                Количество новых слов, планируемых выучить за день
              </div>
              <input class="settings-figure" type="number" placeholder="Число новых слов">
            </div>
            <div class="popup-content__settings-section--figure-row">
              <div class="popup-content__settings-section--figure-text">
                Максимальное количество карточек со словами в день
              </div>
              <input class="settings-figure" type="number" placeholder="Макс. количество карточек">
            </div>
          </div>
        <div class="popup-content__settings-section--switcher-container">
            <div class="popup-content__settings-section--switcher-row">
              <div class="popup-content__settings-section--switcher-text">
                Перевод слова
              </div>
              <div class="switch-container">
                <label class="switch-container__content">
                  <input type="checkbox" class="switch-container__input" checked>
                  <span class="switch-container__label" data-on="Выкл" data-off="Вкл"></span>
                  <span class="switch-container__handle"></span>
                </label>
              </div>
            </div>
            <div class="popup-content__settings-section--switcher-row">
              <div class="popup-content__settings-section--switcher-text">
                Предложение с объяснением значения
              </div>
              <div class="switch-container">
                <label class="switch-container__content">
                  <input type="checkbox" class="switch-container__input" checked>
                  <span class="switch-container__label" data-on="Выкл" data-off="Вкл"></span>
                  <span class="switch-container__handle"></span>
                </label>
              </div>
            </div>
            <div class="popup-content__settings-section--switcher-row">
              <div class="popup-content__settings-section--switcher-text">
                Пример использования изучаемого слова
              </div>
              <div class="switch-container">
                <label class="switch-container__content">
                  <input type="checkbox" class="switch-container__input" checked>
                  <span class="switch-container__label" data-on="Выкл" data-off="Вкл"></span>
                  <span class="switch-container__handle"></span>
                </label>
              </div>
            </div>

            <div class="popup-content__settings-section--switcher-row">
              <div class="popup-content__settings-section--switcher-text">
                Транскрипция слова
              </div>
              <div class="switch-container">
                <label class="switch-container__content">
                  <input type="checkbox" class="switch-container__input" checked>
                  <span class="switch-container__label" data-on="Выкл" data-off="Вкл"></span>
                  <span class="switch-container__handle"></span>
                </label>
              </div>
            </div>
            <div class="popup-content__settings-section--switcher-row">
              <div class="popup-content__settings-section--switcher-text">
                Картинка-ассоциация
              </div>
              <div class="switch-container">
                <label class="switch-container__content">
                  <input type="checkbox" class="switch-container__input" checked>
                  <span class="switch-container__label" data-on="Выкл" data-off="Вкл"></span>
                  <span class="switch-container__handle"></span>
                </label>
              </div>
            </div>
            <div class="popup-content__settings-section--switcher-row">
              <div class="popup-content__settings-section--switcher-text">
                Произношение слова на английском языке
              </div>
              <div class="switch-container">
                <label class="switch-container__content">
                  <input type="checkbox" class="switch-container__input" checked>
                  <span class="switch-container__label" data-on="Выкл" data-off="Вкл"></span>
                  <span class="switch-container__handle"></span>
                </label>
              </div>
            </div>
            <div class="popup-content__settings-section--switcher-row">
              <div class="popup-content__settings-section--switcher-text">
                Произношение предложений с объяснением слова и с примером использования слова
              </div>
              <div class="switch-container">
                <label class="switch-container__content">
                  <input type="checkbox" class="switch-container__input" checked>
                  <span class="switch-container__label" data-on="Выкл" data-off="Вкл"></span>
                  <span class="switch-container__handle"></span>
                </label>
              </div>
            </div>
            <div class="popup-content__settings-section--switcher-row">
              <div class="popup-content__settings-section--switcher-text">
                Кнопка "Показать ответ"
              </div>
              <div class="switch-container">
                <label class="switch-container__content">
                  <input type="checkbox" class="switch-container__input" checked>
                  <span class="switch-container__label" data-on="Выкл" data-off="Вкл"></span>
                  <span class="switch-container__handle"></span>
                </label>
              </div>
            </div>
            <div class="popup-content__settings-section--switcher-row">
              <div class="popup-content__settings-section--switcher-text">
                Кнопка "Удалить"
              </div>
              <div class="switch-container">
                <label class="switch-container__content">
                  <input type="checkbox" class="switch-container__input" checked>
                  <span class="switch-container__label" data-on="Выкл" data-off="Вкл"></span>
                  <span class="switch-container__handle"></span>
                </label>
              </div>
            </div>
            <div class="popup-content__settings-section--switcher-row">
              <div class="popup-content__settings-section--switcher-text">
                Кнопка "В сложные слова"
              </div>
              <div class="switch-container">
                <label class="switch-container__content">
                  <input type="checkbox" class="switch-container__input" checked>
                  <span class="switch-container__label" data-on="Выкл" data-off="Вкл"></span>
                  <span class="switch-container__handle"></span>
                </label>
              </div>
            </div>
            <div class="popup-content__settings-section--switcher-row">
              <div class="popup-content__settings-section--switcher-text">
                Кнопки "Снова", "Трудно", "Хорошо", "Легко"
              </div>
              <div class="switch-container">
                <label class="switch-container__content">
                  <input type="checkbox" class="switch-container__input" checked>
                  <span class="switch-container__label" data-on="Выкл" data-off="Вкл"></span>
                  <span class="switch-container__handle"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <a class="btn btn--animated btn--green" id="popup-save-button">Сохранить</a>
        </div>
      </div>
    </div>
  `;

  async render() {
    this.settings = state.getSettings();
    if (!this.settings) {
      this.settings = await SettingsService.get(state.getUserId());
    }
    if (!this.settings) {
      // TODO Здесь надо заменить пустой объект на шаблон объекта настроек
      //  с настройками по умолчанию
      this.settings = await SettingsService.save({});
    }

    return this.view;
  }

  async afterRender() {
    this.popupOpenButton = document.querySelector('#open-popup');
    this.popup = document.querySelector('#popup');
    this.popupContent = document.querySelector('#popup-content');
    this.popupCloseButton = document.querySelector('#popup-close-button');
    this.popupSaveButton = document.querySelector('#popup-save-button');

    this.popupOpenButton.addEventListener('click', this.openPopupFunction);
    this.popupCloseButton.addEventListener('click', this.closePopupFunction);
    this.popupSaveButton.addEventListener('click', this.closePopupFunction);
  }

  openPopupFunction() {
    this.popup.style.opacity = '1';
    this.popup.style.visibility = 'visible';
    this.popupContent.style.opacity = '1';
    this.popupContent.style.transform = 'translate(-50%, -50%) scale(1)';
  }

  closePopupFunction() {
    // TODO здесь надо сохранять изменения настроек на бек и в state
    this.popup.style.opacity = '0';
    this.popup.style.visibility = 'hidden';
    this.popupContent.style.opacity = '0';
    this.popupContent.style.transform = 'translate(-50%, -50%) scale(.25)';
  }
}

export default new SettingsPage();

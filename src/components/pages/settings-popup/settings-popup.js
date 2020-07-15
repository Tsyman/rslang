import './settings-popup.scss';
import state from '../../../common/state';
import SettingsService from '../../../services/SettingsService';

const getFigureContent = (id, param) => `
      <div class="popup-content__settings-section--figure-row">
        <div class="popup-content__settings-section--figure-text">${param.text}</div>
        <input class="settings-figure" type="number" placeholder="${param.placeHolder}" value="${param.value}" id="${id}">
      </div>
  `;
const getSwitchContent = (id, param) => `  
      <div class="popup-content__settings-section--switcher-row">
        <div class="popup-content__settings-section--switcher-text">${param.text}</div>
        <div class="switch-container">
          <label class="switch-container__content">
            <input type="checkbox" class="switch-container__input" ${param.value ? 'checked' : ''} id="${id}">
            <span class="switch-container__label" data-on="Выкл" data-off="Вкл"></span>
            <span class="switch-container__handle"></span>
          </label>
        </div>
      </div>
  `;
const BOOLEAN = 'boolean';
const NUMBER = 'number';

class SettingsPage {
  constructor() {
    this.openPopupFunction = this.openPopupFunction.bind(this);
    this.closePopupFunction = this.closePopupFunction.bind(this);
    this.popupOpenButton = null;
    this.popup = null;
    this.popupContent = null;
    this.popupCloseButton = null;
    this.popupSaveButton = null;
    this.settings = null;
    this.defaultSettings = {
      wordsPerDay: {
        value: 50, type: NUMBER, text: 'Количество новых слов, планируемых выучить за день', placeHolder: 'Число новых слов',
      },
      cardsPerDay: {
        value: 100, type: NUMBER, text: 'Максимальное количество карточек со словами в день', placeHolder: 'Макс. количество карточек',
      },
      showWordTranslation: { value: false, type: BOOLEAN, text: 'Перевод слова' },
      showMeaning: { value: false, type: BOOLEAN, text: 'Предложение с объяснением значения' },
      showExample: { value: false, type: BOOLEAN, text: 'Пример использования изучаемого слова' },
      showTranscription: { value: false, type: BOOLEAN, text: 'Транскрипция слова' },
      showImage: { value: false, type: BOOLEAN, text: 'Картинка-ассоциация' },
      showWordAudio: { value: false, type: BOOLEAN, text: 'Произношение слова на английском языке' },
      showMeaningAudio: { value: false, type: BOOLEAN, text: 'Произношение предложений с объяснением слова и с примером использования слова' },
      showExampleAudio: { value: false, type: BOOLEAN, text: 'Произношение предложений с примером использования слова' },
      showMeaningTranslation: { value: false, type: BOOLEAN, text: 'Перевод объяснения изучаемого слова' },
      showExampleTranslation: { value: false, type: BOOLEAN, text: 'Перевод примера использования изучаемого слова' },
      showButtonAnswer: { value: true, type: BOOLEAN, text: 'Кнопка "Показать ответ"' },
      showButtonDelete: { value: true, type: BOOLEAN, text: 'Кнопка "Удалить"' },
      showButtonDifficult: { value: true, type: BOOLEAN, text: 'Кнопка "В сложные слова"' },
      showAdditionalButtons: { value: true, type: BOOLEAN, text: 'Кнопки "Снова", "Трудно", "Хорошо", "Легко"' },
    };
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
        <div class="popup-content__settings-section--figure-container"></div>
        <div class="popup-content__settings-section--switcher-container"></div>
        </div>
        <a class="btn btn--animated btn--green" id="popup-save-button">Сохранить</a>
        </div>
      </div>
    </div>
  `;

  async render() {
    this.settings = state.getSettings();
    if (!this.settings) {
      const fetchedSettings = await SettingsService.get(state.getUserId());
      this.settings = fetchedSettings ? fetchedSettings.optional : undefined;
    }
    if (!this.settings) {
      await this.saveSettings(this.defaultSettings);
    }

    return this.view;
  }

  async afterRender() {
    const figureContainer = document.querySelector('.popup-content__settings-section--figure-container');
    const switcherContainer = document.querySelector('.popup-content__settings-section--switcher-container');

    figureContainer.innerHTML = Object.entries(this.settings)
      .filter((entity) => entity[1].type === NUMBER)
      .map(([k, v]) => getFigureContent(k, v))
      .join('\n');

    switcherContainer.innerHTML = Object.entries(this.settings)
      .filter((entity) => entity[1].type === BOOLEAN)
      .map(([k, v]) => getSwitchContent(k, v))
      .join('\n');

    this.popupOpenButton = document.querySelector('#open-popup');
    this.popup = document.querySelector('#popup');
    this.popupContent = document.querySelector('#popup-content');
    this.popupCloseButton = document.querySelector('#popup-close-button');
    this.popupSaveButton = document.querySelector('#popup-save-button');

    this.popupOpenButton.addEventListener('click', this.openPopupFunction);
    this.popupCloseButton.addEventListener('click', this.closePopupFunction);
    this.popupSaveButton.addEventListener('click', this.onSaveSettings);
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

  onSaveSettings = () => {
    Object.entries(this.settings).forEach(([k, v]) => {
      this.settings[k].value = v.type === NUMBER
        ? document.getElementById(k).value
        : document.getElementById(k).checked;
    }, {});
    this.saveSettings(this.settings).then(this.closePopupFunction);
  };

  saveSettings = async (settings) => {
    let savedSettings;

    try {
      savedSettings = await SettingsService.save(
        state.getUserId(),
        {
          wordsPerDay: 1,
          optional: { ...settings },
        },
      );
    } catch (e) {
      console.log('something went wrong during settings saving');
    }

    this.settings = savedSettings.optional;
    state.setSettings(this.settings);
  };
}

export default new SettingsPage();

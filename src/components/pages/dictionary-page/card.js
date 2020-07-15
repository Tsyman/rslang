/* eslint-disable no-underscore-dangle */
import CardType from './card-type';
import WordService from '../../../services/WordService';
import state from '../../../common/state';

class Card {
  constructor(data, type) {
    this.data = data;
    this.type = type;
  }

  render() {
    return `
    <div class="dictionary-card" id="${this.data._id}-card">
      <div class="dictionary-card__progress"></div>
      <div>
        <span class="dictionary-card__word" id="${this.data._id}-word">${this.data.word}</span>
        <img src="../../../assets/images/dictionary/sound.png" class="dictionary-card__word-sound" alt="Воспроизвести слово" id="${this.data._id}-play-sound">
        <img src="../../../assets/images/dictionary/preview.png" class="dictionary-card__word-preview" title="Показать/скрыть изображение" alt="Показать/скрыть изображение" id="${this.data._id}-show-image">
      </div>
      <div class="dictionary-card__translation" id="${this.data._id}-word-translate">${this.data.wordTranslate}</div>
      <div class="dictionary-card__description">
        <div id="${this.data._id}-text-example">${this.data.textExample}</div>
        <div id="${this.data._id}-text-example-translate">${this.data.textExampleTranslate}</div>
        <div id="${this.data._id}-transcription">${this.data.transcription}</div>
        <div id="${this.data._id}-text-meaning">${this.data.textMeaning}</div>
        <div id="${this.data._id}-text-meaning-translate">${this.data.textMeaningTranslate}</div>
      </div>
      <div class="dictionary-card__repetition"></div>
      <div class="dictionary-card__actions" id="${this.data._id}-actions">${this.renderActions()}</div>
    </div>`;
  }

  async afterRender(learnModeOn) {
    const cardActions = document.getElementById(`${this.data._id}-actions`);
    const playSound = document.getElementById(`${this.data._id}-play-sound`);
    const showImage = document.getElementById(`${this.data._id}-show-image`);
    const wordTranslate = document.getElementById(`${this.data._id}-word-translate`);
    const example = document.getElementById(`${this.data._id}-text-example`);
    const exampleTranslate = document.getElementById(`${this.data._id}-text-example-translate`);
    const transcription = document.getElementById(`${this.data._id}-transcription`);
    const meaning = document.getElementById(`${this.data._id}-text-meaning`);
    const meaningTranslate = document.getElementById(`${this.data._id}-text-meaning-translate`);

    WordService.getWordWithAssets(this.data._id).then((word) => {
      this.data = { ...this.data, ...word };
      cardActions.innerHTML += `
        <img src="data:image/jpg;base64,${this.data.image}" style="display: none; width: 80%; margin: 0 auto;" id="${this.data._id}-image" alt="${this.data.word}">
        <audio src="data:audio/mpeg;base64,${this.data.audio}" style="display: none" id="${this.data._id}-audio"></audio>
      `;

      showImage.addEventListener('click', () => {
        const button = document.getElementById(`${this.data._id}-image`);
        const current = button.style.display;
        button.style.display = current === 'block' ? 'none' : 'block';
      });

      playSound.addEventListener('click', () => {
        const sound = document.getElementById(`${this.data._id}-audio`);
        sound.play();
      });
    });

    if (learnModeOn) {
      const settings = state.getSettings();
      example.style.display = settings.showExample.value ? 'inline-block' : 'none';
      playSound.style.display = settings.showWordAudio.value ? 'inline-block' : 'none';
      wordTranslate.style.display = settings.showWordTranslation.value ? 'inline-block' : 'none';
      transcription.style.display = settings.showTranscription.value ? 'inline-block' : 'none';
      exampleTranslate.style.display = settings.showExampleTranslation.value ? 'inline-block' : 'none';
      meaning.style.display = settings.showMeaning.value ? 'inline-block' : 'none';
      meaningTranslate.style.display = settings.showMeaningTranslation.value ? 'inline-block' : 'none';
    }
  }

  renderActions() {
    if (this.type === CardType.LEARNING) {
      return `
      <a href="#" class="dictionary-card-action__harden">
        <img src="../../../assets/images/dictionary/question.png" alt="В сложное">
        <span>В сложное</span>
      </a>
      <a href="#" class="dictionary-card-action__remove">
        <img src="../../../assets/images/dictionary/remove.png" alt="Удалить">
        <span>Удалить</span>
      </a>`;
    }

    if (this.type === CardType.DELETED) {
      return `
      <a href="#" class="dictionary-card-action__restore">
        <img src="../../../assets/images/dictionary/restore.png" alt="Восстановить">
        <span>Восстановить</span>
      </a>`;
    }

    if (this.type === CardType.HARD) {
      return `
      <a href="#" class="dictionary-card-action__learn">
        <img src="../../../assets/images/dictionary/question.png" alt="В изучаемое">
        <span>В изучаемое</span>
      </a>`;
    }

    return '';
  }
}

export default Card;

import CardType from './card-type';

class Card {
  constructor(data, type) {
    this.data = data;
    this.type = type;
  }

  render() {
    return `
    <div class="dictionary-card">
      <div class="dictionary-card__progress"></div>
      <div>
        <span class="dictionary-card__word">${this.data.word}</span>
        <img src="../../../assets/images/dictionary/sound.png" class="dictionary-card__word-sound" alt="Воспроизвести слово">
        <img src="../../../assets/images/dictionary/preview.png" class="dictionary-card__word-preview" alt="Показать изображение">
      </div>
      <div class="dictionary-card__translation">${this.data.wordTranslate}</div>
      <div class="dictionary-card__description">
        <div>${this.data.textExample}</div>
        <div>${this.data.transcription}</div>
        <div>${this.data.textMeaning}</div>
      </div>
      <div class="dictionary-card__repetition"></div>
      <div class="dictionary-card__actions">${this.renderActions()}</div>
    </div>`;
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

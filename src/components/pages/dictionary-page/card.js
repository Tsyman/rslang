import CardType from './card-type';

class Card {
  constructor(data, type) {
    this.data = data;
    this.type = type;
  }

  render() {
    let actions = '';

    if (this.type === CardType.LEARNING) {
      actions = `
      <a href="#" class="dictionary__card__harden">
        <img src="../../../assets/images/dictionary/question.png" alt="В сложное">
        <span>В сложное</span>
      </a>
      <a href="#" class="dictionary__card__remove">
        <img src="../../../assets/images/dictionary/remove.png" alt="Удалить">
        <span>Удалить</span>
      </a>`;
    } else if (this.type === CardType.HARD) {
      actions = `
      <a href="#" class="dictionary__card__learn">
        <img src="../../../assets/images/dictionary/question.png" alt="В изучаемое">
        <span>В изучаемое</span>
      </a>`;
    } else if (this.type === CardType.DELETED) {
      actions = `
      <a href="#" class="dictionary__card__restore">
        <img src="../../../assets/images/dictionary/restore.png" alt="Восстановить">
        <span>Восстановить</span>
      </a>`;
    }

    return `
    <div class="dictionary__card">
      <div class="dictionary__card__progress"></div>
      <div class="dictionary__card__word">
        <span>${this.data.word}</span>
        <img src="../../../assets/images/dictionary/sound.png" class="dictionary__card__word__sound" alt="Воспроизвести слово">
        <img src="../../../assets/images/dictionary/preview.png" class="dictionary__card__word__preview" alt="Показать изображение">
      </div>
      <div class="dictionary__card__translation">${this.data.wordTranslate}</div>
      <div class="dictionary__card__description">
        <div>${this.data.textExample}</div>
        <div>${this.data.transcription}</div>
        <div>${this.data.textMeaning}</div>
      </div>
      <div class="dictionary__card__repetition"></div>
      <div class="dictionary__card__actions">${actions}</div>
    </div>`;
  }
}

export default Card;

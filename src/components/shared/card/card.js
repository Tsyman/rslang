import './card.scss';

class Card {
  constructor({
    startText, endText, word, textTranslate, wordType, wordTranslate,
  }) {
    this.startText = startText;
    this.endText = endText;
    this.textTranslate = textTranslate;
    this.wordType = wordType;
    this.wordTranslate = wordTranslate;
    this.textClass = '';
    if ((startText + endText + word).length > 84) {
      this.textClass = 'nanoSize';
    } else if ((startText + endText + word).length > 60) {
      this.textClass = 'microSize';
    } else if ((startText + endText + word).length > 35
            && (startText + endText + word).length <= 60) {
      this.textClass = 'smallSize';
    }
  }

    createCard = () => {
      const wordCard = document.createElement('div');
      wordCard.innerHTML = `
    <div class="card__wrapper">
        <div class="card__container">
            <img class="card__img" src="../../../assets/images/image-icon.png" alt="image">
            <div class="card__containerWrapper">
                <div class="card__text ${this.textClass}">
                    <div class="card__startText">${this.startText}</div>
                    <input class="card__input ${this.textClass}"/>
                    <div class="card__endText">${this.endText}</div>
                </div>
                <div class="card__translateText">${this.textTranslate}</div>
                <div class="card__wordType">${this.wordType}</div>
                <div class="card__handlers">
                    <div class="card__btnWrapper">
                        <div class="card__btn--Delete">Удалить</div> 
                        <div class="card__btn--Transfer">Перенести в "Сложное"</div> 
                    </div>
                    <div class="card__btn--ShowAnswer">Показать ответ</div> 
                </div>
            </div>
        </div>
        <div class="card__bottomContent">
            <div class="card__wordTranslate">${this.wordTranslate}</div>
            <div class="card__bottomContentBtn">
                <div class="card__bottomContentBtnTop">
                    <div class="card__bottomBtn--Again">Снова</div>
                    <div class="card__bottomBtn--Hard">Трудно</div>
                </div>
                <div class="card__bottomContentBtnBottom">
                    <div class="card__bottomBtn--Good">Хорошо</div>
                    <div class="card__bottomBtn--Easy">Легко</div>
                </div>
            </div>
        </div>
    </div>`;
      return wordCard;
    }
}

export default Card;

/*
Тестовые карточки разной длины;
      // const newCard = new Card({
      //   startText: 'I would like a room with a sea',
      //   endText: '.',
      //   word: 'view',
      //   textTranslate: 'Я бы хотел комнату с видом на море',
      //   wordType: 'сущ.ед.ч.',
      //   wordTranslate: 'вид, пейзаж',
      // });

      // const newCard = new Card({
      //   startText: 'I ',
      //   endText: 'would like a room with a sea view.',
      //   word: 'would',
      //   textTranslate: 'Я бы хотел комнату с видом на море',
      //   wordType: 'сущ.ед.ч.',
      //   wordTranslate: 'бы',
      // });

      // const newCard = new Card({
      //   startText: 'I ',
      //   endText: 'would liwwwww ule wouldlike wou like would like w a room with a sea view.',
      //   word: 'would',
      //   textTranslate: 'Я бы хотел комнату с видом на море',
      //   wordType: 'сущ.ед.ч.',
      //   wordTranslate: 'бы',
      // });
*/

import './card.scss';

const content = document.querySelector('.content');

class Card {
  constructor(startText, endText, word, textTranslate, wordType, wordTranslate) {
    this.startText = startText;
    this.endText = endText;
    this.word = word;
    this.textTranslate = textTranslate;
    this.wordType = wordType;
    this.wordTranslate = wordTranslate;
    // eslint-disable-next-line no-nested-ternary
    this.textClass = (startText + endText + word).length > 84 ? 'nanoSize' : (startText + endText + word).length > 60 ? 'microSize'
      : (startText + endText + word).length > 35 && (startText + endText + word).length <= 50 ? 'smallSize' : '';
  }

  createCard = () => {
    console.log(this.textClass);

    const wordCard = document.createElement('div');
    wordCard.innerHTML = `
    <div class="card__wrapper">
             <div class="card__container">
             <div class="card__containerWrapper">
                  <div class="card__text ${this.textClass}">
                        <div class="card__startText">${this.startText}</div>
                        <input class="card__input ${this.textClass}"/>
                         <div class="card__endText">${this.endText}</div>
                   </div>
                   <div class="card__translateText">${this.textTranslate}</div>
                   <div class="card__wordType">${this.wordType}</div>
                   <div class="card__handlers">
                       <div class="card_btnDelete">Удалить</div> 
                       <div class="card_btnTransfer">Перенести в "Сложное"</div> 
                       <div class="card_btnShowAnswer">Показать ответ</div> 
                   </div>
                </div>
     </div>
        <div class="card__wordTranslate">${this.wordTranslate}</div>
    </div>`;
    return wordCard;
  }
}

const newCard = new Card('I would like a room with a sea', '.', 'view', 'Я бы хотел комнату с видом на море', 'сущ.ед.ч.', 'вид, пейзаж');
const newCard2 = new Card('I ', 'would like a room with a sea view.', 'would', 'Я бы хотел комнату с видом на море', 'сущ.ед.ч.', 'бы');
const newCard3 = new Card('I ', 'would liwwwww ule wouldlike wou like would like w a room with a sea view.', 'would', 'Я бы хотел комнату с видом на море', 'сущ.ед.ч.', 'бы');

content.append(newCard.createCard());
// content.append(newCard2.createCard())
// content.append(newCard3.createCard())

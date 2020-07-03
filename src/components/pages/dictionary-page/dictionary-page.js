import './dictionary-page.scss';
import Card from './card';
import CardType from './card-type';

import Utils from '../../../services/Utils';

class Dictionary {
  view = `
  <section class="dictionary container">
    <nav class="dictionary__nav">
      <ul class="dictionary-menu">
        <li class="dictionary-menu__item" data-card-type="${CardType.LEARNING}">
          <a href="/#dictionary/learning-words">Изучаемые слова</a>
        </li>
        <li class="dictionary-menu__item" data-card-type="${CardType.HARD}">
          <a href="/#dictionary/hard-words">Сложные слова</a>
        </li>
        <li class="dictionary-menu__item" data-card-type="${CardType.DELETED}">
          <a href="/#dictionary/deleted-words">Удаленные слова</a>
        </li>
      </ul>
    </nav>
    <div class="dictionary__card-list"></div>
  </section>`;

  cardType = '';

  async render() {
    const request = Utils.parseRequestURL();

    this.cardType = CardType.LEARNING;

    if (request.id === 'hard-words') {
      this.cardType = CardType.HARD;
    }

    if (request.id === 'deleted-words') {
      this.cardType = CardType.DELETED;
    }

    return this.view;
  }

  async afterRender() {
    this.selectTab();

    let html = '';
    for (let i = 0; i < 9; i += 1) {
      const card = new Card(
        {
          _id: '5e9f5ee35eb9e72bc21af4a2',
          group: 0,
          page: 0,
          word: 'boat',
          image: 'files/01_0005.jpg',
          audio: 'files/01_0005.mp3',
          audioMeaning: 'files/01_0005_meaning.mp3',
          audioExample: 'files/01_0005_example.mp3',
          textMeaning: 'A <i>boat</i> is a vehicle that moves across water.',
          textExample: 'There is a small <b>boat</b> on the lake.',
          transcription: '[bout]',
          textExampleTranslate: 'На озере есть маленькая лодка',
          textMeaningTranslate: 'Лодка - это транспортное средство, которое движется по воде',
          wordTranslate: 'лодка',
          wordsPerExampleSentence: 8,
        },
        this.cardType,
      );

      html += card.render();
    }

    document.querySelector('.dictionary__card-list').innerHTML = html;
  }

  selectTab() {
    document
      .querySelector('.dictionary-menu')
      .querySelector(`li[data-card-type="${this.cardType}"]`)
      .classList
      .add('dictionary-menu__item--active');
  }
}

export default new Dictionary();

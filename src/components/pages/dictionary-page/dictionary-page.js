import './dictionary-page.scss';
import Card from './card';
import CardType from './card-type';

import Utils from '../../../services/Utils';

class Dictionary {
  view = `
  <section class="dictionary container">
    <nav class="dictionary__nav">
      <ul class="dictionary__menu">
        <li class="dictionary__menu__item">
          <a href="/#dictionary/learning-words">Изучаемые слова</a>
        </li>
        <li class="dictionary__menu__item">
          <a href="/#dictionary/hard-words">Сложные слова</a>
        </li>
        <li class="dictionary__menu__item">
          <a href="/#dictionary/deleted-words">Удаленные слова</a>
        </li>
      </ul>
    </nav>
    <div class="dictionary__card__list"></div>
  </section>`;

  tabId = 0;

  async render() {
    const request = Utils.parseRequestURL();

    if (request.id === 'deleted-words') {
      this.tabId = 2;
    } else if (request.id === 'hard-words') {
      this.tabId = 1;
    } else {
      this.tabId = 0;
    }

    return this.view;
  }

  async afterRender() {
    this.selectTab();

    const cardType = this.getCardType();

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
        cardType,
      );

      html += card.render();
    }

    document.querySelector('.dictionary__card__list').innerHTML = html;
  }

  getCardType() {
    if (this.tabId === 2) {
      return CardType.DELETED;
    }
    if (this.tabId === 1) {
      return CardType.HARD;
    }
    return CardType.LEARNING;
  }

  selectTab() {
    document
      .querySelector('.dictionary__menu')
      .querySelectorAll('li')[this.tabId]
      .classList
      .add('dictionary__menu__item--active');
  }
}

export default new Dictionary();

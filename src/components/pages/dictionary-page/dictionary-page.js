import './dictionary-page.scss';
import Card from './card';
import CardType from './card-type';

import Utils from '../../../services/Utils';
import UserService from '../../../services/UserService';
import AggregatedWordsFilter from '../../../services/AggregatedWordsFilter';
import state from '../../../common/state';

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

    const response = await UserService.getAggregatedWords(
      state.getUserId(),
      { filter: AggregatedWordsFilter.USER_WORD_NOT_NULL },
    );

    let html = '';
    const cards = response[0].paginatedResults.map((result) => {
      const card = new Card(result, this.cardType);
      html += card.render();
      return card;
    });

    document.querySelector('.dictionary__card-list').innerHTML = html;

    cards.forEach((card) => card.afterRender());
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

import './learn-word.scss';
import UserService from '../../../services/UserService';
import Card from '../dictionary-page/card';
// import AggregatedWordsFilter from '../../../services/AggregatedWordsFilter';
import state from '../../../common/state';

class LearnWord {
  constructor() {
    this.words = [];
    this.view = `
      <section class="learn-word container">
        <div class="learn-word-loader" id="learn-word-loader">Loading words...</div>  
        <div id="learn-word-card-holder" style="display: none">
          <div id="progress-bar">progress bar</div>
        </div>
      </section>
    `;
  }

  async render() {
    return this.view;
  }

  async afterRender() {
    const loader = document.getElementById('learn-word-loader');
    const cardHolder = document.getElementById('learn-word-card-holder');
    const progressBar = document.getElementById('progress-bar');

    UserService.getAggregatedWords(
      state.getUserId(),
      {
        // TODO add a filter
      },
    ).then((data) => {
      this.words = data[0].paginatedResults.map((w) => (!w.userWord ? { ...w, new: true } : w));
      loader.style.display = 'none';
      cardHolder.style.display = 'flex';
      const card = new Card(this.words[0], this.cardType);
      const template = document.createElement('template');
      template.innerHTML = card.render();
      cardHolder.insertBefore(template.content.firstElementChild, progressBar);
      card.afterRender(true);
    });
  }
}

export default new LearnWord();

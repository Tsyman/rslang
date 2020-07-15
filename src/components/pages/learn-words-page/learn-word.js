import './learn-word.scss';
import UserService from '../../../services/UserService';
// import AggregatedWordsFilter from '../../../services/AggregatedWordsFilter';
import state from '../../../common/state';

class LearnWord {
  constructor() {
    this.words = [];
    this.view = `
      <section class="learn-word container">
        <div class="learn-word-loader" id="learn-word-loader">Loading words...</div>  
        <div class="learn-word-card" id="learn-word-card" style="display: none">
          <div id="top-buttons-block">TOP BUTTONS</div>
          <span class="learn-word-text" id="learn-word-text">Some text</span>
          <hr>
          <span class="learn-word-text" id="learn-word-translation">Какой-то текст</span>      
          <div id="bottom-buttons-block">BOTTOM BUTTONS</div>
        </div>
        <span id="word-meaning">translation, meaning</span>
        <div id="progress-bar">progress bar</div>
      </section>
    `;
  }

  async render() {
    return this.view;
  }

  async afterRender() {
    const loader = document.getElementById('learn-word-loader');
    const card = document.getElementById('learn-word-card');
    UserService.getAggregatedWords(
      state.getUserId(),
      {
        // TODO add a filter
      },
    ).then((data) => {
      this.words = data[0].paginatedResults.map((w) => (!w.userWord ? { ...w, new: true } : w));
      loader.style.display = 'none';
      card.style.display = 'flex';
    });
  }
}

export default new LearnWord();

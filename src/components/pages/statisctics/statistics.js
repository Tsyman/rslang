import './statistics.scss';

class Statistics {
  constructor({
    cardCompleted, rightAnswers, newWords, longSeriesCorrectAnswers,
  }) {
    this.cardCompleted = cardCompleted;
    this.rightAnswers = rightAnswers;
    this.newWords = newWords;
    this.longSeriesCorrectAnswers = longSeriesCorrectAnswers;
  }

  view = '<section class="statistics"></section>';

  createStatistic = () => {
    const statistisLayout = document.querySelector('.statistics');

    if (statistisLayout) {
      statistisLayout.innerHTML = `
      <div class="wrapper__statistics">
          <div class="statistic">
              <div class="statistic__icon"><img src="../../../assets/images/statistics/gym__statistics.svg" alt="Gym image" class="statistic__image"></div>
              <h3 class="statistic__subtitle">Тренировка сегодня!</h3>
              <div class="statistic__container">
                  <span class="statistic__details">Карточек завершено:</span><h5 class="statististic__details--align_left">${this.cardCompleted}</h5><br>
                  <span class="statistic__details">Правильные ответы:</span><h5 class="statististic__details--align_left">${this.rightAnswers}</h5><br>
                  <span class="statistic__details">Новые слова: </span><h5 class="statististic__details--align_left">${this.newWords}</h5><br>
                  <span class="statistic__details">Самая длинная серия правильных ответов: </span><h5 class="statististic__details--align_left">${this.longSeriesCorrectAnswers}</h5>
              </div>
          </div>
          <div class="graph" id="graph__id">123123</div>
      </div> 
    `;
    }
  }

  async render() {
    return this.view;
  }

  async afterRender() {
    // apply data from API response
    this.cardCompleted = '10';
    this.rightAnswers = '10';
    this.newWords = '10';
    this.longSeriesCorrectAnswers = '30';
    this.createStatistic();
  }
}

export default new Statistics(
  {
    cardCompleted: '1',
    rightAnswers: '1',
    newWords: '2',
    longSeriesCorrectAnswers: '3',
  },
);

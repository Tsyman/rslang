import './statistics.scss';
import HttpService from '../../../services/HttpService';

class Statistics {
  constructor({
    cardCompleted, rightAnswers, newWords, longSeriesCorrectAnswers,
  }) {
    this.cardCompleted = cardCompleted;
    this.rightAnswers = rightAnswers;
    this.newWords = newWords;
    this.longSeriesCorrectAnswers = longSeriesCorrectAnswers;
    this.learnedWords = null;
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
          <div class="graph" id="graph__id"></div>
      </div> 
    `;
    }
  }

  createChartInStatistic = async () => {
    const stats = await HttpService.fetch(`/users/${localStorage.getItem('userId')}/statistics`, { method: 'GET' });
    const response = await stats.json();
    this.learnedWords = response.learnedWords;
    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

    const scriptBody = document.createElement('script');
    const scriptHead = document.createElement('script');
    scriptHead.src = 'https://www.gstatic.com/charts/loader.js';
    scriptHead.type = 'text/javascript';
    scriptBody.innerHTML = `
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Дата', 'Количество Слов'],
          ['${utc}',  0],
          ['2014',  ${this.learnedWords}],
          ['2014',  ${this.learnedWords + 50}],
        ]);

        var options = {
          title: 'Слов изучено',
          hAxis: {title: 'Дата',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };

      const chart = new google.visualization.LineChart(document.getElementById('graph__id'));
      chart.draw(data, options);
    }`;
    document.head.appendChild(scriptHead);
    scriptHead.addEventListener('load', () => {
      document.body.appendChild(scriptBody);
    });
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
    this.createChartInStatistic();
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

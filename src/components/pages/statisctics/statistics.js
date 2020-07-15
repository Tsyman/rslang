import './statistics.scss';
import SettingsService from '../../../services/SettingsService';
import state from '../../../common/state';

function formatDate(date) {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}

class Statistics {
  constructor() {
    this.cardCompleted = 0;
    this.rightAnswers = 0;
    this.newWords = 0;
    this.longSeriesCorrectAnswers = 0;
    this.daysDiff = 0;
    this.learnedWords = 0;
    this.wordsCount = 0;
    this.statistics = [
      ['Дата', 'Количество Слов'],
    ];
  }

  view = '<section class="statistics"></section>';

  createStatistic = () => {
    const statisticLayout = document.querySelector('.statistics');
    if (statisticLayout) {
      statisticLayout.innerHTML = `
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
    const stats = await SettingsService.get(state.getUserId());

    this.learnedWords = stats.learnedWords;

    this.statistics.push(
      [formatDate(stats.optional.registrationDate), 0],
    );

    if (stats.optional.wordsPerDay) {
      Object.keys(stats.optional.wordsPerDay).forEach((elem) => {
        this.wordsCount += stats.optional.wordsPerDay[elem];
        this.statistics.push(
          [formatDate(+elem), this.wordsCount],
        );
      });
    }

    const scriptBody = document.createElement('script');
    const scriptHead = document.createElement('script');
    scriptHead.src = 'https://www.gstatic.com/charts/loader.js';
    scriptHead.type = 'text/javascript';
    scriptBody.innerHTML = `
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable(
          ${JSON.stringify(this.statistics)}
        );
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
    this.cardCompleted = 0;
    this.rightAnswers = 0;
    this.newWords = 0;
    this.longSeriesCorrectAnswers = 0;
    this.createStatistic();
    this.createChartInStatistic();
  }
}

export default new Statistics();

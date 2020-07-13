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
          <div class="graph" id="graph__id"></div>
      </div> 
    `;
    }
  }

  createChartInStatistic = () => {
    const body = document.querySelector('body');
    const headLinkTag = document.querySelector('head > link');
    const chartLoader = '<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>';
    const chartOptions = `<script>
    console.log(1);
    google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawBackgroundColor);

function drawBackgroundColor() {
  const data = new google.visualization.DataTable();
  data.addColumn('number', 'Процент');
  data.addColumn('number', 'Всего слов');
  data.addRows([
    [0, 1676],
    [0.2, 181],
    [0.4, 4898],
    [0.75, 373],
    [0.8, 2678],
    [1, 2525],
  ]);

  const options = {
    hAxis: {
      scaleType: 'log',
      textStyle: {
        color: '#6B83B3',
        fontSize: 12,
        fontName: 'Rubik',
      },
    },
    vAxis: {
      textStyle: {
        color: '#6B83B3',
        fontSize: 12,
        fontName: 'Rubik',
      },
    },
    bar: { groupWidth: '90%' },
    backgroundColor: '#fffff',
    lineWidth: 5,
    crosshair: {
      color: '#01d',
      trigger: 'selection',
      orientation: 'vertical',
    },
    ticks: [0, 1000, 2000, 4000, 6000],
    color: '#00A8FF',
  };
  options.hAxis.format = 'percent';

  const chart = new google.visualization.LineChart(document.getElementById('graph__id'));
  chart.draw(data, options);
  chart.setSelection([{ row: 38, column: null }]);
}
    </script>`;
    if (headLinkTag) {
      headLinkTag.insertAdjacentHTML('afterend', chartLoader);
      body.insertAdjacentHTML('beforeend', chartOptions);
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

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

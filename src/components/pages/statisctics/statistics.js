import './statistics.scss';

class Statistics {
view = `
<section class="statistics">
<div class="wrapper__statistics">
    <div class="statistic">
        <div class="statistic__icon"><img src="../../../assets/images/statistics/gym__statistics.svg" alt="Gym image" class="statistic__image"></div>
        <h3 class="statistic__subtitle">Тренировка сегодня!</h3>
        <div class="statistic__container">
            <p class="statistic__details">Карточек завершено:<p class="statististic__details--align_left">1</p></p>
            <p class="statistic__details">Правильные ответы:<p class="statististic__details--align_left">1</p></p>
            <p class="statistic__details">Новые слова:</p><p class="statististic__details--margin_left">1</p>
            <p class="statistic__details">Самая длинная серия правильных ответов: </p><p class="statististic__details--margin_left">1</p>
        </div>
    </div>
    <div class="graph"></div>
</div>
</section>
        `;

async render() {
  return this.view;
}
// async afterRender() {}
}

export default new Statistics();

import './stat-page.scss';

class StatPage {
  view = `
      <section class="section-promo">
        <div class="container">
          <div class="promo-wrapper promo">
            <div class="promo-wrapper-1">
              <h1 class="promo__title">Добро пожаловать в онлайн-школу английского языка - RS Lang</h1>
              <a class="btn promo__link-blue">Сделать первый шаг!</a>
            </div>
            <div class="promo-wrapper-2">
              <iframe class="promo__video" src="https://www.youtube.com/embed/5qap5aO4i9A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </section>
      <section class="vocabulary">
        <div class="container">
          <div class="vocabulary-inner">
            <div class="vocabulary-inner-1">
              <h2 class="vocabulary__title">Словари под рукой!</h2>
              <p class="vocabulary__text">Изучайте новое и стремитесь к лучшему!</p>
              <a class="vocabulary-blue">Начать!</a>
            </div>
            <div class="vocabulary-inner-2">
              <ul class="vocabulary__list">
                <li class="vocabulary__item"><p class="vocabulary__item-text">Изучаемые слова</p></li>
                <li class="vocabulary__item vocabulary__item-end"><p class="vocabulary__item-text">Сложные словa</p></li>
                <li class="vocabulary__item"><p class="vocabulary__item-text">Удаленные слова</p></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section class="section-game">
        <div class="container">
          <div class="game-wrapper">
            <h2 class="game__title">Наши игры</h2>
            <a class="game__blue">Играть</a>
          </div>
          <ul class="game__list">
            <li class="game__item"><a class="game__link">SpeakIt</a></li>
            <li class="game__item"><a class="game__link">English Puzzle</a></li>
            <li class="game__item"><a class="game__link">Саванна</a></li>
            <li class="game__item"><a class="game__link">Аудиовызов</a></li>
            <li class="game__item"><a class="game__link">Спринт</a></li>
            <li class="game__item"><a class="game__link">Своя игра</a></li>
          </ul>
        </div>
      </section>
      <section class="section-interval">
        <div class="container">
          <div class="interval-wrapper">
            <div class="interval">
              <h2 class="interval__title">Запоминайте новые слова по методике интервального повторения</h2>
            </div>
            <div class="interval__inner">
              <ul class="interval__list">
                <li class="interval__item interval__item--blue"> 
                  <p class="interval__text">< 10 минут</p>
                  <a class="interval__link">Снова!</a>
                </li>
                <li class="interval__item interval__item--red">
                  <p class="interval__text">13 дней</p>
                  <a class="interval__link">Трудно</a>
                </li>
                <li class="interval__item interval__item--green">
                  <p class="interval__text">5 недель</p>
                  <a class="interval__link">Хорошо</a>
                </li>
                <li class="interval__item interval__item--dark-blue">
                  <p class="interval__text">3 месяца</p>
                  <a class="interval__link">Легко</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section class="section-statistics">
        <div class="container">
          <div class="statistic__wrapper">
            <h2 class="statistic__title">Отслеживайте результат</h2>
            <p class="statistic__text">Увеличьте продуктивность и дисплину!</p>
            <a class="statistic__link">Начать!</a>
          </div>
        </div>

      </section>
        `;

  async render() {
    return this.view;
  }
}

export default new StatPage();

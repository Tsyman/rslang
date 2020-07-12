import './stat-page.scss';

class StatPage {
  header = null;

  footer = null;

  view = `
          <section class="promo">
            <div class="promo__container">
              <div class="promo__wrapper">
                <div class="promo__wrapper-1">
                  <h1 class="promo__title">Добро пожаловать в онлайн-школу английского языка - RS Lang</h1>
                  <a class="promo__link-blue" href="/#login">Сделать первый шаг!</a>
                </div>
                <div class="promo__wrapper-2">
                  <iframe class="promo__video" src="https://www.youtube.com/embed/5qap5aO4i9A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </section>
          <section class="vocabulary">
            <div class="promo__container">
              <div class="vocabulary__inner">
                <div class="vocabulary__inner-1">
                  <h2 class="vocabulary__title">Словари под рукой!</h2>
                  <p class="vocabulary__text">Изучайте новое и стремитесь к лучшему!</p>
                  <a class="vocabulary__link-blue" href="/#login">Начать!</a>
                </div>
                <div class="vocabulary__inner-2">
                  <ul class="vocabulary__list">
                    <li class="vocabulary__item">
                      <p class="vocabulary__heading">Изучаемые слова</p>
                    </li>
                    <li class="vocabulary__item vocabulary__item-end">
                      <p class="vocabulary__heading">Сложные словa</p>
                    </li>
                    <li class="vocabulary__item">
                      <p class="vocabulary__heading">Удаленные слова</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section class="game">
            <div class="promo__container">
              <div class="game__wrapper">
                <h2 class="game__title">Наши игры</h2>
                <a class="game__link-blue" href="/#games">Играть</a>
              </div>
              <ul class="game__list">
                <li class="game__item">
                <img class="game__img speakit" src="../../../../assets/images/speakit.svg">
                <a class="game__link">SpeakIt</a>
                </li>
                <li class="game__item">
                <img class="game__img puzzle" src="../../../../assets/images/puzzle.svg">
                <a class="game__link">English Puzzle</a>
                </li>
                <li class="game__item">
                <img class="game__img savanna" src="../../../../assets/images/savanna.svg">
                  <a class="game__link">Саванна</a>
                </li>
                <li class="game__item">
                <img class="game__img audio-choice" src="../../../../assets/images/audio-choice.svg">
                  <a class="game__link">Аудиовызов</a>
                </li>
                <li class="game__item">
                  <img class="game__img sprint" src="../../../../assets/images/sprint.svg">
                  <a class="game__link">Спринт</a>
                </li>
                <li class="game__item">
                  <img class="game__img our-game" src="../../../../assets/images/our-game.svg">
                  <a class="game__link">Своя игра</a>
                </li>
              </ul>
            </div>
          </section>
          <section class="interval">
            <div class="promo__container">
              <div class="interval__wrapper">
                <div class="interval__heading">
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
          <section class="statistics">
            <div class="promo__container">
              <div class="statistic__wrapper">
                <h2 class="statistic__title">Отслеживайте результат</h2>
                <p class="statistic__text">Увеличьте продуктивность и дисплину!</p>
                <a class="statistic__link" href="/#login">Начать!</a>
              </div>
            </div>
          </section>
        `;

  async render() {
    return this.view;
  }

  afterRender() {
    this.header = document.getElementById('header_container');
    this.footer = document.getElementById('footer_container');
    document.querySelector('.promo__link-blue').addEventListener('click', () => {
      this.header.style.display = 'none';
      this.footer.style.display = 'none';
    });
    document.querySelector('.vocabulary__link-blue').addEventListener('click', () => {
      this.header.style.display = 'none';
      this.footer.style.display = 'none';
    });
    document.querySelector('.statistic__link').addEventListener('click', () => {
      this.header.style.display = 'none';
      this.footer.style.display = 'none';
    });
  }
}

export default new StatPage();

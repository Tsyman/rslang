import './our-games-page.scss';

class OurGames {
  view = `
    <section class="games">
      <div class="games__container">
        <div class="games__wrapper">
          <h2 class="games__title">Наши игры</h2>
        </div>
        <ul class="games__list">
          <li class="games__item">
            <a class="games__link" href="/#speakit">
              <img class="games__img speakit" src="../../../../assets/images/speakit.svg">
              <p class="games__text">SpeakIt</p>
            </a>
          </li>
          <li class="games__item">
            <a class="games__link" href="/#puzzle">
              <img class="games__img puzzle" src="../../../../assets/images/puzzle.svg">
              <p class="games__text">English Puzzle</p>
            </a>
          </li>
          <li class="games__item">
            <a class="games__link" href="/#savanna">
            <img class="games__img savanna" src="../../../../assets/images/savanna.svg">
            <p class="games__text">Саванна</p>
            </a>
          </li>
          <li class="games__item">
            <a class="games__link" href="/#audiocall">
              <img class="games__img" src="../../../../assets/images/audio-choice.svg">
              <p class="games__text">Аудиовызов</p>
            </a>
          </li>
          <li class="games__item">
            <a class="games__link" href="/#sprint">
              <img class="games__img sprint" src="../../../../assets/images/sprint.svg">
              <p class="games__text">Спринт</p>
            </a>
          </li>
          <li class="games__item">
            <a class="games__link" href="/#our-game">
              <img class="games__img our-game" src="../../../../assets/images/our-game.svg">
              <p class="games__text">Своя игра</p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  `;

  render() {
    return this.view;
  }
}

export default new OurGames();

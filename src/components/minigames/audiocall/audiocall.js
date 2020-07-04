import './audiocall.scss';

class Audiocall {
  audioCallContainer = null;

  startGameButton = null;

  mainGamePage = '<div>Game</div>';

  constructor() {
    this.goToMainGamePage = this.goToMainGamePage.bind(this);
  }

  view = `
          <section id="audio-call-container">
            <div id="start-game-button">Start</div>
          </section>
        `;

  async render() {
    return this.view;
  }

  async afterRender() {
    this.audioCallContainer = document.getElementById('audio-call-container');
    this.startGameButton = document.getElementById('start-game-button');
    this.startGameButton.addEventListener('click', this.goToMainGamePage);
  }

  goToMainGamePage() {
    this.audioCallContainer.innerHTML = this.mainGamePage;
  }
}

export default new Audiocall();

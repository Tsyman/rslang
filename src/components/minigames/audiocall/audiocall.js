import './audiocall.scss';

class Audiocall {
  view = `
        <footer class="footer">
          <div class="container">
              <p class="footer__text">
                <a href="https://rollingscopes.com/" class="footer__link">RS School</a> © 2020. Все права сохранены.
              </p>
          </div>
        </footer>
        `;

  async render() {
    return this.view;
  }
}

export default new Audiocall();

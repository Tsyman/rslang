import './footer.scss';

class Footer {
  view = `
        <footer class="footer">
          <div class="footer__container">
              <p class="footer__text">
                <a href="https://rs.school/" class="footer__link">RS School</a> © 2020. Все права сохранены.
              </p>
          </div>
        </footer>
        `;

  async render() {
    return this.view;
  }
}

export default new Footer();

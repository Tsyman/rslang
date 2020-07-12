import './main-page.scss';
import HeaderMain from '../../shared/layout/header/header-main/header-main';

class MainPage {
  headerMain = null;

  view = `
    <div id="header_container-main"></div>
    <section class="section-main-page">
      <div class="section-main-page__banner">
        Hello, <span id="section-main-page--name"> Someone</span>! Давай заниматься.
        <div class="section-main-page__banner--icon">
        </div>
      </div>
      <div class="section-main-page__menu">
        <div class="section-main-page__menu--start-studying">
          <div class="section-main-page__menu--start-studying-text">
            Good evening! - Добрый вечер!
          </div>
          <div class="btn btn--animated btn--blue">
            Выучить пару английских слов
          </div>
        </div>
        <div class="section-main-page__menu--statistics">
          <div class="section-main-page__menu--statistics-heading">
            Статистика
          </div>
          <div class="section-main-page__menu--statistics-text">
            Похоже, что вы только что зарегистрировались или очень давно не занимались
          </div>
          <div class="btn btn--animated btn--green" id="go-play-button">
            Го играть!
          </div>
          <div class="section-main-page__menu--statistics-icon">
          </div>
        </div>
      </div>
    </section>
  `;

  async render() {
    return this.view;
  }

  async afterRender() {
    this.headerMain = document.getElementById('header_container-main');
    this.headerMain.innerHTML = await HeaderMain.render();
    await HeaderMain.afterRender();
  }
}

export default new MainPage();

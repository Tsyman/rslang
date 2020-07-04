import './main-page.scss';
import HeaderMain from '../../shared/layout/header/header-main/header-main';

class MainPage {
  headerMain = null;

  view = `
        <div id="header_container-main"></div>
        
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

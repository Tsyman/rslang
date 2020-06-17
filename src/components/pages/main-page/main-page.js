import './main-page.scss';

class MainPage {
  view = `
            <section class="section">
                <h1> Main Page </h1>
            </section>
        `;

  async render() {
    return this.view;
  }
  // async afterRender() {}
}

export default new MainPage();

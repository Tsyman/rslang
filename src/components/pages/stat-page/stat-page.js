class StatPage {
  view = `
            <section class="section">
                <h1> Stat Page </h1>
            </section>
        `;

  async render() {
    return this.view;
  }
}

export default new StatPage();

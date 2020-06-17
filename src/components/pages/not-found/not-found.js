class NotFound {
  view = `
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `;

  async render() {
    return this.view;
  }
}

export default new NotFound();

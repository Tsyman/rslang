class Footer {
  view = `
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    This is my foot. There are many like it, but this one is mine.
                </p>
            </div>
        </footer>
        `;

  async render() {
    return this.view;
  }
}

export default new Footer();

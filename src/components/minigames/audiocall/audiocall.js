import './audiocall.scss';

class Audiocall {
  view = `
        Hello World!
        `;

  async render() {
    return this.view;
  }
}

export default new Audiocall();

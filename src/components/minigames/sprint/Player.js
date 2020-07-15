class Player {
  constructor(el) {
    this.el = el;
  }

  play(src) {
    this.el.src = src;

    this.el.load();
    this.el.currentTime = 0;
    this.el.play();
  }
}

export default Player;

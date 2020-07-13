import './header.scss';

class Header {
  constructor() {
    this.items = null;
    this.activeItemClass = '';
    this.view = () => '';
  }

  async render() {
    return this.view();
  }

  afterRender = async () => {};

  changeActiveItem() {
    this.items.forEach((element) => {
      element.classList.remove(this.activeItemClass);
    });
  }
}

export default Header;

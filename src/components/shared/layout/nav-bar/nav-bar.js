import './nav-bar.scss';

class NavBar {
  message = 'after render';

  view = `
             <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="container">
                    <div id="navbarBasicExample" class="navbar__menu is-active" aria-expanded="false">
                        <div class="navbar-start">
                            <a class="navbar-item" href="/#/">
                                Main
                            </a>
                            <a class="navbar-item" href="/#stat">
                                Stat
                            </a>
                            <a class="navbar-item" href="/#/other">
                                Other
                            </a>
                        </div>
                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div class="buttons">
                                    <a class="button is-primary" href="/#login">
                                        <strong>Sign up</strong>
                                    </a>
                                    <a class="button is-light">
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;

  async render() {
    return this.view;
  }

  async afterRender() {
    console.log(this.message);
    document.querySelector('.button.is-primary').addEventListener('click', () => {
      document.getElementById('header_container').style.display = 'none';
      document.getElementById('footer_container').style.display = 'none';
    });
  }
}

export default new NavBar();

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
                            <a class="navbar-item" id="open-popup">Open Popup</a>
                        </div>
                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div class="buttons">
                                    <a class="button is-primary" href="/#/register">
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
  }
}

export default new NavBar();

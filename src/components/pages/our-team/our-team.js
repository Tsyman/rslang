import './our-team.scss';

class OurTeam {
  view = `
            <section class="section">
                <h1> Our_teams fas </h1>
            </section>
        `;

  async render() {
    return this.view;
  }
  // async afterRender() {}
}

export default new OurTeam();

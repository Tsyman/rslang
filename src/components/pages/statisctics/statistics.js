import './statistics.scss';

class Statistics {
view = `
<section class="Our-team">
<div class="container">
  <h1>Наша команда</h1>
  
</div>
</section>
        `;

async render() {
  return this.view;
}
// async afterRender() {}
}

export default new Statistics();

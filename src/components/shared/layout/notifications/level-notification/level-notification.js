import './level-notification.scss';

class LevelNotification {
  buttonLevelNotification = null;

  levelNotificationWrapper = null;

  constructor() {
    this.closeButtonLevelNavigation = this.closeButtonLevelNavigation.bind(this);
  }

  view = `
      <section class="level-notification">
        <div class="level-notification__overlay">
        <div class="level-notification__modal">
          <div class="level-notification__wrapper">
            <img src="../../../../../assets/images/notification/level-notification.svg" class="level-notification__img">
            <p class="level-notification__heading">Уровни изучения RS Lang</p>
            <p class="level-notification__text">В алгоритме RS Lang применяется методика интервальных повторений, в рамках которой слова для упражнений отображаются чаще, поэтому результаты по вышеуказанной шкале могут улучшаться и ухудшаться со временем.</p>
            <p class="level-notification__sub-text">Упражняйтесь как можно чаще, и всегда прилагайте максимум усилий, чтобы ответить правильно.</p>
            <div class="level-notification__inner"> 
              <img src="../../../../../assets/images/notification/level-1.svg" class="level-notification__icon">
              <p class="level-notification__title">У вас прекрасная память!</p>
            </div>
            <div class="level-notification__inner"> 
              <img src="../../../../../assets/images/notification/level-2.svg" class="level-notification__icon">
              <p class="level-notification__title">Это слово так и вертится у вас на языке!</p>
            </div>
            <div class="level-notification__inner"> 
              <img src="../../../../../assets/images/notification/level-3.svg" class="level-notification__icon">
              <p class="level-notification__title">Вы в процессе запоминания этого слова.</p>
            </div>
            <div class="level-notification__inner"> 
              <img src="../../../../../assets/images/notification/level-4.svg" class="level-notification__icon">
              <p class="level-notification__title">Это слово нужно подучить.</p>
            </div>
            <div class="level-notification__inner"> 
              <img src="../../../../../assets/images/notification/level-5.svg" class="level-notification__icon">
              <p class="level-notification__title">Новое слово! Вам оно еще не встречалось.</p>
            </div>
            <a class="level-notification__link">Понятно</a>
          </div>
        </div>
        </div>
      </section>
        `;

  async render() {
    return this.view;
  }

  async afterRender() {
    this.buttonLevelNotification = document.querySelector('.level-notification__link');
    this.levelNotificationWrapper = document.querySelector('.level-notification');
    this.buttonLevelNotification.addEventListener('click', this.closeButtonLevelNavigation);
  }

  closeButtonLevelNavigation() {
    this.levelNotificationWrapper.style.display = 'none';
  }
}

export default new LevelNotification();

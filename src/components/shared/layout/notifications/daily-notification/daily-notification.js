import './daily-notification.scss';

class DailyNotification {
  view = `
      <section class="daily-notification">
        <div class="daily-notification__overlay">
        <div class="daily-notification__modal">
          <div class="daily-notification__wrapper">
            <img src="../../../../../assets/images/notification/daily-notification-icon.svg" class="daily-notification__img">
            <p class="daily-notification__heading">Ура! На сегодня всё.</p>
            <p class="daily-notification__text">Есть ещё новые карточки, но дневной лимит исчерпан. Вы можете увеличить лимит в настройках, но, пожалуйста, имейте в виду, что чем больше новых карточек вы просмотрите, тем больше вам надо будет повторять в ближайшее время.</p>
            <a href="/#main" class="daily-notification__link">все понятно</a>
          </div>
        </div>
        </div>
      </section>
        `;

  async render() {
    return this.view;
  }

  async afterRender() {
    return this;
  }
}

export default new DailyNotification();

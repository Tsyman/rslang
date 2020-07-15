import './our-team.scss';

class OurTeam {
view = `
      <section class="our-team">
        <div class="our-team__container">
            <h2 class="wrapper__title">Наша команда</h2>
            <div class="our-team-wrapper">
              <div class="our-team-wrapper__item">
                <div class="our-team-icon">
                  <div class="our-team-icon__image our-team-icon__image--vlad"></div>
                </div>
                <div class="our-team-wrapper__info">
                  <h3 class="our-team-wrapper__title">
                    <a class="our-team-wrapper__link" href="https://github.com/vladboisa" target="_blank" rel="noopener noreferrer" alt = "Github account">Влад Бойса</a>
                  </h3>
                  <p class="our-team-wrapper__description">Трудился над страницами: команда и статистика, мини-игра "Speakit".</p>
                  <div class="our-team-socialmedia">
                    <a href="https://github.com/vladboisa" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/git-icon.svg" alt="Linkedin account">
                    </a>
                    <a href="https://t.me/Vladislav_32pc" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/telegram-icon.svg" alt="Telegram account">
                    </a>
                    <a href="https://www.linkedin.com/in/vlad-boisa-608019199/" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/linkedIn-ico.svg" alt="Linkedin account">
                    </a>
                  </div>
                </div>
              </div>
              <div class="our-team-wrapper__item">
                <div class="our-team-icon">
                  <div class="our-team-icon__image our-team-icon__image--maxim"></div>
                </div>
                <div class="our-team-wrapper__info">
                  <h3 class="our-team-wrapper__title">
                    <a class="our-team-wrapper__link" href="https://github.com/Tsyman" target="_blank" rel="noopener noreferrer" alt = "Github account">Максим Цыманович</a>
                  </h3>
                  <p class="our-team-wrapper__description">Сделал страницу регистрации/авторизации, мини-игру Саванна, статистику.</p>
                  <div class="our-team-socialmedia">
                    <a href="https://t.me/Tsyman23" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/telegram-icon.svg" alt="Telegram account">
                    </a>
                    <a href="https://github.com/Tsyman" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/linkedIn-ico.svg" alt="Linkedin account">
                    </a>
                  </div>
                </div>
              </div>
              <div class="our-team-wrapper__item">
                <div class="our-team-icon">
                  <div class="our-team-icon__image our-team-icon__image--sergey"></div>
                </div>
                <div class="our-team-wrapper__info">
                  <h3 class="our-team-wrapper__title"><a class="our-team-wrapper__link" href="https://github.com/Sergey0s" target="_blank" rel="noopener noreferrer" alt = "Github account">Сергей Осипов</a></h3>
                  <p class="our-team-wrapper__description">Добавил карточку слова, мини-игры "Саванна" и "Speakit".</p>
                  <div class="our-team-socialmedia">
                    <a href="https://github.com/Sergey0s" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/linkedIn-ico.svg" alt="Linkedin account">
                    </a>
                  </div>
                </div>
              </div>
              <div class="our-team-wrapper__item">
                <div class="our-team-icon">
                  <div class="our-team-icon__image our-team-icon__image--maria"></div>
                </div>
                <div class="our-team-wrapper__info">
                  <h3 class="our-team-wrapper__title"><a class="our-team-wrapper__link" href="https://github.com/MariaSyrokvash" target="_blank" rel="noopener noreferrer" alt = "Github account">Мария Сырокваш</a></h3>
                  <p class="our-team-wrapper__description">Нарисовала макет приложения, работала над промо-страницей и мини-игрой "Аудиовызов".</p>
                  <div class="our-team-socialmedia">
                    <a href="https://t.me/MariyaSyrokvash" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/telegram-icon.svg" alt="Telegram account">
                    </a>
                    <a href="https://github.com/MariaSyrokvash" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/linkedIn-ico.svg" alt="Linkedin account">
                    </a>
                  </div>
                </div>
              </div>
              <div class="our-team-wrapper__item">
                <div class="our-team-icon">
                  <div class="our-team-icon__image our-team-icon__image--anzhelika"></div>
                </div>
                <div class="our-team-wrapper__info">
                  <h3 class="our-team-wrapper__title">
                    <a class="our-team-wrapper__link" href="https://github.com/drnaida" target="_blank" rel="noopener noreferrer" alt = "Github account">Анжелика Курникова</a>
                  </h3>
                  <p class="our-team-wrapper__description">Добавила домашную страницу, а также настройки приложения и мини-игра "Аудиовызов".</p>
                  <div class="our-team-socialmedia">
                    <a href="https://github.com/drnaida" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/git-icon.svg" alt="Linkedin account">
                    </a>
                    <a href="https://t.me/drnaida" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/telegram-icon.svg" alt="Telegram account">
                    </a>
                    <a href=" https://www.linkedin.com/in/anzhelika-kurnikova/" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/linkedIn-ico.svg" alt="Linkedin account">
                    </a>
                  </div>
                </div>
              </div>
              <div class="our-team-wrapper__item">
                <div class="our-team-icon">
                  <div class="our-team-icon__image our-team-icon__image--artem"></div>
                </div>
                <div class="our-team-wrapper__info">
                  <h3 class="our-team-wrapper__title"><a class="our-team-wrapper__link" href="https://github.com/artemStaskevich" target="_blank" rel="noopener noreferrer" alt = "Github account">Артем Стаськевич</a></h3>
                  <p class="our-team-wrapper__description">Работал над страницей словаря. Сделал мини-игру "Спринт".</p>
                  <div class="our-team-socialmedia">
                    <a href="https://github.com/artemStaskevich" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/git-icon.svg" alt="Linkedin account">
                    </a>
                  </div>
                </div>
              </div>
              <div class="our-team-wrapper__item">
                <div class="our-team-icon">
                  <div class="our-team-icon__image our-team-icon__image--yura"></div>
                </div>
                <div class="our-team-wrapper__info">
                  <h3 class="our-team-wrapper__title">
                    <a class="our-team-wrapper__link" href="https://github.com/Student-Java" target="_blank" rel="noopener noreferrer" alt = "Github account">Юрий Student-Java</a>
                  </h3>
                  <p class="our-team-wrapper__description">Настроил backend и внутренние процессы в команде. Реализовал страницу обучения новых слов.</p>
                  <div class="our-team-socialmedia">
                    <a href="https://github.com/Student-Java" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/git-icon.svg" alt="Linkedin account">
                    </a>
                  </div>
                </div>
              </div>
              <div class="our-team-wrapper__item">
                <div class="our-team-icon">
                  <div class="our-team-icon__image our-team-icon__image--valeria"></div>
                </div>
                <div class="our-team-wrapper__info">
                  <h3 class="our-team-wrapper__title">
                    <a class="our-team-wrapper__link" href="https://github.com/valeriya-yavorskaya" target="_blank" rel="noopener noreferrer" alt = "Github account">Валерия Яворская</a>
                  </h3>
                  <p class="our-team-wrapper__description">Наладила командую работу. Ментор RS School.</p>
                  <div class="our-team-socialmedia">
                    <a href="https://github.com/valeriya-yavorskaya" target="_blank" rel="noopener noreferrer">
                      <img class="our-team-socialmedia__icon" src="../../../assets/images/our-team/socialmedia/git-icon.svg" alt="Linkedin account">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        `;

async render() {
  return this.view;
}
// async afterRender() {}
}

export default new OurTeam();

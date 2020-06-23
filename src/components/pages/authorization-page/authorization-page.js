import './authorization-page.scss';
import createUser from './createUser';
import signInUser from './singInUser';

class AuthorizationPage {
  constructor() {
    this.flag = true;
    this.changeForm = this.changeForm.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  view = `
    <div class="container">
      <button class="return-button">&#10132;</button>
      <div class="form__container">
        <form class="form">
          <div class="form-header">
            <a href="https://rs.school"><img src="../../../assets/images/RS-Logo.png" class="form-header-icon"></a>
          </div>
          <div class="form-body">
            <p class="form-name">Создать аккаунт</p>
            <div class="name__inner">
              <label class="label-name" for="name"></label>
              <input class="input input-name" type="text" placeholder="Имя" name="name" id="name"
              pattern="([A-Za-z\\sА-Яа-яЁё0-9.])+" title="Введите имя" minlength="3" maxlength="20"
              >
            </div>
            <div class="email__inner">
              <label class="label-email" for="email"></label>
              <input class="input input-email" type="text" placeholder="Электронная почта" title="Введите почту" name="email" id="email" required>
            </div>
            <div class="password__inner">
              <label class="label-password" for="password"></label>
              <input class="input input-password" type="password" placeholder="Пароль" name="password" id="password" required 
              pattern="^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!'#\\$%&'\\(\\)\\*\\+,-\\.\\/:;<=>\\?@[\\]\\^_'\\{\\|}~])[a-zA-Z0-9!'#\\$%&'\\(\\)\\*\\+,-\\.\\/:;<=>\\?@[\\]\\^_'\\{\\|}~]{8,}$"
                title="Пароль должен содержать не менее 8 символов, как минимум одну прописную букву, одну заглавную букву, одну цифру и один спецсимвол из +-_@$!%*?&#.,;:[]{}" 
              >
            </div>
          <button type="submit" class="submit-button">Создать аккаунт</button>
          </div>
          <div class="form-footer">
            <p>Уже есть аккаунт?</p>
            <button type="button">Войти</button>
          </div>
        </form>
      </div>
    </div>
  `;

  addListeners() {
    document.querySelector('.form').addEventListener('submit', this.submitHandler);
    document.querySelector('.form-footer button').addEventListener('click', this.changeForm);
  }

  changeForm() {
    document.querySelector('.form-name').innerHTML = !this.flag ? 'Создать аккаунт' : 'Войти';
    document.querySelector('.name__inner').classList.toggle('disabled');
    document.querySelector('.submit-button').innerHTML = !this.flag ? 'Создать аккаунт' : 'Войти';
    document.querySelector('.form-footer p').innerHTML = !this.flag ? 'Уже есть аккаунт?' : 'Нет аккаунта?';
    document.querySelector('.form-footer button').innerHTML = !this.flag ? 'Войти' : 'Создать';
    this.flag = !this.flag;
  }

  submitHandler(event) {
    if (document.querySelector('.form').checkValidity()) {
      event.preventDefault();
      const userName = document.querySelector('.input-name').value;
      const userEmail = document.querySelector('.input-email').value;
      const userPassword = document.querySelector('.input-password').value;
      if (this.flag) {
        createUser({ email: userEmail, password: userPassword })
          .then(() => {
            signInUser({ email: userEmail, password: userPassword })
              .then((data) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userID', data.userId);
                localStorage.setItem('token', userName);
              });
          });
      } else {
        signInUser({ email: userEmail, password: userPassword })
          .then((data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('token', data.userId);
          });
      }
      document.querySelector('.form').reset();
    }
  }

  async render() {
    return this.view;
  }
}

export default new AuthorizationPage();

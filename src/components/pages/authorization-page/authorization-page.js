import './authorization-page.scss';
import userRequest from '../../../services/userRequest';
import extractTokenExpiration from './tokenHandling/decodeToken';
import timestamp from './tokenHandling/formattedTime';

class AuthorizationPage {
  constructor() {
    this.errorMessage = null;
    this.flag = true;
    this.tooltipTime = 3000;
    this.changeForm = this.changeForm.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.keyNames = {
      token: 'token',
      userId: 'userId',
      userName: 'userName',
      tokenEndTime: 'tokenEndTime',
    };
    this.paths = {
      createUser: 'users',
      signInUser: 'signin',
    };
  }

  view = `
    <div class="authorization-page__container">
      <button class="return-button" type="submit" onClick="location.href='/#/'">&#10132;</button>
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
              <input class="input input-email" type="email" placeholder="Электронная почта" title="Введите почту" name="email" id="email" required>
            </div>
            <div class="password__inner">
              <label class="label-password" for="password"></label>
              <input class="input input-password" type="password" placeholder="Пароль" name="password" id="password" required 
              pattern="^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!'#\\$%&'\\(\\)\\*\\+,-\\.\\/:;<=>\\?@[\\]\\^_'\\{\\|}~])[a-zA-Z0-9!'#\\$%&'\\(\\)\\*\\+,-\\.\\/:;<=>\\?@[\\]\\^_'\\{\\|}~]{8,}$"
                title="Пароль должен содержать не менее 8 символов, как минимум одну прописную букву, одну заглавную букву, одну цифру и один спецсимвол из +-_@$!%*?&#.,;:[]{}" 
              >
            </div>
          <div class="submit-button__inner">
            <button type="submit" class="submit-button">Создать аккаунт</button>
            <span class="tooltip"></span>
          </div>
          </div>
          <div class="form-footer">
            <p>Уже есть аккаунт?</p>
            <button type="button">Войти</button>
          </div>
        </form>
      </div>
    </div>
  `;

  changeForm() {
    document.querySelector('.form-name').textContent = !this.flag ? 'Создать аккаунт' : 'Войти';
    document.querySelector('.name__inner').classList.toggle('disabled');
    document.querySelector('.submit-button').textContent = !this.flag ? 'Создать аккаунт' : 'Войти';
    document.querySelector('.form-footer p').textContent = !this.flag ? 'Уже есть аккаунт?' : 'Нет аккаунта?';
    document.querySelector('.form-footer button').textContent = !this.flag ? 'Войти' : 'Создать';
    this.flag = !this.flag;
  }

  registerUserForm(mail, pass, name) {
    userRequest({ email: mail, password: pass }, this.paths.createUser)
      .then(() => {
        userRequest({ email: mail, password: pass }, this.paths.signInUser)
          .then((response) => {
            if (response.status.toString().charAt(0) === '5') {
              this.errorMessage = 'Проблемы с сервером';
            }
            return response.json();
          })
          .then((data) => {
            localStorage.setItem(this.keyNames.userName, name);
            this.afterSignIn(data);
          });
      }).catch(() => {
        document.querySelector('.tooltip').textContent = this.errorMessage;
        document.querySelector('.tooltip').classList.add('tooltip--active');
        setTimeout(() => {
          document.querySelector('.tooltip').classList.remove('tooltip--active');
          this.errorMessage = '';
          document.querySelector('.tooltip').textContent = this.errorMessage;
        }, this.tooltipTime);
      });
  }

  signInUserForm(mail, pass) {
    userRequest({ email: mail, password: pass }, this.paths.signInUser)
      .then((response) => {
        if (response.status === 403) {
          this.errorMessage = 'Неверная почта или пароль';
        } else if (response.status === 404) {
          this.errorMessage = 'Такого пользователя не существует';
        } else if (response.status.toString().charAt(0) === '5') {
          this.errorMessage = 'Проблемы с сервером';
        }
        return response.json();
      })
      .then((data) => {
        this.afterSignIn(data);
      })
      .catch(() => {
        document.querySelector('.tooltip').textContent = this.errorMessage;
        document.querySelector('.tooltip').classList.add('tooltip--active');
        setTimeout(() => {
          document.querySelector('.tooltip').classList.remove('tooltip--active');
          this.errorMessage = '';
          document.querySelector('.tooltip').textContent = this.errorMessage;
        }, this.tooltipTime);
      });
  }

  afterSignIn(data) {
    localStorage.setItem(this.keyNames.token, data.token);
    localStorage.setItem(this.keyNames.userId, data.userId);
    localStorage.setItem(
      this.keyNames.tokenEndTime,
      timestamp(extractTokenExpiration(data.token)),
    );
    document.querySelector('.form').reset();
  }

  submitHandler(event) {
    if (document.querySelector('.form').checkValidity()) {
      event.preventDefault();
      const userName = document.querySelector('.input-name').value;
      const userEmail = document.querySelector('.input-email').value;
      const userPassword = document.querySelector('.input-password').value;
      if (this.flag) {
        this.registerUserForm(userEmail, userPassword, userName);
      } else {
        this.signInUserForm(userEmail, userPassword);
      }
    }
  }

  render() {
    this.flag = true;
    return this.view;
  }

  afterRender() {
    document.querySelector('.form').addEventListener('submit', this.submitHandler);
    document.querySelector('.form-footer button').addEventListener('click', this.changeForm);
    document.querySelector('.return-button').addEventListener('click', () => {
      document.getElementById('header_container').style.display = 'block';
      document.getElementById('footer_container').style.display = 'block';
    });
  }
}

export default new AuthorizationPage();

import AuthorizationPage from './authorization-page';
import userRequest from '../../../services/userRequest';

class Login extends AuthorizationPage {
  constructor() {
    super();
    this.title = 'Войти';
    this.action = 'Войти';
    this.alternativeAction = 'Создать';
    this.alternativeActionText = 'Нет аккаунта?';
    this.alternativeActionLink = '/#register';

    this.doAction = (mail, pass) => {
      userRequest({ email: mail, password: pass }, '/signin')
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
        .then(this.handleLoginData)
        .catch(this.handleError);
    };
  }
}

export default new Login();

import AuthorizationPage from './authorization-page';
import userRequest from '../../../services/userRequest';
import SettingsService from '../../../services/SettingsService';
import state from '../../../common/state';

class Register extends AuthorizationPage {
  constructor() {
    super();
    this.title = 'Создать аккаунт';
    this.action = 'Создать аккаунт';
    this.alternativeAction = 'Войти';
    this.alternativeActionText = 'Уже есть аккаунт?';
    this.alternativeActionLink = '/#login';

    this.viewMiddlePart = `
            <div class="name__inner">
              <label class="label-name" for="name"></label>
              <input class="input input-name" type="text" placeholder="Имя" name="name" id="name"
              pattern="([A-Za-z\\sА-Яа-яЁё0-9.])+" title="Введите имя" minlength="3" maxlength="20"
              >
            </div>
            `;

    this.doAction = (email, password, name) => {
      userRequest({ email, password, name }, '/users')
        .then(() => {
          userRequest({ email, password }, '/signin')
            .then((response) => {
              if (response.status.toString().charAt(0) === '5') {
                this.errorMessage = 'Проблемы с сервером';
              }
              return response.json();
            })
            .then(this.handleLoginData)
            .then(() => {
              const set = SettingsService.save(
                state.getUserId(),
                {
                  learnedWords: 0,
                  optional: {
                    registrationDate: new Date(),
                  },
                },
              );
              set.then((d) => console.log(d));
            });
        })
        .catch(this.handleError);
    };
  }
}

export default new Register();

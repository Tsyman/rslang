import './authorization-page.scss';
import state from '../../../common/state';
import Utils from '../../../services/Utils';

class AuthorizationPage {
  constructor() {
    this.title = '';
    this.action = '';
    this.alternativeAction = '';
    this.alternativeActionText = '';
    this.errorMessage = null;
    this.tooltipTime = 3000;
    this.alternativeActionLink = '';
    this.viewMiddlePart = '';
    this.doAction = () => {
    };
  }

  render = () => `
    <div class="authorization-page__container">
      <button class="return-button" type="submit" onClick="location.href='/#/'">&#10132;</button>
      <div class="form__container">
        <form class="form">
          <div class="form-header">
            <a href="https://rs.school"><img src="../../../assets/images/RS-Logo.png" class="form-header-icon"></a>
          </div>
          <div class="form-body">
            <p class="form-name">${this.title}</p>
            ${this.viewMiddlePart}
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
            <button type="submit" class="submit-button">${this.action}</button>
            <span class="tooltip"></span>
          </div>
          </div>
          <div class="form-footer">
            <p>${this.alternativeActionText}</p>
            <button type="button">${this.alternativeAction}</button>
          </div>
        </form>
      </div>
    </div>
  `

  afterRender = () => {
    document
      .querySelector('.form')
      .addEventListener('submit', (event) => {
        if (document.querySelector('.form').checkValidity()) {
          event.preventDefault();
          const userName = document.querySelector('.input-name') && document.querySelector('.input-name').value;
          const userEmail = document.querySelector('.input-email').value;
          const userPassword = document.querySelector('.input-password').value;
          this.doAction(userEmail, userPassword, userName);
        }
      });

    document
      .querySelector('.form-footer button')
      .addEventListener('click', () => {
        document.location.href = this.alternativeActionLink;
      });

    document.querySelector('.return-button').addEventListener('click', this.showHeaderAndFooter);
  }

  handleLoginData = (data) => {
    state.setSessionData({
      ...data,
      tokenExpireTime: Utils.extractTokenExpiration(data.token),
      refreshTokenExpireTime: Utils.extractTokenExpiration(data.refreshToken),
    });
    document.querySelector('.form').reset();
    document.location.href = '/#games';
    this.showHeaderAndFooter();
  };

  handleError = () => {
    const tooltip = document.querySelector('.tooltip');
    tooltip.textContent = this.errorMessage;
    tooltip.classList.add('tooltip--active');
    setTimeout(() => {
      tooltip.classList.remove('tooltip--active');
      this.errorMessage = '';
      tooltip.textContent = this.errorMessage;
    }, this.tooltipTime);
  };

  showHeaderAndFooter = () => {
    document.getElementById('header_container').style.display = 'block';
    document.getElementById('footer_container').style.display = 'block';
  };
}

export default AuthorizationPage;

import config from '../common/config';
import state, { authorizedUserKey } from '../common/state';
import Utils from './Utils';

const THIRTY_MINUTES = 10 * 1000;
// const THIRTY_MINUTES = 30 * 60 * 1000;

class HttpService {
  static async fetch(resource, init) {
    try {
      Object.assign(init, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${await this.getToken()}`,
          Accept: 'application/json',
        },
      });
      return window.fetch(`${config.SERVER_URL}${resource}`, init);
    } catch (e) {
      return new Promise(() => '');
    }
  }

  static async getToken() {
    if (state.getRefreshTokenExpireTime() - Date.now() <= 0) {
      // TODO show popup, pause and redirect to login
      // eslint-disable-next-line no-alert
      alert('Session is expired. You need to relogin');
      localStorage.removeItem(authorizedUserKey);
      document.location.href = '/#login';
      throw new Error('User\'s token is expired');
    } else if (state.getTokenExpiration() - Date.now() < THIRTY_MINUTES) {
      await this.refreshTokens();
    }

    return state.getToken();
  }

  static async refreshTokens() {
    const response = await fetch(`${config.SERVER_URL}/users/${state.getUserId()}/tokens`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${state.getRefreshToken()}`,
        Accept: 'application/json',
      },
    });
    const tokens = await response.json();

    state.setTokens({
      ...tokens,
      tokenExpireTime: Utils.extractTokenExpiration(tokens.token),
      refreshTokenExpireTime: Utils.extractTokenExpiration(tokens.refreshToken),
    });
  }
}

export default HttpService;

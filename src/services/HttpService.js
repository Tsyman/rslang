import config from '../common/config';
import state from '../common/state';

class HttpService {
  static async fetch(resource, init) {
    Object.assign(init, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${state.getToken()}`,
        Accept: 'application/json',
      },
    });

    return window.fetch(`${config.SERVER_URL}${resource}`, init);
  }
}

export default HttpService;

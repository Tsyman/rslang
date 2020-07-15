import HttpService from './HttpService';

class SettingsService {
  static async get(userId) {
    const response = await HttpService.fetch(
      `/users/${userId}/settings`,
      { method: 'GET' },
    );

    return response.status !== 200 ? undefined : response.json();
  }

  static async save(userId, settings) {
    const response = await HttpService.fetch(
      `/users/${userId}/settings`,
      {
        method: 'PUT',
        body: JSON.stringify(settings),
      },
    );

    return response.json();
  }
}

export default SettingsService;

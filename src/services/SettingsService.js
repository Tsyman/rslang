import HttpService from './HttpService';

class SettingsService {
  static async get(userId) {
    const response = await HttpService.fetch(
      `/users/${userId}/statistic`,
      { method: 'GET' },
    );

    return response.json();
  }

  static async save(userId, settings) {
    const response = await HttpService.fetch(
      `/users/${userId}/statistic`,
      {
        method: 'POST',
        body: JSON.stringify(settings),
      },
    );

    return response.json();
  }
}

export default SettingsService;

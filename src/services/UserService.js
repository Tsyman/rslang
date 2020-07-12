import HttpService from './HttpService';

class UserService {
  static async getAggregatedWords(userId, parameters) {
    let query = [];

    ['group', 'wordsPerPage', 'filter'].forEach((key) => {
      if (parameters[key]) {
        query.push(`${key}=${encodeURIComponent(parameters[key])}`);
      }
    });

    query = query.length ? `?${query.join('&')}` : '';

    const response = await HttpService.fetch(
      `/users/${userId}/aggregatedWords${query}`,
      { method: 'GET' },
    );

    const content = await response.json();

    return content;
  }
}

export default UserService;

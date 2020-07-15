import HttpService from './HttpService';

class UserService {
  static async getAggregatedWords(userId, parameters) {
    let query = [];

    ['group', 'page', 'wordsPerPage', 'filter'].forEach((key) => {
      if (parameters[key]) {
        query.push(`${key}=${encodeURIComponent(parameters[key])}`);
      }
    });

    query = query.length ? `?${query.join('&')}` : '';

    const response = await HttpService.fetch(
      `/users/${userId}/aggregatedWords${query}`,
      { method: 'GET' },
    );

    return response.json();
  }

  static async updateWord(userId, word) {
    const method = word.new ? 'POST' : 'PUT';

    const response = await HttpService.fetch(
      `/users/${userId}/words/${word.id}`,
      {
        method,
        body: JSON.stringify(word),
      },
    );

    return response.json();
  }
}

export default UserService;

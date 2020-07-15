import HttpService from './HttpService';

class WordService {
  wordsToLearn = [];

  static async getChunk(parameters) {
    let query = [];

    ['group', 'page', 'wordsPerExampleSentenceLTE', 'wordsPerPage'].forEach((key) => {
      if (parameters[key]) {
        query.push(`${key}=${encodeURIComponent(parameters[key])}`);
      }
    });

    query = query.length ? `?${query.join('&')}` : '';

    const response = await HttpService.fetch(
      `/words${query}`,
      { method: 'GET' },
    );

    return response.json();
  }

  static async getWords() {

  }
}

export default WordService;

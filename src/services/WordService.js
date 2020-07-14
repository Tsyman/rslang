import HttpService from './HttpService';

class WordService {
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

    const content = await response.json();

    return content;
  }
}

export default WordService;

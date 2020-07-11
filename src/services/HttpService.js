class HttpService {
  static async fetch(resource, init) {
    const token = localStorage.getItem('token');

    Object.assign(init, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    return window.fetch(`https://afternoon-falls-25894.herokuapp.com${resource}`, init);
  }
}

export default HttpService;

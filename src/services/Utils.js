const Utils = {
  // --------------------------------
  //  Parse a url and break it into resource, id and verb
  // --------------------------------
  parseRequestURL: () => {
    // eslint-disable-next-line no-restricted-globals
    const url = location.hash.slice(1).toLowerCase() || '/';
    const r = url.split('/');
    const request = {
      resource: null,
      id: null,
      verb: null,
    };

    [request.resource, request.id, request.verb] = r;
    // request.resource = r[1];
    // request.id = r[2];
    // request.verb = r[3];

    return request;
  },

  // --------------------------------
  //  Parse a token and return an expiration date
  // --------------------------------
  extractTokenExpiration: (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
    return parseInt(JSON.parse(jsonPayload).exp, 10) * 1000;
  },

  // --------------------------------
  //  Simple sleep implementation
  // --------------------------------
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};

export default Utils;

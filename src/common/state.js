const authorizedUserKey = 'authorizedUser';
const userIdKey = 'userId';
const tokenKey = 'token';
const tokenExpireTimeKey = 'tokenExpireTime';
const refreshTokenKey = 'refreshToken';
const nameKey = 'name';

export default (
  (() => {
    const localState = new Map();
    const authorizedUser = JSON.parse(localStorage.getItem(authorizedUserKey));
    if (authorizedUser) {
      const {
        userId, name, token, refreshToken, tokenExpireTime,
      } = authorizedUser;
      const expireTime = parseInt(tokenExpireTime, 10);
      if (!Number.isNaN(expireTime) && expireTime > Date.now()) {
        localState.set(userIdKey, userId);
        localState.set(nameKey, name);
        localState.set(tokenKey, token);
        localState.set(tokenExpireTimeKey, tokenExpireTime);
        localState.set(refreshTokenKey, refreshToken);
      }
    }

    return {
      setSessionData: (data) => {
        const {
          userId, name, token, refreshToken, tokenExpireTime,
        } = data;
        localState.set(userIdKey, userId);
        localState.set(nameKey, name);
        localState.set(tokenKey, token);
        localState.set(tokenExpireTimeKey, tokenExpireTime);
        localState.set(refreshTokenKey, refreshToken);
        localStorage.setItem(authorizedUserKey, JSON.stringify(data));
      },
      getUserId: () => localState.get(userIdKey),
      getName: () => localState.get(nameKey),
      getToken: () => localState.get(tokenKey),
      getRefreshToken: () => localState.get(refreshTokenKey),
      isAuthenticated: () => !!localState.get(tokenKey),
    };
  })()
);

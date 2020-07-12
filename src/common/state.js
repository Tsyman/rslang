export const authorizedUserKey = 'authorizedUser';
const userIdKey = 'userId';
const tokenKey = 'token';
const tokenExpireTimeKey = 'tokenExpireTime';
const refreshTokenKey = 'refreshToken';
const nameKey = 'name';

export default (
  (() => {
    const localState = new Map();
    const authorizedUser = JSON.parse(localStorage.getItem(authorizedUserKey));
    const isExpired = (tokenExpireTime) => !tokenExpireTime || tokenExpireTime < Date.now();

    if (authorizedUser) {
      const {
        userId, name, token, refreshToken, tokenExpireTime,
      } = authorizedUser;
      if (!isExpired(tokenExpireTime)) {
        localState.set(userIdKey, userId);
        localState.set(nameKey, name);
        localState.set(tokenKey, token);
        localState.set(tokenExpireTimeKey, tokenExpireTime);
        localState.set(refreshTokenKey, refreshToken);
      } else {
        localStorage.removeItem(authorizedUserKey);
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
      setTokens: ({ token, refreshToken, tokenExpireTime }) => {
        localState.set(tokenKey, token);
        localState.set(tokenExpireTimeKey, tokenExpireTime);
        localState.set(refreshTokenKey, refreshToken);
      },
      getUserId: () => localState.get(userIdKey),
      getName: () => localState.get(nameKey),
      getToken: () => localState.get(tokenKey),
      getTokenExpiration: () => localState.get(tokenExpireTimeKey),
      getRefreshToken: () => localState.get(refreshTokenKey),
      isAuthenticated: () => !isExpired(localState.get(tokenExpireTimeKey)),
    };
  })()
);

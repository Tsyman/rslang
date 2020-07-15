export const authorizedUserKey = 'authorizedUser';
const userIdKey = 'userId';
const tokenKey = 'token';
const tokenExpireTimeKey = 'tokenExpireTime';
const refreshTokenKey = 'refreshToken';
const refreshTokenExpireTimeKey = 'refreshTokenExpireTime';
const nameKey = 'name';
const settingsKey = 'settings';

export default (
  (() => {
    const localState = new Map();
    const authorizedUser = JSON.parse(localStorage.getItem(authorizedUserKey));
    const isExpired = (tokenExpireTime) => !tokenExpireTime || tokenExpireTime < Date.now();

    if (authorizedUser) {
      const {
        userId, name, token, refreshToken, tokenExpireTime, refreshTokenExpireTime,
      } = authorizedUser;
      if (!isExpired(tokenExpireTime)) {
        localState.set(userIdKey, userId);
        localState.set(nameKey, name);
        localState.set(tokenKey, token);
        localState.set(tokenExpireTimeKey, tokenExpireTime);
        localState.set(refreshTokenKey, refreshToken);
        localState.set(refreshTokenExpireTimeKey, refreshTokenExpireTime);
      } else {
        localStorage.removeItem(authorizedUserKey);
      }
    }

    return {
      setSessionData: (data) => {
        const {
          userId, name, token, refreshToken, tokenExpireTime, refreshTokenExpireTime,
        } = data;
        localState.set(userIdKey, userId);
        localState.set(nameKey, name);
        localState.set(tokenKey, token);
        localState.set(tokenExpireTimeKey, tokenExpireTime);
        localState.set(refreshTokenKey, refreshToken);
        localState.set(refreshTokenExpireTimeKey, refreshTokenExpireTime);
        localStorage.setItem(authorizedUserKey, JSON.stringify(data));
      },
      setTokens: ({
        token, refreshToken, tokenExpireTime, refreshTokenExpireTime,
      }) => {
        localState.set(tokenKey, token);
        localState.set(tokenExpireTimeKey, tokenExpireTime);
        localState.set(refreshTokenKey, refreshToken);
        localState.set(refreshTokenExpireTimeKey, refreshTokenExpireTime);
        localStorage.setItem(authorizedUserKey,
          JSON.stringify({
            ...JSON.parse(localStorage.getItem(authorizedUserKey)),
            token,
            refreshToken,
            tokenExpireTime,
            refreshTokenExpireTime,
          }));
      },
      setSettings: (settings) => localState.set(settingsKey, settings),
      getSettings: () => localState.get(settingsKey),
      getUserId: () => localState.get(userIdKey),
      getName: () => localState.get(nameKey),
      getToken: () => localState.get(tokenKey),
      getTokenExpiration: () => localState.get(tokenExpireTimeKey),
      getRefreshToken: () => localState.get(refreshTokenKey),
      getRefreshTokenExpireTime: () => localState.get(refreshTokenExpireTimeKey),
      isAuthenticated: () => !isExpired(localState.get(refreshTokenExpireTimeKey)),
    };
  })()
);

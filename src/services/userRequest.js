import config from '../common/config';

const userRequest = async (user, path) => fetch(`${config.SERVER_URL}${path}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
});

export default userRequest;

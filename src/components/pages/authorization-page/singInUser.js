import parseJwt from './tokenHandling/encodeToken';
import timestamp from './tokenHandling/formattedTime';

const signInUser = async (user) => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await rawResponse.json();
  localStorage.setItem('tokenEndTime', timestamp(parseJwt(data.token)));
  return data;
};

export default signInUser;

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
  return data;
};

export default signInUser;

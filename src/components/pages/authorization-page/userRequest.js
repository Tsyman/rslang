const userRequest = async (user, path) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return rawResponse.json();
};

export default userRequest;

const userRequest = async (user, path) => {
  const rawResponse = await fetch(`http://pacific-castle-12388.herokuapp.com/${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return rawResponse;
};

export default userRequest;

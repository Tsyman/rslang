function tokenLifetime() {
  const lifetime = 4;
  const currentTIme = new Date();
  const tokenEndTime = currentTIme.setHours(currentTIme.getHours() + lifetime);
  return new Date(tokenEndTime).toLocaleTimeString();
}

export default tokenLifetime;

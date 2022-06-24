import fetch from 'node-fetch'

export default async function fetchApi(path, options = {}) {
  const response = await fetch(`${process.env.PRIVATE_SERVER_URL}${path}`, options);
  const json = await response.json();
  return json;
}

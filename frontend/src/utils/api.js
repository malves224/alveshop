const url = process.env.REACT_APP_URL_API || 'http://localhost:3001';

export default async function requestApi(endpoint, method, payload, token) {
  const bodyData = JSON.stringify(payload);
  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: bodyData,
  };
  const response = await fetch(url + endpoint, requestOptions);
  const responseData = response.json();
  return responseData;
}

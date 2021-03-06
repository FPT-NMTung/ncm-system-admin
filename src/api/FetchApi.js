const endpoint = "https://ncmsystem.azurewebsites.net";
// const endpoint = "https://localhost:44305";
// const endpoint = 'https://test-ncm-system.azurewebsites.net';

/**
 * Fetches data from the API and returns a promise.
 * @param {object} api - The API endpoint.
 * @param {object} bodyObject - The body of the request.
 * @param {object} params - The parameters of the request.
 * @param {array<string>} pathValiable - The path variables of the request.
 * @returns {Promise<any>} - A promise that resolves to the response.
 */
const FetchApi = async (api, bodyObject, params, pathValiable) => {
  let options = {
    method: api.method,
    headers: {
      'Content-Type': api.contextType,
      Authorization: localStorage.getItem('access_token')
        ? 'Bearer ' + localStorage.getItem('access_token')
        : '',
    },
    body: api.contextType === "multipart/form-data" ? bodyObject : bodyObject ? JSON.stringify(bodyObject) : null,
  };

  if (api.contextType === "multipart/form-data") {
    delete options.headers['Content-Type'];
  }

  let paramString = '?';
  for (const property in params) {
    if (params.hasOwnProperty(property)) {
      paramString += `${property}=${encodeURIComponent(params[property])}&`;
    }
  }

  let newUrl = api.url
  if (pathValiable != undefined && pathValiable.length > 0) {
    pathValiable.forEach((element, index) => {
      newUrl = newUrl.replace(`{${index}}`, element);
    });
  }

  let response = await fetch(`${endpoint}${newUrl}${paramString}`, options);

  if (response.status === 401) {
    const dataRefresh = await refreshToken();
    if (dataRefresh) {
      localStorage.setItem('access_token', dataRefresh.data.access_token);
      let optionsR = {
        method: api.method,
        headers: {
          'Content-Type': api.contextType,
          Authorization: localStorage.getItem('access_token')
            ? 'Bearer ' + localStorage.getItem('access_token')
            : '',
        },
        body: bodyObject ? JSON.stringify(bodyObject) : null,
      };
      response = await fetch(`${endpoint}${newUrl}${paramString}`, optionsR);
    }
  }

  if (response.status >= 500) {
    return Promise.reject(undefined);
  }

  if (!response.ok) {
    const errorData = await response.json();
    return Promise.reject(errorData);
  }

  const data = await response.json();
  return data;
};

const refreshToken = async () => {
  if (!localStorage.getItem('refresh_token')) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
    return null;
  }

  const optionsRefresh = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token: localStorage.getItem('refresh_token'),
    }),
    method: 'POST',
  };

  const responseRefresh = await fetch(
    `${endpoint}/api/auth/refresh-token`,
    optionsRefresh
  );

  if (!responseRefresh.ok) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
    return null;
  }

  const dataRefresh = await responseRefresh.json();
  return dataRefresh;
};

export default FetchApi;

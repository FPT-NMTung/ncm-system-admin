const endpoint = "https://ncmsystem.azurewebsites.net";

/**
 * Fetches data from the API and returns a promise.
 * @param {object} api - The API endpoint.
 * @param {string} bodyObject - The body of the request.
 * @returns {Promise<any>} - A promise that resolves to the response.
 */
const FetchApi = async (api, bodyObject) => {
  let options = {
    method: api.method,
    headers: {
      "Content-Type": api.contextType,
      Authorization: localStorage.getItem("access_token")
        ? "Bearer " + localStorage.getItem("access_token")
        : "",
    },
    body: bodyObject ? JSON.stringify(bodyObject) : null,
  };

  let response = await fetch(`${endpoint}${api.url}`, options);

  if (response.status === 401) {
    const dataRefresh = await refreshToken();
    if (dataRefresh) {
      localStorage.setItem("access_token", dataRefresh.data.access_token);
      let optionsR = {
        method: api.method,
        headers: {
          "Content-Type": api.contextType,
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : "",
        },
        body: bodyObject ? JSON.stringify(bodyObject) : null,
      };
      response = await fetch(`${endpoint}${api.url}`, optionsR);
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
  if (!localStorage.getItem("refresh_token")) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/";
    return null;
  }

  const optionsRefresh = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      refresh_token: localStorage.getItem("refresh_token")
    }),
    method: "POST",
  };

  const responseRefresh = await fetch(
    `${endpoint}/api/auth/refresh-token`,
    optionsRefresh
  );

  if (!responseRefresh.ok) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/";
    return null;
  }

  const dataRefresh = await responseRefresh.json();
  return dataRefresh;
};

export default FetchApi;

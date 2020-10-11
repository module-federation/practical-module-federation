/*
export const fetchPage => (_, { page }) =>
  fetch(`/api/${page}`).then((resp) => resp.json());

export const postPage = (data) =>
  fetch(`/api/${data.page}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  }).then((resp) => resp.json());
*/

export const fetchPage = (host = "") => (_, { page }) =>
  fetch(`${host}/api/${page}`).then((resp) => resp.json());

export const postPage = (host = "") => (data) =>
  fetch(`${host}/api/${data.page}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  }).then((resp) => resp.json());

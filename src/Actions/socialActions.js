const BASE_URL = "http://127.0.0.1:8000";

export const allPost = async (access) => {
  const url = `${BASE_URL}/index-api/`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  return response;
};

export const allCommentById = async (access, id) => {
  const url = `${BASE_URL}/comment-api/${id}/`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  return response;
};

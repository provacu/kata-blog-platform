const BASE_URL = 'https://blog.kata.academy/api';

export const editArticleFetcher = async (articleData, slug) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/articles/${slug}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(articleData),
  });

  const data = await response.json();

  return data;
};

export const deleteArticleFetcher = async (slug) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status !== 204) {
      const errorData = await response.json();
      throw new Error(errorData.errors.message || 'Unknown server error');
    }
    throw new Error(`Request failed with status code: ${response.status}`);
  }
  return slug;
};

const BASE_URL = 'https://blog.kata.academy/api';

export const likeArticleFetch = async (slug) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const unlikeArticleFetch = async (slug) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors.body || 'Unknown server error');
  }

  return response.json();
};

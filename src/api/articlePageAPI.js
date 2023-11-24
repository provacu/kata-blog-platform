const BASE_URL = 'https://blog.kata.academy/api';

const fetchArticle = async (slug) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/articles/${slug}`, {
    method: 'GET',
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

export default fetchArticle;

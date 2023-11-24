const BASE_URL = 'https://blog.kata.academy/api';

const fetchArticles = async (offset = 0, pageSize = 5) => {
  const token = localStorage.getItem('token');
  const response = await fetch(
    `${BASE_URL}/articles?offset=${offset}&limit=${pageSize}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default fetchArticles;

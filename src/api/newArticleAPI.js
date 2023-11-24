const BASE_URL = 'https://blog.kata.academy/api';

const newArticleUpload = async (articleData) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ article: articleData }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors.message || 'Unknown server error');
  }

  return response && data;
};

export default newArticleUpload;

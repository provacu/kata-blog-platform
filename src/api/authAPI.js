const BASE_URL = 'https://blog.kata.academy/api';
export const register = async (username, email, password) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    }),
  });

  const data = await response.json();

  if (response.ok) {
    const { token } = data.user;
    localStorage.setItem('token', token);
    return data.user;
  }
  if (response.status === 422) {
    const errorMessages = data.errors;
    const formattedError = Object.entries(errorMessages)
      .map(([key, value]) => `${key} ${value}`)
      .join(', ');
    throw new Error(formattedError);
  }

  throw new Error('An unexpected error occurred');
};

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.user.token);
    return data.user;
  }
  if (response.status === 422) {
    const errorMessages = data.errors;
    const formattedError = Object.entries(errorMessages)
      .map(([key, value]) => `${key} ${value}`)
      .join(', ');
    throw new Error(formattedError);
  }

  throw new Error('An unexpected error occurred');
};

export const tokenRequest = async (url, token) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.errors);
};

export const updateUser = async (userData, token) => {
  const response = await fetch(`${BASE_URL}/user`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: userData }),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMessages = data.errors;
    const formattedError = Object.entries(errorMessages)
      .map(([key, value]) => `${key} ${value}`)
      .join(', ');
    throw new Error(formattedError);
  }
  return data.user;
};

export const getCurrentUser = async (token) => {
  const response = await fetch(`${BASE_URL}/user`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const data = await response.json();
  if (response.ok) {
    return data.user;
  }
  throw new Error(data.errors.body);
};

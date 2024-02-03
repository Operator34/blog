import axios from 'axios';
import Cookies from 'js-cookie';
import { message } from 'antd';
const apiBase = 'https://blog.kata.academy/api';
const headers = {
  Authorization: `Token ${Cookies.get('Token_Authorization')}`,
};

export const getAllArticles = (page = 1, limit = 10) => {
  console.log(page, limit);
  let num = 0;
  switch (page) {
    case 1:
      num = 0;
      break;
    case 2:
      num = limit + 1;
      break;
    default:
      num = page * limit - limit + 1;
      break;
  }
  return axios
    .get(`${apiBase}/articles?limit=${limit}&offset=${num}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error('Error in getAllArticles:', err);
      throw err;
    });
};

export const getArticleId = (id) => {
  return axios
    .get(`${apiBase}/articles/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error('Error in getArticleId:', err);
      throw err;
    });
};

export const registerUser = (username, email, password) => {
  return axios
    .post(`${apiBase}/users`, {
      user: { username, email, password },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error('Error in registerUser:', err);
      throw err;
    });
};

export const loginUser = (email, password) => {
  return axios
    .post(`${apiBase}/users/login`, { user: { email: email.toLowerCase(), password } })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error('Error in loginUser:', err);
      message.info('Неверный логин или пароль');
    });
};

export const updateCurrentUser = (user) => {
  return axios
    .put(
      `${apiBase}/user`,
      {
        user: { ...user },
      },
      {
        headers,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error('Error in updateCurrentUser:', err);
      throw err;
    });
};

export const getProfile = (username) => {
  return axios
    .get(`${apiBase}/profiles/${username}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error('Error in getProfile:', err);
      throw err;
    });
};

export const getCurrentUser = () => {
  return axios
    .get(`${apiBase}/user`, {
      headers,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error('Error in getCurrentUser:', err);
      throw err;
    });
};

export const createAnArticle = (article) => {
  return axios
    .post(
      `${apiBase}/articles`,
      {
        article: { ...article },
      },
      {
        headers,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error('Error in createAnArticle:', err);
      throw err;
    });
};

export const updateAnArticle = (slug, article) => {
  return axios
    .put(
      `${apiBase}/articles/${slug}`,
      {
        article: { ...article },
      },
      {
        headers,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error('Error in updateAnArticle:', err);
      throw err;
    });
};

export const deleteAnArticle = (slug) => {
  return axios
    .delete(`${apiBase}/articles/${slug}`, {
      headers,
    })
    .then((res) => res)
    .catch((err) => {
      console.error('Error in updateAnArticle:', err);
      throw err;
    });
};

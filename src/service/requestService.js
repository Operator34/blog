import axios from 'axios';
import Cookies from 'js-cookie';

const apiBase = 'https://blog.kata.academy/api';

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
  return axios.get(`${apiBase}/articles?limit=${limit}&offset=${num}`).then((res) => {
    return res;
  });
};

export const getArticleId = (id) => {
  console.log('getArticleId', id);
  return axios.get(`${apiBase}/articles/${id}`).then((res) => {
    console.log(res);
    return res;
  });
};

export const registerUser = (username, email, password) => {
  return axios
    .post(`${apiBase}/users`, {
      user: { username, email, password },
    })
    .then((res) => {
      console.log('registerUser', res);
      return res;
    });
};

export const loginUser = (email, password) => {
  return axios.post(`${apiBase}/users/login`, { user: { email: email.toLowerCase(), password } }).then((res) => {
    console.log('loginUser', res);
    return res;
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
        headers: {
          Authorization: `Token ${Cookies.get('Token_Authorization')}`,
        },
      }
    )
    .then((res) => {
      console.log('updateUser', res);
      return res;
    });
};

export const getProfile = (username) => {
  return axios.get(`${apiBase}/profiles/${username}`).then((res) => {
    console.log(res);
    return res;
  });
};

export const getCurrentUser = () => {
  return axios
    .get(`${apiBase}/user`, {
      headers: {
        Authorization: `Token ${Cookies.get('Token_Authorization')}`,
      },
    })
    .then((res) => {
      console.log('getCurrentUser', res);
      return res;
    });
};

export const createAnArticle = (article) => {
  console.log('createAnArticle', article);
  return axios
    .post(
      `${apiBase}/articles`,
      {
        article: { ...article },
      },
      {
        headers: {
          Authorization: `Token ${Cookies.get('Token_Authorization')}`,
        },
      }
    )
    .then((res) => {
      console.log('createAnArticle', res);
      return res;
    });
};

export const updateAnArticle = (slug, article) => {
  console.log('updateAnArticle', slug, article);
  return axios
    .put(
      `${apiBase}/articles/${slug}`,
      {
        article: { ...article },
      },
      {
        headers: {
          Authorization: `Token ${Cookies.get('Token_Authorization')}`,
        },
      }
    )
    .then((res) => {
      console.log('updateAnArticle', res);
      return res;
    });
};

export const deleteAnArticle = (slug) => {
  console.log('deleteAnArticle', slug);
  return axios
    .delete(`${apiBase}/articles/${slug}`, {
      headers: {
        Authorization: `Token ${Cookies.get('Token_Authorization')}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    });
};

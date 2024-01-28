import axios from 'axios';

const apiBase = 'https://blog.kata.academy/api';

export const getAllArticles = (offset = 1) =>
  axios.get(`${apiBase}/articles?offset=${offset}`).then((res) => {
    return res;
  });

export const getArticleId = (id) =>
  axios.get(`${apiBase}/articles/${id}`).then((res) => {
    return res;
  });

import 'isomorphic-fetch';
import sscache from 'session-storage-cache';
import deserialize from './model';

async function getArticles() {
  let data = sscache.get('articlesData');

  if (!data) {
    const response = await fetch('//api.mauro-colella.com/articles');
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const dataSet = await response.json();
    data = deserialize(dataSet);
    sscache.set('articlesData', data, 5);
  }
  return data;
}

export default getArticles;

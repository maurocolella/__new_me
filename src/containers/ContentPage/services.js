import 'isomorphic-fetch';
import deserialize from './model';

async function getArticles() {
  const response = await fetch('//api.mauro-colella.com/articles');
  if (!response.ok) {
    throw Error(response.statusText);
  }

  const dataSet = await response.json();
  return deserialize(dataSet);
}

export default getArticles;

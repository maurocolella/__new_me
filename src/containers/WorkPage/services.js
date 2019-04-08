import 'isomorphic-fetch';
import sscache from 'session-storage-cache';
import deserialize from './model';

async function getWorks() {
  let data = sscache.get('worksData');

  if (!data) {
    const response = await fetch('//api.mauro-colella.com/works');
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const dataSet = await response.json();
    data = deserialize(dataSet);
    sscache.set('worksData', data, 5);
  }
  return data;
}

export default getWorks;

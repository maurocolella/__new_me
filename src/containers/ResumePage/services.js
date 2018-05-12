import 'isomorphic-fetch';
import sscache from 'session-storage-cache';
import deserialize from './model';

async function getResume() {
  let data = sscache.get('resumeData');

  if (!data) {
    const response = await fetch('//api.mauro-colella.com/resume');
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const dataSet = await response.json();
    data = deserialize(dataSet);
    sscache.set('resumeData', data, 5);
  }
  return data;
}

export default getResume;

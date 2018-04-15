import 'isomorphic-fetch';
import sscache from 'session-storage-cache';
import deserialize from './model';

async function getSkills() {
  let data = sscache.get('skillsData');

  if (!data) {
    const response = await fetch('//api.mauro-colella.com/skills');
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const dataSet = await response.json();
    data = deserialize(dataSet);
    sscache.set('skillsData', data, 5);
  }
  return data;
}

export default getSkills;

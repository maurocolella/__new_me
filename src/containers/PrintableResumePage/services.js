import 'isomorphic-fetch';
import sscache from 'session-storage-cache';
import deserialize from './model';

async function getProfile() {
  let data = sscache.get('profileData');

  if (!data) {
    const response = await fetch('//api.mauro-colella.com/profile');
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const dataSet = await response.json();
    data = deserialize(dataSet);
    sscache.set('profileData', data, 5);
  }
  return data;
}

export default getProfile;

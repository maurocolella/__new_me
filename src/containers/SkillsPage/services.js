import 'isomorphic-fetch';
import deserialize from './model';

async function getSkills() {
  const response = await fetch('//api.mauro-colella.com/skills');
  if (!response.ok) {
    throw Error(response.statusText);
  }

  const dataSet = await response.json();
  return deserialize(dataSet);
}

export default getSkills;

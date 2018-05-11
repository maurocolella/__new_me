import camelize from 'camelize';

function deserialize(dataSet) {
  const normalizedSkills = dataSet.data.map((skill) => {
    let normalizedSkill = Object.assign({}, skill);
    if (skill.attributes) {
      normalizedSkill = Object.assign(normalizedSkill, skill.attributes);
      delete normalizedSkill.attributes;
    }
    return camelize(normalizedSkill);
  }) || [];

  return normalizedSkills;
}

export default deserialize;

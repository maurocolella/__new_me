import camelize from 'camelize';

function deserialize(dataSet) {
  const { data, included } = dataSet;
  const profile = Object.assign({}, data);

  let normalizedProfile = Object.assign({}, profile);
  if (profile.attributes) {
    normalizedProfile = Object.assign(normalizedProfile, profile.attributes);
    const relatedLanguages = (
      normalizedProfile.relationships &&
      normalizedProfile.relationships.languages &&
      normalizedProfile.relationships.languages.data
    ) || [];

    const languages = relatedLanguages.map(language =>
      Object.assign(
        language,
        included.find(link => link.type === 'language' && link.id === language.id).attributes,
      ));

    const relatedCertifications = (
      normalizedProfile.relationships &&
      normalizedProfile.relationships.certifications &&
      normalizedProfile.relationships.certifications.data
    ) || [];

    const certifications = relatedCertifications.map(certification =>
      Object.assign(
        certification,
        included.find(link => link.type === 'certification' && link.id === certification.id).attributes,
      ));

    normalizedProfile.languages = languages;
    normalizedProfile.certifications = certifications;

    delete normalizedProfile.attributes;
    delete normalizedProfile.relationships;
  }
  return camelize(normalizedProfile);
}

export default deserialize;

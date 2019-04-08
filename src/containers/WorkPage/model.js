import camelize from 'camelize';

function normalizeIncluded(entry, included, type) {
  const related = (
    entry.relationships
    && entry.relationships[`${type}s`]
    && entry.relationships[`${type}s`].data
  ) || [];

  const normalizedRelated = related.map(item => Object.assign(
    item,
    included.find(link => link.type === type && link.id === item.id).attributes,
  ));

  return normalizedRelated;
}

function deserialize(dataSet) {
  const { data, included } = dataSet;

  const formattedData = data.map((entry) => {
    let formattedEntry = Object.assign({}, entry);
    formattedEntry = Object.assign(formattedEntry, entry.attributes || {});

    formattedEntry.skills = normalizeIncluded(formattedEntry, included, 'skill');
    formattedEntry.links = normalizeIncluded(formattedEntry, included, 'link');
    formattedEntry.images = normalizeIncluded(formattedEntry, included, 'image');
    delete formattedEntry.attributes;
    delete formattedEntry.relationships;

    return camelize(formattedEntry);
  });

  return formattedData;
}

export default deserialize;

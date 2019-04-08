import camelize from 'camelize';

function deserialize(dataSet) {
  const { data, included } = dataSet;

  const formattedData = data.map((entry) => {
    let formattedEntry = Object.assign({}, entry);
    formattedEntry = Object.assign(formattedEntry, entry.attributes || {});

    const relatedTasks = (
      formattedEntry.relationships
      && formattedEntry.relationships.tasks
      && formattedEntry.relationships.tasks.data
    ) || [];

    const tasks = relatedTasks.map(task => Object.assign(
      task,
      included.find(link => link.type === 'task' && link.id === task.id).attributes,
    ));

    formattedEntry.tasks = tasks;
    delete formattedEntry.attributes;
    delete formattedEntry.relationships;

    return camelize(formattedEntry);
  });

  return formattedData;
}

export default deserialize;

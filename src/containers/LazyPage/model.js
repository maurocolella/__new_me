function deserialize(dataSet) {
  const { data, included } = dataSet;

  const formattedData = data.map((entry) => {
    let formattedEntry = Object.assign({}, entry);
    formattedEntry = Object.assign(formattedEntry, entry.attributes || {});

    const relatedTasks = (formattedEntry.relationships &&
      formattedEntry.relationships.find(relationship => relationship.type === 'tasks')
        .data) || [];

    const tasks = relatedTasks.map(task =>
      Object.assign(
        task,
        included.find(link => link.id === task.id).attributes,
      ));

    formattedEntry.tasks = tasks;
    delete formattedEntry.attributes;
    delete formattedEntry.relationships;

    return formattedEntry;
  });

  return formattedData;
}

export default deserialize;

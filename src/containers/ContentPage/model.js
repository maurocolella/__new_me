function deserialize(dataSet) {
  const normalizedArticles = dataSet.data.map((article) => {
    let normalizedArticle = Object.assign({}, article);
    if (article.attributes) {
      normalizedArticle = Object.assign(normalizedArticle, article.attributes);
      delete normalizedArticle.attributes;
    }
    return normalizedArticle;
  }) || [];

  return normalizedArticles;
}

export default deserialize;

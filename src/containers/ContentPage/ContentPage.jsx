import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { articlesFetchData } from './actions';

import Loader from '../../components/Loader';
import styles from '../../assets/styles/page.scss';

class ContentPage extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    article: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { isLoading, article } = this.props;
    const { title, body, updatedAt } = article;

    return (
      (isLoading) ?
        <Loader className={styles.page} />
        :
        <main className={styles.page}>
          <header className={styles.page__header}>
            <small className={styles.lastModified}>Last modified: {moment(updatedAt).format('LL')}</small>
            <h2 className={styles.page__title}>{title}</h2>
          </header>
          <article dangerouslySetInnerHTML={{ __html: body }} />
        </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const { articles } = state;

  let article = {};

  if (articles.items &&
      articles.items.length) {
    const hasSlug = slug !== undefined;
    const matchedArticle = hasSlug && articles.items.filter(obj => obj.slug === slug);

    if (!matchedArticle.length && hasSlug) {
      ownProps.history.push('/not/found');
    } else {
      ({ 0: article } = (hasSlug ? matchedArticle : articles.items));
    }
  }

  return {
    hasErrored: articles.hasErrored,
    isLoading: articles.isLoading,
    slug,
    article,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: () => { dispatch(articlesFetchData()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);

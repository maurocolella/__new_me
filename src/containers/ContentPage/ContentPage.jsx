import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { articlesFetchData } from './actions';

import Loader from '../../components/Loader';
import styles from '../../assets/styles/page.scss';

class ContentPage extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    article: PropTypes.shape.isRequired,
  };

  componentDidMount() {
    this.props.fetchData('//api.mauro-colella.com/articles');
  }

  render() {
    const { isLoading, article } = this.props;

    return (
      (isLoading) ?
        <Loader className={styles.page} />
        :
        <main className={styles.page}>
          <header className={styles.page__header}>
            <h2 className={styles.page__title}>{article ? article.title : ''}</h2>
          </header>
          <article dangerouslySetInnerHTML={{ __html: article ? article.body : '' }} />
        </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const { articles } = state;

  let article = {};

  if (articles !== undefined && articles.length) {
    if (slug === undefined) {
      ({ 0: article } = articles);
    } else {
      ({ 0: article } = articles.filter(obj => obj.slug === slug));
    }
  }
  return {
    hasErrored: state.articlesHasErrored,
    isLoading: state.articlesIsLoading,
    slug,
    article,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(articlesFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);

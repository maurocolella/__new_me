import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../assets/styles/page.scss';

function NotFoundPage() {
  return (
    <main className={styles.page}>
      <article className={`${styles.article} ${styles['article--404']}`}>
        <h1>404</h1>
        <p>
          We couldn&apos;t find the document you have requested.
          <br />
          Please go back to the
          {' '}
          <Link to="/about">homepage</Link>
          {' '}
and try again.
        </p>
      </article>
    </main>
  );
}

export default NotFoundPage;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './WorkSlide.scss';
import placeholder from '../../assets/images/placeholder.svg';

class WorkSlide extends PureComponent {
  static handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const urlHash = btoa(event.currentTarget.href);
    window.open(event.currentTarget.href, urlHash);
  }

  static propTypes = {
    entry: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      images: PropTypes.array,
      links: PropTypes.array,
      skills: PropTypes.array,
    }).isRequired,
    active: PropTypes.bool.isRequired,
  };

  render() {
    const { entry, active } = this.props;
    const cover = entry.images && entry.images.length ? entry.images[0].url : placeholder;
    const link = entry.links && entry.links.length ? entry.links[0].url : '#';
    const skills = entry.skills.map(skill => skill.title) || [];
    skills.sort().reverse();

    return (
      <li
        className={styles.slide}
        style={{
          display: active ? 'flex' : 'none',
        }}
      >
        <aside className={styles.slide__banner}>
          <div className={styles.slide__cover}>
            <a
              className={styles.slide__link}
              href={link}
              onClick={this.constructor.handleClick}
            >
              <img
                src={cover}
                alt={entry.title}
              />
            </a>
          </div>
        </aside>
        <article className={styles.slide__content}>
          <h5 style={{ color: '#dedede' }}>{entry.title}</h5>
          <div>{entry.description}</div>
          <ul className={styles.skills}>
            {skills.map(skill => (
              <li
                className={styles.skills__skill}
                key={btoa(skill)}
              >
                {skill}
              </li>
            ))}
          </ul>
        </article>
      </li>
    );
  }
}

export default WorkSlide;

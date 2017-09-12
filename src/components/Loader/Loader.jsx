import React, { Component } from 'react';

import styles from './Loader.scss';

export default class Loader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.loader}>
				<div className={styles['folding-cube']}>
					<div className={`${styles['cube1']} ${styles['cube']}`}></div>
					<div className={`${styles['cube2']} ${styles['cube']}`}></div>
					<div className={`${styles['cube4']} ${styles['cube']}`}></div>
					<div className={`${styles['cube3']} ${styles['cube']}`}></div>
				</div>
			</div>);
	}
}

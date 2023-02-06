import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import resume from './Mauro_Colella_Resume_2023.pdf';

import Loader from '../Loader';
import styles from './PDFResume.scss';

class PDFResume extends Component {
  state = {
    numPages: null,
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { numPages } = this.state;

    return (
      <div>
        <Document
          file={resume}
          onLoadSuccess={this.onDocumentLoadSuccess}
          loading={<Loader />}
        >
          {[...Array(numPages).keys()].map(pageNumber => (
            <Page
              className={styles.document__page}
              pageNumber={pageNumber + 1}
              loading={<Loader />}
            />
          ))}
        </Document>
      </div>
    );
  }
}

export default PDFResume;

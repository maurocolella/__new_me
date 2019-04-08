import { Component } from 'react';

class PrintableResumePage extends Component {
  componentDidMount() {
    top.location.replace('https://api.mauro-colella.com/assets/Mauro%20Colella%20_%20consultant%20profile.pdf'); /* eslint-disable-line */
  }

  render() {
    return null;
  }
}

export default PrintableResumePage;

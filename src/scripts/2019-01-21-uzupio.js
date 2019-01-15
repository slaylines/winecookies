import React, { Component } from 'react';
import { render } from 'react-dom';

import Map from './components/Map';
import data from '../data/2019-01-21-uzupio';

class App extends Component {
  render() {
    return <Map markers={data} />;
  }
}

render(<App />, document.querySelector('main'));

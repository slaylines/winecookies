import '../../styles/2019-01-30/uzupio.scss';

import React, { Component } from 'react';
import { render } from 'react-dom';

import MapViewer from '../components/MapViewer';
import Map from '../components/Map';
import Landing from './Landing';
import tiles from '../utils/tiles';
import data from './data';

class App extends Component {
  render() {
    return (
      <MapViewer
        map={Map}
        landing={Landing}
        tiles={tiles.wikimedia}
        {...data}
      />
    );
  }
}

render(<App />, document.querySelector('main > .app'));

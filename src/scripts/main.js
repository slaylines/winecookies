import '../styles/main.scss';

import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return <div>Hello from React!</div>;
  }
}

render(<App />, document.querySelector('main'));

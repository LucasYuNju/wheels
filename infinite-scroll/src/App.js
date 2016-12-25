import React, { Component } from 'react';
// import Infinite from 'react-infinite';

import List from './List';
import './App.css';

const data = [
  {
    url: 'images/fireworks.jpg',
    info: "A fireworks display",
  },
  {
    url: 'images/bigben.jpg',
    info: "The famous clock",
  },
  {
    url: 'images/coffee.jpg',
    info: "A cup of black coffee",
  },
  {
    url: 'images/rose.jpg',
    info: "A red, red rose",
  },
];

class App extends Component {
  render() {
    let images = [];
    for (let i = 0; i < 100; i++) {
      images = images.concat(data);
    }
    return (
      <div className=".app">
        <div className="gallery-container">
          <h3>Real list</h3>
          <div className="gallery">
            {images.map(this.renderImage)}
          </div>
        </div>
        <div className="gallery-container">
          <h3>Virtual list</h3>
          <List
            containerHeight={480}
            elementHeight={80}
            className="gallery"
          >
            {images.map(this.renderImage)}
          </List>
        </div>
      </div>
    );
  }

  renderImage(image, i) {
    return (
      <div
        className="image"
        key={i}
      >
        <img alt={image.url} src={image.url} />
        <span className="info">{image.info}</span>
      </div>
    );
  }
}

export default App;

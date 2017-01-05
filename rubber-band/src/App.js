import React, { Component } from 'react';

import './App.css';
import RubberBand from './RubberBand';

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
];

class App extends Component {
  render() {
    let images = [];
    for (let i = 0; i < 10; i++) {
      images = images.concat(data);
    }
    return (
      <div className=".app">
        <RubberBand className="gallery">
          {images.map(this.renderImage)}
        </RubberBand>
      </div>
    );
  }

  renderImage = (image, i) => {
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

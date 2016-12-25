import React, { Component } from 'react';
// import Infinite from 'react-infinite';

import './App.css';
import InfiniteScrollList from './InfiniteScrollList';
import PassiveEventList from './PassiveEventList';

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
          <InfiniteScrollList
            containerHeight={480}
            elementHeight={80}
            className="gallery"
          >
            {images.map(this.renderImage)}
          </InfiniteScrollList>
        </div>

        <hr />
        <span>目前看不出有什么区别</span>
        <div className="gallery-container">
          <h3>List that blocks scrolling</h3>
          <div
            className="gallery"
            onScroll={this.sleep}
          >
            {images.map(this.renderImage)}
          </div>
        </div>
        <div className="gallery-container">
          <h3>List optimized with passive event</h3>
          <PassiveEventList
            className="gallery"
            onScroll={this.sleep}
          >
            {images.map(this.renderImage)}
          </PassiveEventList>
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

  sleep() {
    const seconds = 0.2;
    const waitTill = new Date(new Date().getTime() + seconds * 1000);
    while(waitTill > new Date()){}
  }
}

export default App;

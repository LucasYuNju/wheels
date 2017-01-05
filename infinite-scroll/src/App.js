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
          <h3>Normal list</h3>
          <div className="gallery">
            {images.map(this.renderImage)}
          </div>
        </div>
        <div className="gallery-container">
          <h3>Infinite scroll list</h3>
          <InfiniteScrollList
            containerHeight={480}
            elementHeight={80}
            className="gallery"
          >
            {images.map(this.renderImage)}
          </InfiniteScrollList>
        </div>

        <hr />
        <p>passive event只适用于wheel, touch等事件。</p>
        <p>这里有个React的SyntheticEvent的坑，SyntheticEvent使用委托实现的，<strong>不要</strong>在同一个页面中同时测试普通event和passive event</p>
        <div className="gallery-container">
          <h3>List that blocks scrolling</h3>
          <div
            className="gallery"
            onWheel={this.sleep}
          >
            {images.map(this.renderImage)}
          </div>
        </div>

        <div className="gallery-container">
          <h3>List optimized with passive event</h3>
          <PassiveEventList
            className="gallery"
            onWheel={this.sleep}
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

  sleep(e) {
    const seconds = 0.1;
    const waitTill = new Date(new Date().getTime() + seconds * 1000);
    while(waitTill > new Date()){}
    console.log('delayed');
  }
}

export default App;

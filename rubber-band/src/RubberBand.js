import React, { Component, PropTypes } from 'react';

const MAX_BUFFER_HEIGHT = 150;

function round(value) {
  if (value <= 0.95) return Math.round(value * 1000) / 1000;
  else if (value <= 0.975) return Math.round(value * 10000) / 10000;
  else return Math.round(value * 100000) / 100000;
}

const bufferStyle = {
  height: 0,
  width: '100%',
};

const ALPHA = 0.85;

class RubberBand extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children, ...other } = this.props;
    return (
      <div {...other} ref="element" onWheel={this.handleWheel}>
        <div ref="topBuffer" className="top-buffer" style={bufferStyle} />
          {children}
        <div ref="bottomBuffer" className="bottom-buffer" style={bufferStyle} />
      </div>
    );
  }

  componentDidMount() {
    this.refs.element.addEventListener("wheel", this.props.onWheel, {
      passive: true
    });
  }

  ComponentWillUnmount() {
    this.refs.element.removeEventListener("wheel", this.props.onWheel);
  }

  handleWheel = (e) => {
    const event = e.nativeEvent;
    const { element, topBuffer, bottomBuffer } = this.refs;
    // console.error(event.deltaY);
    if (!this.isOverscrolled) {
      this.isOverscrolled = element.scrollTop + event.deltaY < 0 ||
        element.scrollHeight - element.scrollTop <= element.clientHeight;
    }
    else {
      // Show top buffer
      if (element.scrollTop + event.deltaY < 0 && event.deltaY < 0) {
        // 平滑处理
        if (!this.smoothedDeltaY) {
          this.smoothedDeltaY = event.deltaY;
        }
        else {
          this.smoothedDeltaY = ALPHA * this.smoothedDeltaY + (1 - ALPHA) * event.deltaY;
        }

        // [0, 1000] => [0, 150]
        const height = Math.log(1 + Math.abs(this.smoothedDeltaY / 100)) * 150;
        topBuffer.style.height = height + 'px';
        console.log(event.deltaY, topBuffer.style.height);

        if (topBuffer.style.height <= 1) {
          element.scrollTop = topBuffer.style.height;
        } else {
          element.scrollTop = 1;
        }
      }
      else if (element.scrollHeight - element.scrollTop <= element.clientHeight && event.deltaY > 0) {
        // Show bottom buffer
        let newScroll = event.deltaY - 1 + parseInt(bottomBuffer.style.height);
        let position = round(1 + Math.log10((MAX_BUFFER_HEIGHT - newScroll) / MAX_BUFFER_HEIGHT));
        bottomBuffer.style.height = (MAX_BUFFER_HEIGHT - position * MAX_BUFFER_HEIGHT) + 'px';
      }
      else {
        this.isOverscrolled = false;
      }
    }
  }
}

export default RubberBand;

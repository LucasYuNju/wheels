import React, { Component, PropTypes } from 'react';

const ALPHA = 0.85;
const MAX_BUFFER_HEIGHT = 150;

const bufferStyle = {
  height: 0,
};

// dynamics/bounce
const springBounceFactory = (options) => {
  const frequency = Math.max(1, options.frequency / 20);
  const friction = Math.pow(20, options.friction / 100);
  const A = (t) => Math.pow(friction / 10,-t) * (1 - t);
  const fn = (t) => {
    const b = -3.14/2;
    const a = 1;
    const angle = frequency * t * a + b;
    return (A(t) * Math.cos(angle));
  };
  return fn;

  // const frequency = Math.max(1, options.frequency / 20);
  // const friction = 20 ** (options.friction / 100);
  // return (t) => {
  //   return 1 - ((friction / 10) ** (-t) * (1 - t) * Math.cos(frequency * t));
  // };
};
const springBounce = springBounceFactory({
  frequency: 250,
  friction: 300,
})

class RubberBand extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    targetHeight: 0,
  };

  render() {
    const { children, ...other } = this.props;
    return (
      <div {...other} ref="element" onWheel={this.newHandleWheel}>
        <div ref="topBuffer" className="top-buffer" style={{ height: this.state.currentHeight }} />
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

  componentWillUnmount() {
    this.refs.element.removeEventListener("wheel", this.props.onWheel);
  }

  componentDidUpdate() {
    if (this.state.targetHeight) {
       window.requestAnimationFrame(() => {
         this.settle();
       });
    }
  }

  settle() {
    const t = (Date.now() - this.state.startTime) / 1400;
    const currentHeight = this.state.lastDragHeight + springBounce(t) * (this.state.targetHeight - this.state.lastDragHeight);
    const shouldFinish = false;
    // console.log('spring', springBounce(t), shouldFinish);

    if (shouldFinish) {
      this.setState({
        currentHeight: 0,
      });
    }
    else {
      this.setState({
        currentHeight,
      });
    }
  }

  newHandleWheel = (e) => {
    const velocity = Math.abs(e.deltaY) / 3;
    let targetHeight = 0;
    if (!this.state.targetHeight) {
      targetHeight = 100;
      this.setState({
        targetHeight,
        currentHeight: 0,
        lastDragHeight: 0,
        startTime: new Date(),
      });

    }
    // const targetHeight = this.state.targetHeight + velocity;

    // const targetHeight = 100;
    // settle
  };
}

export default RubberBand;

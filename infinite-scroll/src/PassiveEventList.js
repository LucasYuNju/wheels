import React, { Component, PropTypes } from 'react';

// React does not support passive event. This is a workaround.
// Refer: https://github.com/facebook/react/issues/6436
class PassiveEventList extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(
      PropTypes.element
    ),
    onWheel: PropTypes.func.isRequired,
  }

  render() {
    const {
      children,
      onWheel,
      ...other,
    } = this.props;
    console.log(other);
    return (
      <div
        {...other}
        ref="container"
      >
        {children}
      </div>
    );
  }

  componentDidMount() {
    this.refs.container.addEventListener("scroll", this.props.onWheel, {
      passive: true
    });
  }

  ComponentWillUnmount() {
    this.refs.container.removeEventListener("scroll", this.props.onWheel);
  }
}

export default PassiveEventList;

import React, { cloneElement, Component, PropTypes } from 'react';

class InfiniteScrollList extends Component {
  static propTypes = {
    containerHeight: PropTypes.number.isRequired,
    elementHeight: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.element
    ),
    className: PropTypes.string,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.length = Math.floor(this.props.containerHeight / this.props.elementHeight) + 6;
    this.state = {
      offset: 0,
    };
  }

  render() {
    const {
      children,
      elementHeight,
      className,
      style,
    } = this.props;

    return (
      <div
        onScroll={this.handleScroll}
        className={className}
        style={style}
      >
        <div
          className="content"
          style={{height: children.length * elementHeight, position:'relative' }}
        >
          {children.map(this.extendChild)}
        </div>
      </div>
    );
  }

  extendChild = (child, i) => {
    if (this.state.offset <= i && i < this.state.offset + this.length) {
      return cloneElement(child, {
        key: i - this.state.offset,
        style: Object.assign({}, child.style, {
          position: 'absolute',
          top: i * this.props.elementHeight,
        }),
      });
    }
  }

  handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    this.setState({
      offset: Math.round(scrollTop / this.props.elementHeight) - 3,
    });
  }
}

export default InfiniteScrollList;

import React, { cloneElement, Component, PropTypes } from 'react';

class List extends Component {
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
    this.sum = 1;
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
        className={className}
        style={style}
        ref="container"
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

  componentDidMount() {
    this.refs.container.addEventListener("scroll", this.handleScroll, {
      passive: false
    });
  }

  ComponentWillUnmount() {
    this.refs.container.removeEventListener("scroll", this.handleScroll);
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
    for (let i = 0; i < 100000000; i++) {
      this.sum *= i;
    }
    this.setState({
      offset: Math.round(scrollTop / this.props.elementHeight) - 3,
    });
  }
}

export default List;

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

  constructor(...props) {
    super(...props);
    this.state = {
      from: 0,
      numDom: Math.floor(this.props.containerHeight / this.props.elementHeight) + 2,
    };
    console.log(this.state);
  }

  componentWillReceiveProps(nextProps) {

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
          style={{height: children.length * elementHeight, position:'relative' }}
        >
          {children.map(this.extendChild)}
        </div>
      </div>
    );
  }

  extendChild = (child, i) => {
    if (this.state.from <= i && i <= this.state.from + this.state.numDom) {
      return cloneElement(child, {
        style: Object.assign({}, child.style, {
          position: 'absolute',
          top: i * this.props.elementHeight,
        }),
      });
    }
  }

  handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const from = scrollTop / this.props.elementHeight;
    this.setState({
      from,
    });
  }
}

export default List;

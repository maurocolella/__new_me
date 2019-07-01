import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class NavItem extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    activeClassName: PropTypes.string,
    activeStyle: PropTypes.shape({}),
    className: PropTypes.string,
    hoverClassName: PropTypes.string,
    to: PropTypes.string,
  };

  static defaultProps = {
    children: [],
    activeClassName: '',
    activeStyle: {},
    className: '',
    hoverClassName: PropTypes.string,
    to: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({
      hover: true,
    });
  }

  handleMouseLeave = () => {
    this.setState({
      hover: false,
    });
  }

  handleClick = () => {
    this.setState({
      hover: false,
    });
    window.scrollTo(0, 0);
    window.dispatchEvent(new CustomEvent('scroll'));
  }

  render() {
    const {
      children,
      activeClassName,
      activeStyle,
      className,
      hoverClassName,
      to,
    } = this.props;
    const { hover } = this.state;

    return (
      <NavLink
        activeClassName={activeClassName}
        className={`${className}${hover ? ` ${hoverClassName}` : ''}`}
        activeStyle={activeStyle}
        to={to}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        {children}
      </NavLink>
    );
  }
}

export default NavItem;

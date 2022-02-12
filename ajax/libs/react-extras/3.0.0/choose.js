import React from 'react';
import PropTypes from 'prop-types';
import If from './if.js';

const Choose = props => {
  let when = null;
  let otherwise = null;
  React.Children.forEach(props.children, children => {
    if (children.props.condition === undefined) {
      otherwise = children;
    } else if (!when && children.props.condition === true) {
      when = children;
    }
  });
  return when || otherwise;
};

Choose.propTypes = {
  children: PropTypes.node
};
Choose.When = If;

Choose.Otherwise = ({
  render,
  children
}) => render ? render() : children;

Choose.Otherwise.propTypes = {
  children: PropTypes.node,
  render: PropTypes.func
};
export default Choose;
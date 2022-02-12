import React from 'react';
import PropTypes from 'prop-types';

const For = ({
  render,
  of
}) => of.map((item, index) => render(item, index));

For.propTypes = {
  of: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired
};
export default For;
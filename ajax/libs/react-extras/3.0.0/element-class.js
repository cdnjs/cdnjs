import React from 'react';
import PropTypes from 'prop-types';
export default class ElementClass extends React.PureComponent {
  componentWillMount() {
    const {
      add,
      remove
    } = this.props;
    const {
      classList
    } = this.element;

    if (add) {
      classList.add(...add.trim().split(' '));
    }

    if (remove) {
      classList.remove(...remove.trim().split(' '));
    }
  }

  componentWillUnmount() {
    const {
      add,
      remove
    } = this.props;
    const {
      classList
    } = this.element;

    if (add) {
      classList.remove(...add.trim().split(' '));
    }

    if (remove) {
      classList.add(...remove.trim().split(' '));
    }
  }

  render() {
    return null;
  }

}
ElementClass.propTypes = {
  add: PropTypes.string,
  remove: PropTypes.string
};
"use strict";

var React = require('react');
var classNames = require('classnames');

module.exports = React.createClass({
  displayName: "Modal",

  getInitialState: function () {
    return {
      visible: false
    };
  },

  getDefaultProps: function () {
    return {
      onShow: function () {
      },
      onHide: function () {
      }
    };
  },

  componentWillMount: function () {
    this.handleBeforeComponentUpdate(this.props);
  },

  componentWillUnmount: function () {
    this.__setBodyOverflowVisible(true);
  },

  componentWillReceiveProps: function (props) {
    this.handleBeforeComponentUpdate(props);
  },

  componentDidMount: function () {
    this.handleComponentUpdate(this.props, this.getInitialState());
  },

  componentDidUpdate: function (prevProps, prevState) {
    this.handleComponentUpdate(prevProps, prevState);
  },

  handleBeforeComponentUpdate: function (props) {
    if (props.hasOwnProperty('visible') && props.visible !== this.state.visible) {
      this.setState({
        visible: props.visible
      });
    }
  },

  handleComponentUpdate: function (prevProps, prevState) {
    if (prevState.visible !== this.state.visible) {
      if (this.state.visible) {
        this.props.onShow();
      } else {
        this.props.onHide();
      }
      this.__setBodyOverflowVisible(!this.state.visible);
    }
  },

  __setBodyOverflowVisible: function (visible) {
    if (!visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = null;
    }
  },

  handleCloseBtnClick: function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.toggleVisibility();
  },

  handleOverlayClick: function (e) {
    if (e.target === this.refs.overlay.getDOMNode()) {
      e.preventDefault();
      e.stopPropagation();
      this.hide();
    }
  },

  // called from the outside world
  toggleVisibility: function () {
    var visible = !this.state.visible;
    this.setState({
      visible: visible
    });
  },

  // called from the outside world
  show: function () {
    this.setState({visible: true});
  },

  // called from the outside world
  hide: function () {
    this.setState({visible: false});
  },

  render: function () {
    var classes = classNames({
      "overlay": true,
      "hidden": !this.state.visible
    });

    if(this.props.className) {
      classes += " " + this.props.className;
    }

    return (
      <div className={classes} ref="overlay" onClick={this.handleOverlayClick}>
        <div className="overlay-top">
          <div className="overlay-close" title="close" onClick={this.handleCloseBtnClick}>x</div>
        </div>
        <div className="overlay-content">{this.props.children}</div>
      </div>
    );
  }
});

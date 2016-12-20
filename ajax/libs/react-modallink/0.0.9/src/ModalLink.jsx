'use strict';

var React = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;

module.exports = React.createClass({
  getInitialState: function () {
    return {
      isModalShown: false
    };
  },

  show: function () {
    this.setState({
      isModalShown: true
    });
  },

  hide: function () {
    this.setState({
      isModalShown: false
    });
  },

  render: function () {
    var triggerStyle = {
      cursor: 'pointer'
    };
    var trigger = React.Children.only(this.props.children);
    trigger.props.onClick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.show();
    }.bind(this);
    var modal = cloneWithProps(this.props.modal, {visible: this.state.isModalShown, onHide: this.hide});
    return (
      <div>
        {modal}
        <span style={triggerStyle}>
        {trigger}
        </span>
      </div>
    );
  }
});

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = createWrapperComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * This is a utility component to wrap around the nodes we are
 * passing in to `mount()`. Theoretically, you could do everything
 * we are doing without this, but this makes it easier since
 * `renderIntoDocument()` doesn't really pass back a reference to
 * the DOM node it rendered to, so we can't really "re-render" to
 * pass new props in.
 */
function createWrapperComponent(node) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var spec = {

    propTypes: {
      Component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
      props: _react.PropTypes.object.isRequired,
      context: _react.PropTypes.object
    },

    getDefaultProps: function () {
      function getDefaultProps() {
        return {
          context: null
        };
      }

      return getDefaultProps;
    }(),
    getInitialState: function () {
      function getInitialState() {
        return {
          mount: true,
          props: this.props.props,
          context: this.props.context
        };
      }

      return getInitialState;
    }(),
    setChildProps: function () {
      function setChildProps(newProps) {
        var props = (0, _object2['default'])({}, this.state.props, newProps);
        this.setState({ props: props });
      }

      return setChildProps;
    }(),
    setChildContext: function () {
      function setChildContext(context) {
        var _this = this;

        return new Promise(function (resolve) {
          return _this.setState({ context: context }, resolve);
        });
      }

      return setChildContext;
    }(),
    getInstance: function () {
      function getInstance() {
        var component = this._reactInternalInstance._renderedComponent;
        var inst = component.getPublicInstance();
        if (inst === null) {
          return component._instance;
        }
        return inst;
      }

      return getInstance;
    }(),
    getWrappedComponent: function () {
      function getWrappedComponent() {
        var component = this._reactInternalInstance._renderedComponent;
        var inst = component.getPublicInstance();
        if (inst === null) {
          return component;
        }
        return inst;
      }

      return getWrappedComponent;
    }(),
    render: function () {
      function render() {
        var Component = this.props.Component;
        var _state = this.state;
        var mount = _state.mount;
        var props = _state.props;

        if (!mount) return null;
        return _react2['default'].createElement(Component, props);
      }

      return render;
    }()
  };

  if (options.context && (node.type.contextTypes || options.childContextTypes)) {
    // For full rendering, we are using this wrapper component to provide context if it is
    // specified in both the options AND the child component defines `contextTypes` statically
    // OR the merged context types for all children (the node component or deeper children) are
    // specified in options parameter under childContextTypes.
    // In that case, we define both a `getChildContext()` function and a `childContextTypes` prop.
    var childContextTypes = node.type.contextTypes || {};
    if (options.childContextTypes) {
      (0, _object2['default'])(childContextTypes, options.childContextTypes);
    }
    (0, _object2['default'])(spec, {
      childContextTypes: childContextTypes,
      getChildContext: function () {
        function getChildContext() {
          return this.state.context;
        }

        return getChildContext;
      }()
    });
  }

  return _react2['default'].createClass(spec);
}
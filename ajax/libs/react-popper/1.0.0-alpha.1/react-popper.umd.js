(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'popper.js'], factory) :
  (factory((global['react-popper'] = {}),global.react,global.PopperJS));
}(this, (function (exports,react,PopperJS) { 'use strict';

  PopperJS = PopperJS && PopperJS.hasOwnProperty('default') ? PopperJS['default'] : PopperJS;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var initialStyle = {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none'
  };

  var initialArrowStyle = {};

  var Popper = function (_Component) {
    inherits(Popper, _Component);

    function Popper() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, Popper);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Popper.__proto__ || Object.getPrototypeOf(Popper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        referenceNode: undefined,
        popperNode: undefined,
        arrowNode: undefined,
        popperInstance: undefined,
        data: undefined
      }, _this.setReferenceNode = function (referenceNode) {
        return _this.setState({ referenceNode: referenceNode });
      }, _this.setPopperNode = function (popperNode) {
        return _this.setState({ popperNode: popperNode });
      }, _this.setArrowNode = function (arrowNode) {
        return _this.setState({ arrowNode: arrowNode });
      }, _this.updateStateModifier = {
        enabled: true,
        order: 900,
        fn: function fn(data) {
          _this.setState({ data: data });
          return data;
        }
      }, _this.getOptions = function () {
        return {
          placement: _this.props.placement,
          eventsEnabled: _this.props.eventsEnabled,
          modifiers: _extends({}, _this.props.modifiers, {
            arrow: {
              enabled: !!_this.state.arrowNode,
              element: _this.state.arrowNode
            },
            applyStyle: { enabled: false },
            updateStateModifier: _this.updateStateModifier
          })
        };
      }, _this.getPopperStyle = function () {
        return !_this.state.popperNode || !_this.state.data ? initialStyle : _extends({
          position: _this.state.data.offsets.popper.position
        }, _this.state.data.styles);
      }, _this.getPopperPlacement = function () {
        return !_this.state.data ? undefined : _this.state.data.placement;
      }, _this.getArrowStyle = function () {
        return !_this.state.arrowNode || !_this.state.data ? initialArrowStyle : _this.state.data.arrowStyles;
      }, _this.initPopperInstance = function () {
        var referenceElement = _this.props.referenceElement;
        var _this$state = _this.state,
            referenceNode = _this$state.referenceNode,
            popperNode = _this$state.popperNode,
            popperInstance = _this$state.popperInstance;

        var reference = referenceElement || referenceNode;
        if (reference && popperNode && !popperInstance) {
          var _popperInstance = new PopperJS(reference, popperNode, _this.getOptions());
          _this.setState({ popperInstance: _popperInstance });
          return true;
        }
        return false;
      }, _this.destroyPopperInstance = function (callback) {
        if (_this.state.popperInstance) {
          _this.state.popperInstance.destroy();
        }
        _this.setState({ popperInstance: undefined }, callback);
      }, _this.updatePopperInstance = function () {
        if (_this.state.popperInstance) {
          _this.destroyPopperInstance(function () {
            return _this.initPopperInstance();
          });
        }
      }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(Popper, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        // If needed, initialize the Popper.js instance
        // it will return `true` if it initialized a new instance, or `false` otherwise
        // if it returns `false`, we make sure Popper props haven't changed, and update
        // the Popper.js instance if needed
        if (!this.initPopperInstance()) {
          // If the Popper.js options have changed, update the instance (destroy + create)
          if (this.props.placement !== prevProps.placement || this.props.eventsEnabled !== prevProps.eventsEnabled || this.state.referenceNode !== prevState.referenceNode || this.state.arrowNode !== prevState.arrowNode || this.state.popperNode !== prevState.popperNode || this.props.referenceElement !== prevProps.referenceElement) {
            this.updatePopperInstance();
          }
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.state.popperInstance) {
          this.state.popperInstance.destroy();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return this.props.children({
          referenceProps: {
            getRef: this.setReferenceNode
          },
          popperProps: {
            getRef: this.setPopperNode,
            style: this.getPopperStyle(),
            placement: this.getPopperPlacement()
          },
          arrowProps: {
            getRef: this.setArrowNode,
            style: this.getArrowStyle(),
            placement: this.getPopperPlacement()
          }
        });
      }
    }]);
    return Popper;
  }(react.Component);

  Popper.defaultProps = {
    placement: 'bottom',
    eventsEnabled: true,
    referenceElement: undefined
  };


  var placements = PopperJS.placements;

  exports.default = Popper;
  exports.placements = placements;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react-popper.umd.js.map

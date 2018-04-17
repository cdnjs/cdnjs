(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'popper.js'], factory) :
  (factory((global['react-popper'] = {}),global.react,global.PropTypes,global.PopperJS));
}(this, (function (exports,react,PropTypes,PopperJS) { 'use strict';

  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
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

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var Manager = function (_Component) {
    inherits(Manager, _Component);

    function Manager() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, Manager);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Manager.__proto__ || Object.getPrototypeOf(Manager)).call.apply(_ref, [this].concat(args))), _this), _this._setTargetNode = function (node) {
        _this._targetNode = node;
      }, _this._getTargetNode = function () {
        return _this._targetNode;
      }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(Manager, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          popperManager: {
            setTargetNode: this._setTargetNode,
            getTargetNode: this._getTargetNode
          }
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            tag = _props.tag,
            children = _props.children,
            restProps = objectWithoutProperties(_props, ['tag', 'children']);

        if (tag !== false) {
          return react.createElement(tag, restProps, children);
        } else {
          return children;
        }
      }
    }]);
    return Manager;
  }(react.Component);

  Manager.childContextTypes = {
    popperManager: PropTypes.object.isRequired
  };
  Manager.defaultProps = {
    tag: 'div'
  };
  Manager.propTypes = process.env.NODE_ENV !== "production" ? {
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  } : {};

  var Target = function Target(props, context) {
    var _props$component = props.component,
        component = _props$component === undefined ? 'div' : _props$component,
        innerRef = props.innerRef,
        children = props.children,
        restProps = objectWithoutProperties(props, ['component', 'innerRef', 'children']);
    var popperManager = context.popperManager;

    var targetRef = function targetRef(node) {
      popperManager.setTargetNode(node);
      if (typeof innerRef === 'function') {
        innerRef(node);
      }
    };

    if (typeof children === 'function') {
      var targetProps = { ref: targetRef };
      return children({ targetProps: targetProps, restProps: restProps });
    }

    var componentProps = _extends({}, restProps);

    if (typeof component === 'string') {
      componentProps.ref = targetRef;
    } else {
      componentProps.innerRef = targetRef;
    }

    return react.createElement(component, componentProps, children);
  };

  Target.contextTypes = {
    popperManager: PropTypes.object.isRequired
  };

  Target.propTypes = {
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    innerRef: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  };

  var placements = PopperJS.placements;

  var Popper = function (_Component) {
    inherits(Popper, _Component);

    function Popper() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, Popper);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Popper.__proto__ || Object.getPrototypeOf(Popper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this._setArrowNode = function (node) {
        _this._arrowNode = node;
      }, _this._getTargetNode = function () {
        if (_this.props.target) {
          return _this.props.target;
        } else if (!_this.context.popperManager || !_this.context.popperManager.getTargetNode()) {
          throw new Error('Target missing. Popper must be given a target from the Popper Manager, or as a prop.');
        }
        return _this.context.popperManager.getTargetNode();
      }, _this._getOffsets = function (data) {
        return Object.keys(data.offsets).map(function (key) {
          return data.offsets[key];
        });
      }, _this._isDataDirty = function (data) {
        if (_this.state.data) {
          return JSON.stringify(_this._getOffsets(_this.state.data)) !== JSON.stringify(_this._getOffsets(data));
        } else {
          return true;
        }
      }, _this._updateStateModifier = {
        enabled: true,
        order: 900,
        fn: function fn(data) {
          if (_this._isDataDirty(data)) {
            _this.setState({ data: data });
          }
          return data;
        }
      }, _this._getPopperStyle = function () {
        var data = _this.state.data;


        if (!_this._popper || !data) {
          return {
            position: 'absolute',
            pointerEvents: 'none',
            opacity: 0
          };
        }

        return _extends({
          position: data.offsets.popper.position
        }, data.styles);
      }, _this._getPopperPlacement = function () {
        return _this.state.data ? _this.state.data.placement : undefined;
      }, _this._getPopperHide = function () {
        return !!_this.state.data && _this.state.data.hide ? '' : undefined;
      }, _this._getArrowStyle = function () {
        if (!_this.state.data || !_this.state.data.offsets.arrow) {
          return {};
        } else {
          var _this$state$data$offs = _this.state.data.offsets.arrow,
              top = _this$state$data$offs.top,
              left = _this$state$data$offs.left;

          return { top: top, left: left };
        }
      }, _this._handlePopperRef = function (node) {
        _this._popperNode = node;
        if (node) {
          _this._createPopper();
        } else {
          _this._destroyPopper();
        }
        if (_this.props.innerRef) {
          _this.props.innerRef(node);
        }
      }, _this._scheduleUpdate = function () {
        _this._popper && _this._popper.scheduleUpdate();
      }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(Popper, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          popper: {
            setArrowNode: this._setArrowNode,
            getArrowStyle: this._getArrowStyle
          }
        };
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(lastProps) {
        if (lastProps.placement !== this.props.placement || lastProps.eventsEnabled !== this.props.eventsEnabled || lastProps.target !== this.props.target) {
          this._destroyPopper();
          this._createPopper();
        }
        if (lastProps.children !== this.props.children) {
          this._scheduleUpdate();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._destroyPopper();
      }
    }, {
      key: '_createPopper',
      value: function _createPopper() {
        var _this2 = this;

        var _props = this.props,
            placement = _props.placement,
            eventsEnabled = _props.eventsEnabled;

        var modifiers = _extends({}, this.props.modifiers, {
          applyStyle: { enabled: false },
          updateState: this._updateStateModifier
        });
        if (this._arrowNode) {
          modifiers.arrow = _extends({}, this.props.modifiers.arrow || {}, {
            element: this._arrowNode
          });
        }
        this._popper = new PopperJS(this._getTargetNode(), this._popperNode, {
          placement: placement,
          eventsEnabled: eventsEnabled,
          modifiers: modifiers
        });

        // TODO: look into setTimeout scheduleUpdate call, without it, the popper will not position properly on creation
        setTimeout(function () {
          return _this2._scheduleUpdate();
        });
      }
    }, {
      key: '_destroyPopper',
      value: function _destroyPopper() {
        if (this._popper) {
          this._popper.destroy();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            component = _props2.component,
            innerRef = _props2.innerRef,
            placement = _props2.placement,
            eventsEnabled = _props2.eventsEnabled,
            modifiers = _props2.modifiers,
            children = _props2.children,
            restProps = objectWithoutProperties(_props2, ['component', 'innerRef', 'placement', 'eventsEnabled', 'modifiers', 'children']);

        var popperStyle = this._getPopperStyle();
        var popperPlacement = this._getPopperPlacement();
        var popperHide = this._getPopperHide();

        if (typeof children === 'function') {
          var popperProps = {
            ref: this._handlePopperRef,
            style: popperStyle,
            'data-placement': popperPlacement,
            'data-x-out-of-boundaries': popperHide
          };
          return children({
            popperProps: popperProps,
            restProps: restProps,
            scheduleUpdate: this._scheduleUpdate
          });
        }

        var componentProps = _extends({}, restProps, {
          style: _extends({}, restProps.style, popperStyle),
          'data-placement': popperPlacement,
          'data-x-out-of-boundaries': popperHide
        });

        if (typeof component === 'string') {
          componentProps.ref = this._handlePopperRef;
        } else {
          componentProps.innerRef = this._handlePopperRef;
        }

        return react.createElement(component, componentProps, children);
      }
    }]);
    return Popper;
  }(react.Component);

  Popper.contextTypes = {
    popperManager: PropTypes.object
  };
  Popper.childContextTypes = {
    popper: PropTypes.object.isRequired
  };
  Popper.defaultProps = {
    component: 'div',
    placement: 'bottom',
    eventsEnabled: true,
    modifiers: {}
  };
  Popper.propTypes = process.env.NODE_ENV !== "production" ? {
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    innerRef: PropTypes.func,
    placement: PropTypes.oneOf(placements),
    eventsEnabled: PropTypes.bool,
    modifiers: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    target: PropTypes.oneOfType([
    // the following check is needed for SSR
    PropTypes.instanceOf(typeof Element !== 'undefined' ? Element : Object), PropTypes.shape({
      getBoundingClientRect: PropTypes.func.isRequired,
      clientWidth: PropTypes.number.isRequired,
      clientHeight: PropTypes.number.isRequired
    })])
  } : {};

  var Arrow = function Arrow(props, context) {
    var _props$component = props.component,
        component = _props$component === undefined ? 'span' : _props$component,
        innerRef = props.innerRef,
        children = props.children,
        restProps = objectWithoutProperties(props, ['component', 'innerRef', 'children']);
    var popper = context.popper;

    var arrowRef = function arrowRef(node) {
      popper.setArrowNode(node);
      if (typeof innerRef === 'function') {
        innerRef(node);
      }
    };
    var arrowStyle = popper.getArrowStyle();

    if (typeof children === 'function') {
      var arrowProps = {
        ref: arrowRef,
        style: arrowStyle
      };
      return children({ arrowProps: arrowProps, restProps: restProps });
    }

    var componentProps = _extends({}, restProps, {
      style: _extends({}, arrowStyle, restProps.style)
    });

    if (typeof component === 'string') {
      componentProps.ref = arrowRef;
    } else {
      componentProps.innerRef = arrowRef;
    }

    return react.createElement(component, componentProps, children);
  };

  Arrow.contextTypes = {
    popper: PropTypes.object.isRequired
  };

  Arrow.propTypes = {
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    innerRef: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  };

  exports.Manager = Manager;
  exports.Target = Target;
  exports.Popper = Popper;
  exports.placements = placements;
  exports.Arrow = Arrow;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react-popper.umd.js.map

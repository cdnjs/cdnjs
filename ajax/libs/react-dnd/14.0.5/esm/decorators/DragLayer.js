function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { jsx as _jsx } from "react/jsx-runtime";
import { createRef, Component } from 'react';
import { shallowEqual } from '@react-dnd/shallowequal';
import { invariant } from '@react-dnd/invariant';
import hoistStatics from 'hoist-non-react-statics';
import { DndContext } from '../core';
import { isRefable, checkDecoratorArguments, isPlainObject } from './utils';
/**
 * @param collect The props collector function
 * @param options The DnD options
 */

export function DragLayer(collect) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  checkDecoratorArguments('DragLayer', 'collect[, options]', collect, options);
  invariant(typeof collect === 'function', 'Expected "collect" provided as the first argument to DragLayer to be a function that collects props to inject into the component. ', 'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-layer', collect);
  invariant(isPlainObject(options), 'Expected "options" provided as the second argument to DragLayer to be a plain object when specified. ' + 'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-layer', options);
  return function decorateLayer(DecoratedComponent) {
    var Decorated = DecoratedComponent;
    var _options$arePropsEqua = options.arePropsEqual,
        arePropsEqual = _options$arePropsEqua === void 0 ? shallowEqual : _options$arePropsEqua;
    var displayName = Decorated.displayName || Decorated.name || 'Component';

    var DragLayerContainer = /*#__PURE__*/function (_Component) {
      _inherits(DragLayerContainer, _Component);

      var _super = _createSuper(DragLayerContainer);

      function DragLayerContainer() {
        var _this;

        _classCallCheck(this, DragLayerContainer);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));

        _defineProperty(_assertThisInitialized(_this), "manager", void 0);

        _defineProperty(_assertThisInitialized(_this), "isCurrentlyMounted", false);

        _defineProperty(_assertThisInitialized(_this), "unsubscribeFromOffsetChange", void 0);

        _defineProperty(_assertThisInitialized(_this), "unsubscribeFromStateChange", void 0);

        _defineProperty(_assertThisInitialized(_this), "ref", createRef());

        _defineProperty(_assertThisInitialized(_this), "handleChange", function () {
          if (!_this.isCurrentlyMounted) {
            return;
          }

          var nextState = _this.getCurrentState();

          if (!shallowEqual(nextState, _this.state)) {
            _this.setState(nextState);
          }
        });

        return _this;
      }

      _createClass(DragLayerContainer, [{
        key: "getDecoratedComponentInstance",
        value: function getDecoratedComponentInstance() {
          invariant(this.ref.current, 'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()');
          return this.ref.current;
        }
      }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
          return !arePropsEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.isCurrentlyMounted = true;
          this.handleChange();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.isCurrentlyMounted = false;

          if (this.unsubscribeFromOffsetChange) {
            this.unsubscribeFromOffsetChange();
            this.unsubscribeFromOffsetChange = undefined;
          }

          if (this.unsubscribeFromStateChange) {
            this.unsubscribeFromStateChange();
            this.unsubscribeFromStateChange = undefined;
          }
        }
      }, {
        key: "render",
        value: function render() {
          var _this2 = this;

          return _jsx(DndContext.Consumer, {
            children: function children(_ref) {
              var dragDropManager = _ref.dragDropManager;

              if (dragDropManager === undefined) {
                return null;
              }

              _this2.receiveDragDropManager(dragDropManager); // Let componentDidMount fire to initialize the collected state


              if (!_this2.isCurrentlyMounted) {
                return null;
              }

              return _jsx(Decorated, Object.assign({}, _this2.props, _this2.state, {
                ref: isRefable(Decorated) ? _this2.ref : null
              }), void 0);
            }
          }, void 0);
        }
      }, {
        key: "receiveDragDropManager",
        value: function receiveDragDropManager(dragDropManager) {
          if (this.manager !== undefined) {
            return;
          }

          this.manager = dragDropManager;
          invariant(_typeof(dragDropManager) === 'object', 'Could not find the drag and drop manager in the context of %s. ' + 'Make sure to render a DndProvider component in your top-level component. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);
          var monitor = this.manager.getMonitor();
          this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(this.handleChange);
          this.unsubscribeFromStateChange = monitor.subscribeToStateChange(this.handleChange);
        }
      }, {
        key: "getCurrentState",
        value: function getCurrentState() {
          if (!this.manager) {
            return {};
          }

          var monitor = this.manager.getMonitor();
          return collect(monitor, this.props);
        }
      }]);

      return DragLayerContainer;
    }(Component);

    _defineProperty(DragLayerContainer, "displayName", "DragLayer(".concat(displayName, ")"));

    _defineProperty(DragLayerContainer, "DecoratedComponent", DecoratedComponent);

    return hoistStatics(DragLayerContainer, DecoratedComponent);
  };
}
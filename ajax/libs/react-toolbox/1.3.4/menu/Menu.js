'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = exports.menuFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _utils = require('../utils');

var _MenuItem = require('./MenuItem.js');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var POSITION = {
  AUTO: 'auto',
  STATIC: 'static',
  TOP_LEFT: 'topLeft',
  TOP_RIGHT: 'topRight',
  BOTTOM_LEFT: 'bottomLeft',
  BOTTOM_RIGHT: 'bottomRight'
};

var factory = function factory(MenuItem) {
  var Menu = function (_Component) {
    _inherits(Menu, _Component);

    function Menu() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Menu);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Menu.__proto__ || Object.getPrototypeOf(Menu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        active: _this.props.active,
        rippled: false
      }, _this.handleDocumentClick = function (event) {
        if (_this.state.active && !_utils.events.targetIsDescendant(event, _reactDom2.default.findDOMNode(_this))) {
          _this.setState({ active: false, rippled: false });
        }
      }, _this.handleSelect = function (item, event) {
        var _item$props = item.props,
            value = _item$props.value,
            onClick = _item$props.onClick;

        if (onClick) event.persist();
        _this.setState({ active: false, rippled: _this.props.ripple }, function () {
          if (onClick) onClick(event);
          if (_this.props.onSelect) _this.props.onSelect(value);
        });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Menu, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        this.positionTimeoutHandle = setTimeout(function () {
          var _refs$menu$getBoundin = _this2.refs.menu.getBoundingClientRect(),
              width = _refs$menu$getBoundin.width,
              height = _refs$menu$getBoundin.height;

          var position = _this2.props.position === POSITION.AUTO ? _this2.calculatePosition() : _this2.props.position;
          _this2.setState({ position: position, width: width, height: height });
        });
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _this3 = this;

        if (this.props.position !== nextProps.position) {
          var position = nextProps.position === POSITION.AUTO ? this.calculatePosition() : nextProps.position;
          this.setState({ position: position });
        }

        /**
         * If the menu is going to be activated via props and its not active, verify
         * the position is appropriated and then show it recalculating position if its
         * wrong. It should be shown in two consecutive setState.
         */
        if (!this.props.active && nextProps.active && !this.state.active) {
          if (nextProps.position === POSITION.AUTO) {
            var _position = this.calculatePosition();
            if (this.state.position !== _position) {
              this.setState({ position: _position, active: false }, function () {
                _this3.activateTimeoutHandle = setTimeout(function () {
                  _this3.show();
                }, 20);
              });
            } else {
              this.show();
            }
          } else {
            this.show();
          }
        }

        /**
         * If the menu is being deactivated via props and the current state is
         * active, it should be hid.
         */
        if (this.props.active && !nextProps.active && this.state.active) {
          this.hide();
        }
      }
    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate(nextProps, nextState) {
        if (!this.state.active && nextState.active) {
          _utils.events.addEventsToDocument({
            click: this.handleDocumentClick,
            touchstart: this.handleDocumentClick
          });
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevState.active && !this.state.active) {
          if (this.props.onHide) this.props.onHide();
          _utils.events.removeEventsFromDocument({
            click: this.handleDocumentClick,
            touchstart: this.handleDocumentClick
          });
        } else if (!prevState.active && this.state.active && this.props.onShow) {
          this.props.onShow();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.state.active) {
          _utils.events.removeEventsFromDocument({
            click: this.handleDocumentClick,
            touchstart: this.handleDocumentClick
          });
        }
        clearTimeout(this.positionTimeoutHandle);
        clearTimeout(this.activateTimeoutHandle);
      }
    }, {
      key: 'calculatePosition',
      value: function calculatePosition() {
        var parentNode = _reactDom2.default.findDOMNode(this).parentNode;
        if (!parentNode) return;

        var _parentNode$getBoundi = parentNode.getBoundingClientRect(),
            top = _parentNode$getBoundi.top,
            left = _parentNode$getBoundi.left,
            height = _parentNode$getBoundi.height,
            width = _parentNode$getBoundi.width;

        var _utils$getViewport = _utils.utils.getViewport(),
            wh = _utils$getViewport.height,
            ww = _utils$getViewport.width;

        var toTop = top < wh / 2 - height / 2;
        var toLeft = left < ww / 2 - width / 2;
        return '' + (toTop ? 'top' : 'bottom') + (toLeft ? 'Left' : 'Right');
      }
    }, {
      key: 'getMenuStyle',
      value: function getMenuStyle() {
        var _state = this.state,
            width = _state.width,
            height = _state.height,
            position = _state.position;

        if (position !== POSITION.STATIC) {
          if (this.state.active) {
            return { clip: 'rect(0 ' + width + 'px ' + height + 'px 0)' };
          } else if (position === POSITION.TOP_RIGHT) {
            return { clip: 'rect(0 ' + width + 'px 0 ' + width + 'px)' };
          } else if (position === POSITION.BOTTOM_RIGHT) {
            return { clip: 'rect(' + height + 'px ' + width + 'px ' + height + 'px ' + width + 'px)' };
          } else if (position === POSITION.BOTTOM_LEFT) {
            return { clip: 'rect(' + height + 'px 0 ' + height + 'px 0)' };
          } else if (position === POSITION.TOP_LEFT) {
            return { clip: 'rect(0 0 0 0)' };
          }
        }
      }
    }, {
      key: 'getRootStyle',
      value: function getRootStyle() {
        if (this.state.position !== POSITION.STATIC) {
          return { width: this.state.width, height: this.state.height };
        }
      }
    }, {
      key: 'renderItems',
      value: function renderItems() {
        var _this4 = this;

        return _react2.default.Children.map(this.props.children, function (item) {
          if (!item) return item;
          if (item.type === MenuItem) {
            return _react2.default.cloneElement(item, {
              ripple: item.props.ripple || _this4.props.ripple,
              selected: typeof item.props.value !== 'undefined' && _this4.props.selectable && item.props.value === _this4.props.selected,
              onClick: _this4.handleSelect.bind(_this4, item)
            });
          } else {
            return _react2.default.cloneElement(item);
          }
        });
      }
    }, {
      key: 'show',
      value: function show() {
        var _refs$menu$getBoundin2 = this.refs.menu.getBoundingClientRect(),
            width = _refs$menu$getBoundin2.width,
            height = _refs$menu$getBoundin2.height;

        this.setState({ active: true, width: width, height: height });
      }
    }, {
      key: 'hide',
      value: function hide() {
        this.setState({ active: false });
      }
    }, {
      key: 'render',
      value: function render() {
        var _classnames;

        var theme = this.props.theme;

        var outlineStyle = { width: this.state.width, height: this.state.height };
        var className = (0, _classnames3.default)([theme.menu, theme[this.state.position]], (_classnames = {}, _defineProperty(_classnames, theme.active, this.state.active), _defineProperty(_classnames, theme.rippled, this.state.rippled), _classnames), this.props.className);

        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'menu', className: className, style: this.getRootStyle() },
          this.props.outline ? _react2.default.createElement('div', { className: theme.outline, style: outlineStyle }) : null,
          _react2.default.createElement(
            'ul',
            { ref: 'menu', className: theme.menuInner, style: this.getMenuStyle() },
            this.renderItems()
          )
        );
      }
    }]);

    return Menu;
  }(_react.Component);

  Menu.propTypes = {
    active: _react.PropTypes.bool,
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    onHide: _react.PropTypes.func,
    onSelect: _react.PropTypes.func,
    onShow: _react.PropTypes.func,
    outline: _react.PropTypes.bool,
    position: _react.PropTypes.oneOf(Object.keys(POSITION).map(function (key) {
      return POSITION[key];
    })),
    ripple: _react.PropTypes.bool,
    selectable: _react.PropTypes.bool,
    selected: _react.PropTypes.any,
    theme: _react.PropTypes.shape({
      active: _react.PropTypes.string,
      bottomLeft: _react.PropTypes.string,
      bottomRight: _react.PropTypes.string,
      menu: _react.PropTypes.string,
      menuInner: _react.PropTypes.string,
      outline: _react.PropTypes.string,
      rippled: _react.PropTypes.string,
      static: _react.PropTypes.string,
      topLeft: _react.PropTypes.string,
      topRight: _react.PropTypes.string
    })
  };
  Menu.defaultProps = {
    active: false,
    outline: true,
    position: POSITION.STATIC,
    ripple: true,
    selectable: true
  };


  return Menu;
};

var Menu = factory(_MenuItem2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.MENU)(Menu);
exports.menuFactory = factory;
exports.Menu = Menu;
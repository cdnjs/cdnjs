'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = exports.tabsFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _FontIcon = require('../font_icon/FontIcon.js');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Tab = require('./Tab.js');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabContent = require('./TabContent.js');

var _TabContent2 = _interopRequireDefault(_TabContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Tab, TabContent, FontIcon) {
  var Tabs = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Tabs);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        pointer: {},
        arrows: {}
      }, _this.handleHeaderClick = function (event) {
        var idx = parseInt(event.currentTarget.id);
        if (_this.props.onChange) _this.props.onChange(idx);
      }, _this.handleResize = function () {
        if (_this.resizeTimeout) clearTimeout(_this.resizeTimeout);
        _this.resizeTimeout = setTimeout(function () {
          _this.updatePointer(_this.props.index);
          _this.updateArrows();
        }, 100);
      }, _this.updatePointer = function (idx) {
        if (_this.navigationNode && _this.navigationNode.children[idx]) {
          var nav = _this.navigationNode.getBoundingClientRect();
          var label = _this.navigationNode.children[idx].getBoundingClientRect();
          var scrollLeft = _this.navigationNode.scrollLeft;
          _this.setState({
            pointer: {
              top: nav.height + 'px',
              left: label.left - nav.left + scrollLeft + 'px',
              width: label.width + 'px'
            }
          });
        }
      }, _this.updateArrows = function () {
        var nav = _this.navigationNode;
        _this.setState({
          arrows: {
            left: nav.scrollLeft > 0,
            right: nav.scrollWidth > nav.clientWidth && nav.scrollLeft + nav.clientWidth < nav.scrollWidth
          }
        });
      }, _this.scrollNavigation = function (factor) {
        var oldScrollLeft = _this.navigationNode.scrollLeft;
        _this.navigationNode.scrollLeft += factor * _this.navigationNode.clientWidth;
        if (_this.navigationNode.scrollLeft !== oldScrollLeft) {
          _this.updateArrows();
        }
      }, _this.scrollRight = function () {
        return _this.scrollNavigation(-1);
      }, _this.scrollLeft = function () {
        return _this.scrollNavigation(+1);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Tabs, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.updatePointer(nextProps.index);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        clearTimeout(this.resizeTimeout);
      }
    }, {
      key: 'parseChildren',
      value: function parseChildren() {
        var _this2 = this;

        var headers = [];
        var contents = [];

        _react2.default.Children.forEach(this.props.children, function (item) {
          if (item.type === Tab) {
            headers.push(item);
            if (item.props.children) {
              contents.push(_react2.default.createElement(TabContent, { children: item.props.children, theme: _this2.props.theme }));
            }
          } else if (item.type === TabContent) {
            contents.push(item);
          }
        });

        return { headers: headers, contents: contents };
      }
    }, {
      key: 'renderHeaders',
      value: function renderHeaders(headers) {
        var _this3 = this;

        return headers.map(function (item, idx) {
          return _react2.default.cloneElement(item, {
            id: idx,
            key: idx,
            theme: _this3.props.theme,
            active: _this3.props.index === idx,
            onClick: function onClick(event) {
              _this3.handleHeaderClick(event);
              item.props.onClick && item.props.onClick(event);
            }
          });
        });
      }
    }, {
      key: 'renderContents',
      value: function renderContents(contents) {
        var _this4 = this;

        var contentElements = contents.map(function (item, idx) {
          return _react2.default.cloneElement(item, {
            key: idx,
            theme: _this4.props.theme,
            active: _this4.props.index === idx,
            hidden: _this4.props.index !== idx && _this4.props.hideMode === 'display',
            tabIndex: idx
          });
        });

        return this.props.hideMode === 'display' ? contentElements : contentElements.filter(function (item, idx) {
          return idx === _this4.props.index;
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _classnames2,
            _this5 = this;

        var _props = this.props,
            className = _props.className,
            disableAnimatedBottomBorder = _props.disableAnimatedBottomBorder,
            theme = _props.theme,
            fixed = _props.fixed,
            inverse = _props.inverse;
        var _state$arrows = this.state.arrows,
            hasLeftArrow = _state$arrows.left,
            hasRightArrow = _state$arrows.right;

        var _parseChildren = this.parseChildren(),
            headers = _parseChildren.headers,
            contents = _parseChildren.contents;

        var classNamePointer = (0, _classnames4.default)(theme.pointer, _defineProperty({}, theme.disableAnimation, disableAnimatedBottomBorder));

        var classNames = (0, _classnames4.default)(theme.tabs, (_classnames2 = {}, _defineProperty(_classnames2, theme.fixed, fixed), _defineProperty(_classnames2, theme.inverse, inverse), _classnames2), className);

        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'tabs', className: classNames },
          _react2.default.createElement(
            'div',
            { className: theme.navigationContainer },
            hasLeftArrow && _react2.default.createElement(
              'div',
              { className: theme.arrowContainer, onClick: this.scrollRight },
              _react2.default.createElement(FontIcon, { className: theme.arrow, value: 'keyboard_arrow_left' })
            ),
            _react2.default.createElement(
              'nav',
              { className: theme.navigation, ref: function ref(node) {
                  _this5.navigationNode = node;
                } },
              this.renderHeaders(headers),
              _react2.default.createElement('span', { className: classNamePointer, style: this.state.pointer })
            ),
            hasRightArrow && _react2.default.createElement(
              'div',
              { className: theme.arrowContainer, onClick: this.scrollLeft },
              _react2.default.createElement(FontIcon, { className: theme.arrow, value: 'keyboard_arrow_right' })
            )
          ),
          this.renderContents(contents)
        );
      }
    }]);

    return Tabs;
  }(_react.Component);

  Tabs.propTypes = {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    disableAnimatedBottomBorder: _react.PropTypes.bool,
    fixed: _react.PropTypes.bool,
    hideMode: _react.PropTypes.oneOf(['display', 'unmounted']),
    index: _react.PropTypes.number,
    inverse: _react.PropTypes.bool,
    onChange: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      arrow: _react.PropTypes.string,
      arrowContainer: _react.PropTypes.string,
      disableAnimation: _react.PropTypes.string,
      fixed: _react.PropTypes.string,
      inverse: _react.PropTypes.string,
      navigation: _react.PropTypes.string,
      navigationContainer: _react.PropTypes.string,
      pointer: _react.PropTypes.string,
      tabs: _react.PropTypes.string
    })
  };
  Tabs.defaultProps = {
    index: 0,
    fixed: false,
    inverse: false,
    hideMode: 'unmounted'
  };


  return Tabs;
};

var Tabs = factory(_Tab2.default, _TabContent2.default, _FontIcon2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.TABS)(Tabs);
exports.tabsFactory = factory;
exports.Tabs = Tabs;
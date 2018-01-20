'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavDrawer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NavDrawer = function NavDrawer(_ref) {
  var _classnames;

  var active = _ref.active,
      children = _ref.children,
      className = _ref.className,
      onOverlayClick = _ref.onOverlayClick,
      permanentAt = _ref.permanentAt,
      pinned = _ref.pinned,
      scrollY = _ref.scrollY,
      theme = _ref.theme,
      width = _ref.width;

  var rootClasses = (0, _classnames4.default)([theme.navDrawer], (_classnames = {}, _defineProperty(_classnames, theme[permanentAt + 'Permanent'], permanentAt), _defineProperty(_classnames, theme.wide, width === 'wide'), _defineProperty(_classnames, theme.active, active), _defineProperty(_classnames, theme.pinned, pinned), _classnames), className);

  var drawerClasses = (0, _classnames4.default)(theme.drawerContent, _defineProperty({}, theme.scrollY, scrollY));

  return _react2.default.createElement(
    'div',
    { 'data-react-toolbox': 'nav-drawer', className: rootClasses },
    _react2.default.createElement('div', { 'data-react-toolbox': 'nav-drawer-scrim', className: theme.scrim, onClick: onOverlayClick }),
    _react2.default.createElement(
      'aside',
      { 'data-react-toolbox': 'nav-drawer-content', className: drawerClasses },
      children
    )
  );
};

NavDrawer.propTypes = {
  active: _react.PropTypes.bool,
  children: _react.PropTypes.any,
  className: _react.PropTypes.string,
  onOverlayClick: _react.PropTypes.func,
  permanentAt: _react.PropTypes.oneOf(['sm', 'smTablet', 'md', 'lg', 'lgTablet', 'xl', 'xxl', 'xxxl']),
  pinned: _react.PropTypes.bool,
  scrollY: _react.PropTypes.bool,
  theme: _react.PropTypes.shape({
    active: _react.PropTypes.string,
    drawerContent: _react.PropTypes.string,
    lgPermanent: _react.PropTypes.string,
    lgTabletPermanent: _react.PropTypes.string,
    mdPermanent: _react.PropTypes.string,
    navDrawer: _react.PropTypes.string,
    pinned: _react.PropTypes.string,
    scrim: _react.PropTypes.string,
    scrollY: _react.PropTypes.string,
    smPermanent: _react.PropTypes.string,
    smTabletPermanent: _react.PropTypes.string,
    wide: _react.PropTypes.string,
    xlPermanent: _react.PropTypes.string,
    xxlPermanent: _react.PropTypes.string,
    xxxlPermanent: _react.PropTypes.string
  }),
  width: _react.PropTypes.oneOf(['normal', 'wide'])
};

NavDrawer.defaultProps = {
  active: false,
  className: '',
  scrollY: false,
  width: 'normal'
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(NavDrawer);
exports.NavDrawer = NavDrawer;
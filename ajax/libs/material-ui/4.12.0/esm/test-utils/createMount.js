import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { mount as enzymeMount } from 'enzyme';
/**
 * Can't just mount <React.Fragment>{node}</React.Fragment>
 * because that swallows wrapper.setProps
 *
 * why class component:
 * https://github.com/airbnb/enzyme/issues/2043
 */
// eslint-disable-next-line react/prefer-stateless-function

var Mode = /*#__PURE__*/function (_React$Component) {
  _inherits(Mode, _React$Component);

  var _super = _createSuper(Mode);

  function Mode() {
    _classCallCheck(this, Mode);

    return _super.apply(this, arguments);
  }

  _createClass(Mode, [{
    key: "render",
    value: function render() {
      // Excess props will come from e.g. enzyme setProps
      var _this$props = this.props,
          __element = _this$props.__element,
          __strict = _this$props.__strict,
          other = _objectWithoutProperties(_this$props, ["__element", "__strict"]);

      var Component = __strict ? React.StrictMode : React.Fragment;
      return /*#__PURE__*/React.createElement(Component, null, /*#__PURE__*/React.cloneElement(__element, other));
    }
  }]);

  return Mode;
}(React.Component);

process.env.NODE_ENV !== "production" ? Mode.propTypes = {
  /**
   * this is essentially children. However we can't use children because then
   * using `wrapper.setProps({ children })` would work differently if this component
   * would be the root.
   */
  __element: PropTypes.element.isRequired,
  __strict: PropTypes.bool.isRequired
} : void 0;
var warnedOnce = false; // Generate an enhanced mount function.

export default function createMount() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!warnedOnce) {
    warnedOnce = true;
    console.warn(['Material-UI: the test utils are deprecated, they are no longer present in v5.', 'The helpers were designed to work with enzyme.', 'However, the tests of the core components were moved to react-testing-library.'].join('\n'));
  }

  var _options$mount = options.mount,
      mount = _options$mount === void 0 ? enzymeMount : _options$mount,
      globalStrict = options.strict,
      globalEnzymeOptions = _objectWithoutProperties(options, ["mount", "strict"]);

  var attachTo = document.createElement('div');
  attachTo.className = 'app';
  attachTo.setAttribute('id', 'app');
  document.body.insertBefore(attachTo, document.body.firstChild);

  var mountWithContext = function mountWithContext(node) {
    var localOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _localOptions$disable = localOptions.disableUnnmount,
        disableUnnmount = _localOptions$disable === void 0 ? false : _localOptions$disable,
        _localOptions$strict = localOptions.strict,
        strict = _localOptions$strict === void 0 ? globalStrict : _localOptions$strict,
        localEnzymeOptions = _objectWithoutProperties(localOptions, ["disableUnnmount", "strict"]);

    if (!disableUnnmount) {
      ReactDOM.unmountComponentAtNode(attachTo);
    } // some tests require that no other components are in the tree
    // e.g. when doing .instance(), .state() etc.


    return mount(strict == null ? node : /*#__PURE__*/React.createElement(Mode, {
      __element: node,
      __strict: Boolean(strict)
    }), _extends({
      attachTo: attachTo
    }, globalEnzymeOptions, localEnzymeOptions));
  };

  mountWithContext.attachTo = attachTo;

  mountWithContext.cleanUp = function () {
    ReactDOM.unmountComponentAtNode(attachTo);
    attachTo.parentElement.removeChild(attachTo);
  };

  return mountWithContext;
}
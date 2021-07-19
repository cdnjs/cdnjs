import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { exactProp, refType } from '@material-ui/utils';
import setRef from '../utils/setRef';
var warnedOnce = false;
/**
 * ⚠️⚠️⚠️
 * If you want the DOM element of a Material-UI component check out
 * [FAQ: How can I access the DOM element?](/getting-started/faq/#how-can-i-access-the-dom-element)
 * first.
 *
 * This component uses `findDOMNode` which is deprecated in React.StrictMode.
 *
 * Helper component to allow attaching a ref to a
 * wrapped element to access the underlying DOM element.
 *
 * It's highly inspired by https://github.com/facebook/react/issues/11401#issuecomment-340543801.
 * For example:
 * ```jsx
 * import React from 'react';
 * import RootRef from '@material-ui/core/RootRef';
 *
 * function MyComponent() {
 *   const domRef = React.useRef();
 *
 *   React.useEffect(() => {
 *     console.log(domRef.current); // DOM node
 *   }, []);
 *
 *   return (
 *     <RootRef rootRef={domRef}>
 *       <SomeChildComponent />
 *     </RootRef>
 *   );
 * }
 * ```
 *
 * @deprecated
 */

var RootRef = /*#__PURE__*/function (_React$Component) {
  _inherits(RootRef, _React$Component);

  var _super = _createSuper(RootRef);

  function RootRef() {
    _classCallCheck(this, RootRef);

    return _super.apply(this, arguments);
  }

  _createClass(RootRef, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ref = ReactDOM.findDOMNode(this);
      setRef(this.props.rootRef, this.ref);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var ref = ReactDOM.findDOMNode(this);

      if (prevProps.rootRef !== this.props.rootRef || this.ref !== ref) {
        if (prevProps.rootRef !== this.props.rootRef) {
          setRef(prevProps.rootRef, null);
        }

        this.ref = ref;
        setRef(this.props.rootRef, this.ref);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.ref = null;
      setRef(this.props.rootRef, null);
    }
  }, {
    key: "render",
    value: function render() {
      if (process.env.NODE_ENV !== 'production') {
        if (!warnedOnce) {
          warnedOnce = true;
          console.warn(['Material-UI: The RootRef component is deprecated.', 'The component relies on the ReactDOM.findDOMNode API which is deprecated in React.StrictMode.', 'Instead, you can get a reference to the underlying DOM node of the components via the `ref` prop.'].join('/n'));
        }
      }

      return this.props.children;
    }
  }]);

  return RootRef;
}(React.Component);

process.env.NODE_ENV !== "production" ? RootRef.propTypes = {
  /**
   * The wrapped element.
   */
  children: PropTypes.element.isRequired,

  /**
   * A ref that points to the first DOM node of the wrapped element.
   */
  rootRef: refType.isRequired
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV !== "production" ? RootRef.propTypes = exactProp(RootRef.propTypes) : void 0;
}

export default RootRef;
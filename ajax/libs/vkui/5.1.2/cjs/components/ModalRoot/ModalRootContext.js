"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalRootContext = void 0;
exports.useModalRegistry = useModalRegistry;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var React = _interopRequireWildcard(require("react"));
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var ModalRootContext = /*#__PURE__*/React.createContext({
  updateModalHeight: function updateModalHeight() {
    return undefined;
  },
  registerModal: function registerModal() {
    return undefined;
  },
  isInsideModal: false
});

/**
 * All referenced elements must be static
 */
exports.ModalRootContext = ModalRootContext;
function useModalRegistry(id, type) {
  var modalContext = React.useContext(ModalRootContext);
  var elements = React.useRef({}).current;
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (id !== undefined) {
      modalContext.registerModal((0, _objectSpread3.default)((0, _objectSpread3.default)({}, elements), {}, {
        type: type,
        id: id
      }));
      // unset refs on  unmount to prevent leak
      var reset = Object.keys(elements).reduce(function (acc, k) {
        return (0, _objectSpread3.default)((0, _objectSpread3.default)({}, acc), {}, (0, _defineProperty2.default)({}, k, null));
      }, {
        type: type,
        id: id
      });
      return function () {
        return modalContext.registerModal(reset);
      };
    }
    return undefined;
  }, []);
  var refs = React.useRef({
    modalElement: function modalElement(e) {
      return elements.modalElement = e;
    },
    innerElement: function innerElement(e) {
      return elements.innerElement = e;
    },
    headerElement: function headerElement(e) {
      return elements.headerElement = e;
    },
    contentElement: function contentElement(e) {
      return elements.contentElement = e;
    }
  }).current;
  return {
    refs: refs
  };
}
//# sourceMappingURL=ModalRootContext.js.map
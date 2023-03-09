import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import * as React from 'react';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
export var ModalRootContext = /*#__PURE__*/React.createContext({
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
export function useModalRegistry(id, type) {
  var modalContext = React.useContext(ModalRootContext);
  var elements = React.useRef({}).current;
  useIsomorphicLayoutEffect(function () {
    if (id !== undefined) {
      modalContext.registerModal(_objectSpread(_objectSpread({}, elements), {}, {
        type: type,
        id: id
      }));
      // unset refs on  unmount to prevent leak
      var reset = Object.keys(elements).reduce(function (acc, k) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, k, null));
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
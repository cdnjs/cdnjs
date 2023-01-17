import _defineProperty from "@babel/runtime/helpers/defineProperty";
import * as React from 'react';
import { useExternRef } from './useExternRef';
import { warnOnce } from '../lib/warnOnce';
import { useEffectDev } from './useEffectDev';
var isDOMTypeElement = function isDOMTypeElement(element) {
  return typeof element.type === 'string';
};
var warn = warnOnce('usePatchChildrenRef');
export var usePatchChildrenRef = function usePatchChildrenRef(children) {
  var childRef = /*#__PURE__*/React.isValidElement(children) && (isDOMTypeElement(children) ? children.ref : children.props.getRootRef);
  var patchedRef = useExternRef(childRef);
  useEffectDev(function () {
    if (!patchedRef.current) {
      warn('Кажется, в children передан компонент, который не поддерживает свойство getRootRef. Мы не можем получить ссылку на корневой dom-элемент этого компонента', 'error');
    }
  }, [children === null || children === void 0 ? void 0 : children.type, patchedRef]);
  return [patchedRef, /*#__PURE__*/React.isValidElement(children) ? /*#__PURE__*/React.cloneElement(children, _defineProperty({}, isDOMTypeElement(children) ? 'ref' : 'getRootRef', patchedRef)) : children];
};
//# sourceMappingURL=usePatchChildrenRef.js.map
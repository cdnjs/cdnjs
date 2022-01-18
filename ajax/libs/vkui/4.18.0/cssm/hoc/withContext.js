import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createScopedElement } from "../lib/jsxRuntime";
import * as React from 'react';
export function withContext(Component, Ctx, prop) {
  function WithContext(props) {
    var context = React.useContext(Ctx); // @ts-ignore

    return createScopedElement(Component, _extends({}, props, _defineProperty({}, prop, context)));
  }

  return WithContext;
}
//# sourceMappingURL=withContext.js.map
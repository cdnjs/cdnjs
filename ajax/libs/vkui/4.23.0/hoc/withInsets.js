import _extends from "@babel/runtime/helpers/extends";
import { createScopedElement } from "../lib/jsxRuntime";
import { useInsets } from "../hooks/useInsets";
export function withInsets(Component) {
  function WithInsets(props) {
    var insets = useInsets(); // @ts-ignore

    return createScopedElement(Component, _extends({}, props, {
      insets: insets
    }));
  }

  return WithInsets;
}
//# sourceMappingURL=withInsets.js.map
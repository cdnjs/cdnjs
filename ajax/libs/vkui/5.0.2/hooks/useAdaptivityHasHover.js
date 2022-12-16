import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from "react";
import { hasHover as hasHoverLib } from "@vkontakte/vkjs";
import { AdaptivityContext } from "../components/AdaptivityProvider/AdaptivityContext";

/**
 * Определение происходит с помощью `window.matchMedia`. Для того, чтобы не было ошибок при гидратации, по умолчанию
 * откладываем определение на второй рендер.
 *
 * [No SSR] Если передать `false`, то определение будет сразу.
 */

export function useAdaptivityHasHover() {
  var deferDetect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var _React$useContext = React.useContext(AdaptivityContext),
    hasHoverContext = _React$useContext.hasHover;
  var _React$useState = React.useState(function () {
      return !deferDetect && hasHoverContext === undefined ? hasHoverLib : hasHoverContext;
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    hasHover = _React$useState2[0],
    setHasHover = _React$useState2[1];
  React.useEffect(function () {
    setHasHover(function (prevHasHover) {
      var newHasHover = hasHoverContext === undefined ? hasHoverLib : hasHoverContext;
      return prevHasHover === newHasHover ? prevHasHover : newHasHover;
    });
  }, [hasHoverContext]);
  return hasHover;
}
//# sourceMappingURL=useAdaptivityHasHover.js.map
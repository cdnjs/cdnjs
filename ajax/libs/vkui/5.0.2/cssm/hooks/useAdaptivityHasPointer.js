import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from "react";
import { hasMouse as hasPointerLib } from "@vkontakte/vkjs";
import { AdaptivityContext } from "../components/AdaptivityProvider/AdaptivityContext";

/**
 * Определение происходит с помощью `window.matchMedia`. Для того, чтобы не было ошибок при гидратации, по умолчанию
 * откладываем определение на второй рендер.
 *
 * [No SSR] Если передать `false`, то определение будет сразу.
 */

export function useAdaptivityHasPointer() {
  var deferDetect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var _React$useContext = React.useContext(AdaptivityContext),
    hasPointerContext = _React$useContext.hasPointer;
  var _React$useState = React.useState(function () {
      return !deferDetect && hasPointerContext === undefined ? hasPointerLib : hasPointerContext;
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    hasPointer = _React$useState2[0],
    setHasPointer = _React$useState2[1];
  React.useEffect(function () {
    setHasPointer(function (prevHasPointer) {
      var newHasHover = hasPointerContext === undefined ? hasPointerLib : hasPointerContext;
      return prevHasPointer === newHasHover ? prevHasPointer : newHasHover;
    });
  }, [hasPointerContext]);
  return hasPointer;
}
//# sourceMappingURL=useAdaptivityHasPointer.js.map
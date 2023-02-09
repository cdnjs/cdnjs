import * as React from 'react';
import { hasMouse as hasPointerLib } from '@vkontakte/vkjs';
import { AdaptivityContext } from '../components/AdaptivityProvider/AdaptivityContext';
import { useIsClient } from './useIsClient';

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
  var hasPointer = hasPointerContext === undefined ? hasPointerLib : hasPointerContext;
  var isClient = useIsClient(!deferDetect);
  if (!isClient) {
    return undefined;
  }
  return hasPointer;
}
//# sourceMappingURL=useAdaptivityHasPointer.js.map
import * as React from 'react';
import { hasHover as hasHoverLib } from '@vkontakte/vkjs';
import { AdaptivityContext } from '../components/AdaptivityProvider/AdaptivityContext';
import { useIsClient } from './useIsClient';

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
  var hasHover = hasHoverContext === undefined ? hasHoverLib : hasHoverContext;
  var isClient = useIsClient(!deferDetect);
  if (!isClient) {
    return undefined;
  }
  return hasHover;
}
//# sourceMappingURL=useAdaptivityHasHover.js.map
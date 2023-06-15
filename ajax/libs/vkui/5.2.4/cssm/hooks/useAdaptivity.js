import * as React from 'react';
import { AdaptivityContext } from '../components/AdaptivityProvider/AdaptivityContext';
/**
 * Возвращает сырые данные из AdaptivityProvider.
 */
export var useAdaptivity = function useAdaptivity() {
  return React.useContext(AdaptivityContext);
};
//# sourceMappingURL=useAdaptivity.js.map
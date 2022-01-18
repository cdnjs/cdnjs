import * as React from 'react';
import { ConfigProviderContext } from "../components/ConfigProvider/ConfigProviderContext";
export var useAppearance = function useAppearance() {
  return React.useContext(ConfigProviderContext).appearance;
};
//# sourceMappingURL=useAppearance.js.map
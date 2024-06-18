import * as React from 'react';
import { NavPanelIdContext, NavViewIdContext } from './NavIdContext';
export const useNavId = ()=>({
        view: React.useContext(NavViewIdContext),
        panel: React.useContext(NavPanelIdContext)
    });

//# sourceMappingURL=useNavId.js.map
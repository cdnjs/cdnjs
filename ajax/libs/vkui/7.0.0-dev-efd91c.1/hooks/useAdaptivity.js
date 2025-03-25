import * as React from "react";
import { AdaptivityContext } from "../components/AdaptivityProvider/AdaptivityContext.js";
/**
 * Возвращает сырые данные из AdaptivityProvider.
 */ export const useAdaptivity = ()=>{
    return React.useContext(AdaptivityContext);
};

//# sourceMappingURL=useAdaptivity.js.map
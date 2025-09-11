import * as React from "react";
import { AdaptivityContext } from "../components/AdaptivityProvider/AdaptivityContext.js";
/**
 * Хук из контекста возвращает свойства, переданные в `AdaptivityProvider`.
 */ export const useAdaptivity = ()=>{
    return React.useContext(AdaptivityContext);
};

//# sourceMappingURL=useAdaptivity.js.map
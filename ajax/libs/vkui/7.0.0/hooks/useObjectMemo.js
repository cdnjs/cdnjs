import * as React from "react";
import { isEqual } from "@vkontakte/vkjs";
/**
 * @deprecated используйте React.useMemo
 */ export function useObjectMemo(object) {
    /**
   * Запись и чтение во время рендеринга в useRef запрещена
   */ const cache = React.useRef(object);
    if (!isEqual(cache.current, object)) {
        cache.current = object;
    }
    return cache.current;
}

//# sourceMappingURL=useObjectMemo.js.map
import * as React from "react";
export var SplitColContext = /*#__PURE__*/ React.createContext({
    colRef: null,
    animate: true
});
export var useSplitCol = function() {
    return React.useContext(SplitColContext);
};

//# sourceMappingURL=SplitColContext.js.map
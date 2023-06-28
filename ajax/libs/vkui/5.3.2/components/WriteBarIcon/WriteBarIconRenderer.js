import * as React from "react";
import { useAdaptivityConditionalRender } from "../../hooks/useAdaptivityConditionalRender";
export var WriteBarIconRenderer = function(param) {
    var IconCompact = param.IconCompact, IconRegular = param.IconRegular;
    var sizeY = useAdaptivityConditionalRender().sizeY;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, sizeY.compact && /*#__PURE__*/ React.createElement(IconCompact, {
        className: sizeY.compact.className
    }), sizeY.regular && /*#__PURE__*/ React.createElement(IconRegular, {
        className: sizeY.regular.className
    }));
};

//# sourceMappingURL=WriteBarIconRenderer.js.map
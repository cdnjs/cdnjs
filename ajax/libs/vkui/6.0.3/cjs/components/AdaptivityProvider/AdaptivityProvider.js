"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdaptivityProvider", {
    enumerable: true,
    get: function() {
        return AdaptivityProvider;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _adaptivity = require("../../lib/adaptivity");
const _AdaptivityContext = require("./AdaptivityContext");
const AdaptivityProvider = ({ viewWidth, viewHeight, sizeX: sizeXProp, sizeY: sizeYProp, hasPointer, hasHover, children })=>{
    const adaptivity = _react.useMemo(()=>{
        const nextProps = {
            viewWidth,
            viewHeight,
            sizeX: sizeXProp,
            sizeY: sizeYProp,
            hasPointer,
            hasHover
        };
        if (sizeXProp === undefined && viewWidth !== undefined) {
            nextProps.sizeX = (0, _adaptivity.getSizeX)(viewWidth);
        }
        if (sizeYProp === undefined) {
            if ((0, _adaptivity.isCompactByViewWidth)(viewWidth, hasPointer) || (0, _adaptivity.isCompactByViewHeight)(viewHeight)) {
                nextProps.sizeY = 'compact';
            } else if (viewWidth !== undefined || viewHeight !== undefined) {
                nextProps.sizeY = 'regular';
            }
        }
        return nextProps;
    }, [
        viewWidth,
        viewHeight,
        sizeXProp,
        sizeYProp,
        hasPointer,
        hasHover
    ]);
    return /*#__PURE__*/ _react.createElement(_AdaptivityContext.AdaptivityContext.Provider, {
        value: adaptivity
    }, children);
};

//# sourceMappingURL=AdaptivityProvider.js.map
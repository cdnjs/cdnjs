"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeUnitEnum = exports.ResponsiveMode = exports.ItemType = exports.JsonValue = exports.LogicalZIndexToDefaultMap = exports.LogicalZIndex = exports.Side = exports.WidthOrHeightPropertyName = void 0;
const internal_error_1 = require("../errors/internal-error");
const style_constants_1 = require("./style-constants");
/** @internal */
var WidthOrHeightPropertyName;
(function (WidthOrHeightPropertyName) {
    WidthOrHeightPropertyName.width = 'width';
    WidthOrHeightPropertyName.height = 'height';
})(WidthOrHeightPropertyName = exports.WidthOrHeightPropertyName || (exports.WidthOrHeightPropertyName = {}));
/** @public */
var Side;
(function (Side) {
    Side.top = 'top';
    Side.left = 'left';
    Side.right = 'right';
    Side.bottom = 'bottom';
})(Side = exports.Side || (exports.Side = {}));
/** @public */
var LogicalZIndex;
(function (LogicalZIndex) {
    LogicalZIndex.base = 'base';
    LogicalZIndex.drag = 'drag';
    LogicalZIndex.stackMaximised = 'stackMaximised';
})(LogicalZIndex = exports.LogicalZIndex || (exports.LogicalZIndex = {}));
/** @public */
exports.LogicalZIndexToDefaultMap = {
    base: style_constants_1.StyleConstants.defaultComponentBaseZIndex,
    drag: style_constants_1.StyleConstants.defaultComponentDragZIndex,
    stackMaximised: style_constants_1.StyleConstants.defaultComponentStackMaximisedZIndex,
};
/** @public */
var JsonValue;
(function (JsonValue) {
    function isJson(value) {
        return isJsonObject(value);
    }
    JsonValue.isJson = isJson;
    // eslint-disable-next-line @typescript-eslint/ban-types
    function isJsonObject(value) {
        return !Array.isArray(value) && value !== null && typeof value === 'object';
    }
    JsonValue.isJsonObject = isJsonObject;
})(JsonValue = exports.JsonValue || (exports.JsonValue = {}));
/** @public */
var ItemType;
(function (ItemType) {
    ItemType.ground = 'ground';
    ItemType.row = 'row';
    ItemType.column = 'column';
    ItemType.stack = 'stack';
    ItemType.component = 'component';
})(ItemType = exports.ItemType || (exports.ItemType = {}));
/** @public */
var ResponsiveMode;
(function (ResponsiveMode) {
    ResponsiveMode.none = 'none';
    ResponsiveMode.always = 'always';
    ResponsiveMode.onload = 'onload';
})(ResponsiveMode = exports.ResponsiveMode || (exports.ResponsiveMode = {}));
/** @public */
var SizeUnitEnum;
(function (SizeUnitEnum) {
    SizeUnitEnum["Pixel"] = "px";
    SizeUnitEnum["Percent"] = "%";
    SizeUnitEnum["Fractional"] = "fr";
    SizeUnitEnum["Em"] = "em";
})(SizeUnitEnum = exports.SizeUnitEnum || (exports.SizeUnitEnum = {}));
/** @public */
(function (SizeUnitEnum) {
    function tryParse(value) {
        switch (value) {
            case SizeUnitEnum.Pixel: return SizeUnitEnum.Pixel;
            case SizeUnitEnum.Percent: return SizeUnitEnum.Percent;
            case SizeUnitEnum.Fractional: return SizeUnitEnum.Fractional;
            case SizeUnitEnum.Em: return SizeUnitEnum.Em;
            default: return undefined;
        }
    }
    SizeUnitEnum.tryParse = tryParse;
    function format(value) {
        switch (value) {
            case SizeUnitEnum.Pixel: return SizeUnitEnum.Pixel;
            case SizeUnitEnum.Percent: return SizeUnitEnum.Percent;
            case SizeUnitEnum.Fractional: return SizeUnitEnum.Fractional;
            case SizeUnitEnum.Em: return SizeUnitEnum.Em;
            default:
                throw new internal_error_1.UnreachableCaseError('SUEF44998', value);
        }
    }
    SizeUnitEnum.format = format;
})(SizeUnitEnum = exports.SizeUnitEnum || (exports.SizeUnitEnum = {}));
//# sourceMappingURL=types.js.map
import { UnreachableCaseError } from '../errors/internal-error';
import { StyleConstants } from './style-constants';
/** @internal */
export var WidthOrHeightPropertyName;
(function (WidthOrHeightPropertyName) {
    WidthOrHeightPropertyName.width = 'width';
    WidthOrHeightPropertyName.height = 'height';
})(WidthOrHeightPropertyName || (WidthOrHeightPropertyName = {}));
/** @public */
export var Side;
(function (Side) {
    Side.top = 'top';
    Side.left = 'left';
    Side.right = 'right';
    Side.bottom = 'bottom';
})(Side || (Side = {}));
/** @public */
export var LogicalZIndex;
(function (LogicalZIndex) {
    LogicalZIndex.base = 'base';
    LogicalZIndex.drag = 'drag';
    LogicalZIndex.stackMaximised = 'stackMaximised';
})(LogicalZIndex || (LogicalZIndex = {}));
/** @public */
export const LogicalZIndexToDefaultMap = {
    base: StyleConstants.defaultComponentBaseZIndex,
    drag: StyleConstants.defaultComponentDragZIndex,
    stackMaximised: StyleConstants.defaultComponentStackMaximisedZIndex,
};
/** @public */
export var JsonValue;
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
})(JsonValue || (JsonValue = {}));
/** @public */
export var ItemType;
(function (ItemType) {
    ItemType.ground = 'ground';
    ItemType.row = 'row';
    ItemType.column = 'column';
    ItemType.stack = 'stack';
    ItemType.component = 'component';
})(ItemType || (ItemType = {}));
/** @public */
export var ResponsiveMode;
(function (ResponsiveMode) {
    ResponsiveMode.none = 'none';
    ResponsiveMode.always = 'always';
    ResponsiveMode.onload = 'onload';
})(ResponsiveMode || (ResponsiveMode = {}));
/** @public */
export var SizeUnitEnum;
(function (SizeUnitEnum) {
    SizeUnitEnum["Pixel"] = "px";
    SizeUnitEnum["Percent"] = "%";
    SizeUnitEnum["Fractional"] = "fr";
    SizeUnitEnum["Em"] = "em";
})(SizeUnitEnum || (SizeUnitEnum = {}));
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
                throw new UnreachableCaseError('SUEF44998', value);
        }
    }
    SizeUnitEnum.format = format;
})(SizeUnitEnum || (SizeUnitEnum = {}));
//# sourceMappingURL=types.js.map
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
//# sourceMappingURL=types.js.map
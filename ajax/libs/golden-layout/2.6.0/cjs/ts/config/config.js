"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUndefinableSize = exports.formatSize = exports.parseSize = exports.PopoutLayoutConfig = exports.LayoutConfig = exports.RootItemConfig = exports.RowOrColumnItemConfig = exports.ComponentItemConfig = exports.StackItemConfig = exports.HeaderedItemConfig = exports.ItemConfig = void 0;
const external_error_1 = require("../errors/external-error");
const internal_error_1 = require("../errors/internal-error");
const i18n_strings_1 = require("../utils/i18n-strings");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
const resolved_config_1 = require("./resolved-config");
/** @public */
var ItemConfig;
(function (ItemConfig) {
    /** @internal */
    function resolve(itemConfig, rowAndColumnChildLegacySizeDefault) {
        switch (itemConfig.type) {
            case types_1.ItemType.ground:
                throw new external_error_1.ConfigurationError('ItemConfig cannot specify type ground', JSON.stringify(itemConfig));
            case types_1.ItemType.row:
            case types_1.ItemType.column:
                return RowOrColumnItemConfig.resolve(itemConfig, rowAndColumnChildLegacySizeDefault);
            case types_1.ItemType.stack:
                return StackItemConfig.resolve(itemConfig, rowAndColumnChildLegacySizeDefault);
            case types_1.ItemType.component:
                return ComponentItemConfig.resolve(itemConfig, rowAndColumnChildLegacySizeDefault);
            default:
                throw new internal_error_1.UnreachableCaseError('UCUICR55499', itemConfig.type);
        }
    }
    ItemConfig.resolve = resolve;
    /** @internal */
    function resolveContent(content) {
        if (content === undefined) {
            return [];
        }
        else {
            const count = content.length;
            const result = new Array(count);
            for (let i = 0; i < count; i++) {
                result[i] = ItemConfig.resolve(content[i], false);
            }
            return result;
        }
    }
    ItemConfig.resolveContent = resolveContent;
    /** @internal */
    function resolveId(id) {
        if (id === undefined) {
            return resolved_config_1.ResolvedItemConfig.defaults.id;
        }
        else {
            if (Array.isArray(id)) {
                if (id.length === 0) {
                    return resolved_config_1.ResolvedItemConfig.defaults.id;
                }
                else {
                    return id[0];
                }
            }
            else {
                return id;
            }
        }
    }
    ItemConfig.resolveId = resolveId;
    /** @internal */
    function resolveSize(size, width, height, rowAndColumnChildLegacySizeDefault) {
        // Remove support for rowAndColumnChildLegacySizeDefault in a major version release
        if (size !== undefined) {
            return parseSize(size, [types_1.SizeUnitEnum.Percent, types_1.SizeUnitEnum.Fractional]);
        }
        else {
            if (width !== undefined || height !== undefined) {
                if (width !== undefined) {
                    return { size: width, sizeUnit: types_1.SizeUnitEnum.Percent };
                }
                else {
                    if (height !== undefined) {
                        return { size: height, sizeUnit: types_1.SizeUnitEnum.Percent };
                    }
                    else {
                        throw new internal_error_1.UnexpectedUndefinedError('CRS33390');
                    }
                }
            }
            else {
                if (rowAndColumnChildLegacySizeDefault) {
                    return { size: 50, sizeUnit: types_1.SizeUnitEnum.Percent };
                }
                else {
                    return { size: resolved_config_1.ResolvedItemConfig.defaults.size, sizeUnit: resolved_config_1.ResolvedItemConfig.defaults.sizeUnit };
                }
            }
        }
    }
    ItemConfig.resolveSize = resolveSize;
    /** @internal */
    function resolveMinSize(minSize, minWidth, minHeight) {
        if (minSize !== undefined) {
            return parseSize(minSize, [types_1.SizeUnitEnum.Pixel]);
        }
        else {
            const minWidthDefined = minWidth !== undefined;
            const minHeightDefined = minHeight !== undefined;
            if (minWidthDefined || minHeightDefined) {
                if (minWidthDefined) {
                    return { size: minWidth, sizeUnit: types_1.SizeUnitEnum.Pixel };
                }
                else {
                    return { size: minHeight, sizeUnit: types_1.SizeUnitEnum.Pixel };
                }
            }
            else {
                return { size: resolved_config_1.ResolvedItemConfig.defaults.minSize, sizeUnit: resolved_config_1.ResolvedItemConfig.defaults.minSizeUnit };
            }
        }
    }
    ItemConfig.resolveMinSize = resolveMinSize;
    /** @internal */
    function calculateSizeWidthHeightSpecificationType(config) {
        if (config.size !== undefined) {
            return 1 /* Size */;
        }
        else {
            if (config.width !== undefined || config.height !== undefined) {
                return 2 /* WidthOrHeight */;
            }
            else {
                return 0 /* None */;
            }
        }
    }
    ItemConfig.calculateSizeWidthHeightSpecificationType = calculateSizeWidthHeightSpecificationType;
    function isGround(config) {
        return config.type === types_1.ItemType.ground;
    }
    ItemConfig.isGround = isGround;
    function isRow(config) {
        return config.type === types_1.ItemType.row;
    }
    ItemConfig.isRow = isRow;
    function isColumn(config) {
        return config.type === types_1.ItemType.column;
    }
    ItemConfig.isColumn = isColumn;
    function isStack(config) {
        return config.type === types_1.ItemType.stack;
    }
    ItemConfig.isStack = isStack;
    function isComponent(config) {
        return config.type === types_1.ItemType.component;
    }
    ItemConfig.isComponent = isComponent;
})(ItemConfig = exports.ItemConfig || (exports.ItemConfig = {}));
/** @public */
var HeaderedItemConfig;
(function (HeaderedItemConfig) {
    const legacyMaximisedId = '__glMaximised';
    let Header;
    (function (Header) {
        function resolve(header, hasHeaders) {
            var _a;
            if (header === undefined && hasHeaders === undefined) {
                return undefined;
            }
            else {
                const result = {
                    show: (_a = header === null || header === void 0 ? void 0 : header.show) !== null && _a !== void 0 ? _a : (hasHeaders === undefined ? undefined : hasHeaders ? resolved_config_1.ResolvedLayoutConfig.Header.defaults.show : false),
                    popout: header === null || header === void 0 ? void 0 : header.popout,
                    maximise: header === null || header === void 0 ? void 0 : header.maximise,
                    close: header === null || header === void 0 ? void 0 : header.close,
                    minimise: header === null || header === void 0 ? void 0 : header.minimise,
                    tabDropdown: header === null || header === void 0 ? void 0 : header.tabDropdown,
                };
                return result;
            }
        }
        Header.resolve = resolve;
    })(Header = HeaderedItemConfig.Header || (HeaderedItemConfig.Header = {}));
    /** @internal */
    function resolveIdAndMaximised(config) {
        let id;
        // To support legacy configs with Id saved as an array of string, assign config.id to a type which includes string array
        let legacyId = config.id;
        let legacyMaximised = false;
        if (legacyId === undefined) {
            id = resolved_config_1.ResolvedItemConfig.defaults.id;
        }
        else {
            if (Array.isArray(legacyId)) {
                const idx = legacyId.findIndex((id) => id === legacyMaximisedId);
                if (idx > 0) {
                    legacyMaximised = true;
                    legacyId = legacyId.splice(idx, 1);
                }
                if (legacyId.length > 0) {
                    id = legacyId[0];
                }
                else {
                    id = resolved_config_1.ResolvedItemConfig.defaults.id;
                }
            }
            else {
                id = legacyId;
            }
        }
        let maximised;
        if (config.maximised !== undefined) {
            maximised = config.maximised;
        }
        else {
            maximised = legacyMaximised;
        }
        return { id, maximised };
    }
    HeaderedItemConfig.resolveIdAndMaximised = resolveIdAndMaximised;
})(HeaderedItemConfig = exports.HeaderedItemConfig || (exports.HeaderedItemConfig = {}));
/** @public */
var StackItemConfig;
(function (StackItemConfig) {
    /** @internal */
    function resolve(itemConfig, rowAndColumnChildLegacySizeDefault) {
        var _a, _b;
        const { id, maximised } = HeaderedItemConfig.resolveIdAndMaximised(itemConfig);
        const { size, sizeUnit } = ItemConfig.resolveSize(itemConfig.size, itemConfig.width, itemConfig.height, rowAndColumnChildLegacySizeDefault);
        const { size: minSize, sizeUnit: minSizeUnit } = ItemConfig.resolveMinSize(itemConfig.minSize, itemConfig.minWidth, itemConfig.minHeight);
        const result = {
            type: types_1.ItemType.stack,
            content: resolveContent(itemConfig.content),
            size,
            sizeUnit,
            minSize,
            minSizeUnit,
            id,
            maximised,
            isClosable: (_a = itemConfig.isClosable) !== null && _a !== void 0 ? _a : resolved_config_1.ResolvedItemConfig.defaults.isClosable,
            activeItemIndex: (_b = itemConfig.activeItemIndex) !== null && _b !== void 0 ? _b : resolved_config_1.ResolvedStackItemConfig.defaultActiveItemIndex,
            header: HeaderedItemConfig.Header.resolve(itemConfig.header, itemConfig.hasHeaders),
        };
        return result;
    }
    StackItemConfig.resolve = resolve;
    /** @internal */
    function fromResolved(resolvedConfig) {
        const result = {
            type: types_1.ItemType.stack,
            content: fromResolvedContent(resolvedConfig.content),
            size: formatSize(resolvedConfig.size, resolvedConfig.sizeUnit),
            minSize: formatUndefinableSize(resolvedConfig.minSize, resolvedConfig.minSizeUnit),
            id: resolvedConfig.id,
            maximised: resolvedConfig.maximised,
            isClosable: resolvedConfig.isClosable,
            activeItemIndex: resolvedConfig.activeItemIndex,
            header: resolved_config_1.ResolvedHeaderedItemConfig.Header.createCopy(resolvedConfig.header),
        };
        return result;
    }
    StackItemConfig.fromResolved = fromResolved;
    /** @internal */
    function resolveContent(content) {
        if (content === undefined) {
            return [];
        }
        else {
            const count = content.length;
            const result = new Array(count);
            for (let i = 0; i < count; i++) {
                const childItemConfig = content[i];
                const itemConfig = ItemConfig.resolve(childItemConfig, false);
                if (!resolved_config_1.ResolvedItemConfig.isComponentItem(itemConfig)) {
                    throw new internal_error_1.AssertError('UCUSICRC91114', JSON.stringify(itemConfig));
                }
                else {
                    result[i] = itemConfig;
                }
            }
            return result;
        }
    }
    /** @internal */
    function fromResolvedContent(resolvedContent) {
        const count = resolvedContent.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            const resolvedContentConfig = resolvedContent[i];
            result[i] = ComponentItemConfig.fromResolved(resolvedContentConfig);
        }
        return result;
    }
})(StackItemConfig = exports.StackItemConfig || (exports.StackItemConfig = {}));
/** @public */
var ComponentItemConfig;
(function (ComponentItemConfig) {
    /** @internal */
    function resolve(itemConfig, rowAndColumnChildLegacySizeDefault) {
        var _a, _b, _c;
        let componentType = itemConfig.componentType;
        if (componentType === undefined) {
            componentType = itemConfig.componentName;
        }
        if (componentType === undefined) {
            throw new Error('ComponentItemConfig.componentType is undefined');
        }
        else {
            const { id, maximised } = HeaderedItemConfig.resolveIdAndMaximised(itemConfig);
            let title;
            if (itemConfig.title === undefined || itemConfig.title === '') {
                title = ComponentItemConfig.componentTypeToTitle(componentType);
            }
            else {
                title = itemConfig.title;
            }
            const { size, sizeUnit } = ItemConfig.resolveSize(itemConfig.size, itemConfig.width, itemConfig.height, rowAndColumnChildLegacySizeDefault);
            const { size: minSize, sizeUnit: minSizeUnit } = ItemConfig.resolveMinSize(itemConfig.minSize, itemConfig.minWidth, itemConfig.minHeight);
            const result = {
                type: itemConfig.type,
                content: [],
                size,
                sizeUnit,
                minSize,
                minSizeUnit,
                id,
                maximised,
                isClosable: (_a = itemConfig.isClosable) !== null && _a !== void 0 ? _a : resolved_config_1.ResolvedItemConfig.defaults.isClosable,
                reorderEnabled: (_b = itemConfig.reorderEnabled) !== null && _b !== void 0 ? _b : resolved_config_1.ResolvedComponentItemConfig.defaultReorderEnabled,
                title,
                header: HeaderedItemConfig.Header.resolve(itemConfig.header, itemConfig.hasHeaders),
                componentType,
                componentState: (_c = itemConfig.componentState) !== null && _c !== void 0 ? _c : {},
            };
            return result;
        }
    }
    ComponentItemConfig.resolve = resolve;
    /** @internal */
    function fromResolved(resolvedConfig) {
        const result = {
            type: types_1.ItemType.component,
            size: formatSize(resolvedConfig.size, resolvedConfig.sizeUnit),
            minSize: formatUndefinableSize(resolvedConfig.minSize, resolvedConfig.minSizeUnit),
            id: resolvedConfig.id,
            maximised: resolvedConfig.maximised,
            isClosable: resolvedConfig.isClosable,
            reorderEnabled: resolvedConfig.reorderEnabled,
            title: resolvedConfig.title,
            header: resolved_config_1.ResolvedHeaderedItemConfig.Header.createCopy(resolvedConfig.header),
            componentType: resolvedConfig.componentType,
            componentState: (0, utils_1.deepExtendValue)(undefined, resolvedConfig.componentState),
        };
        return result;
    }
    ComponentItemConfig.fromResolved = fromResolved;
    function componentTypeToTitle(componentType) {
        const componentTypeType = typeof componentType;
        switch (componentTypeType) {
            case 'string': return componentType;
            case 'number': return componentType.toString();
            case 'boolean': return componentType.toString();
            default: return '';
        }
    }
    ComponentItemConfig.componentTypeToTitle = componentTypeToTitle;
})(ComponentItemConfig = exports.ComponentItemConfig || (exports.ComponentItemConfig = {}));
/** @public */
var RowOrColumnItemConfig;
(function (RowOrColumnItemConfig) {
    function isChildItemConfig(itemConfig) {
        switch (itemConfig.type) {
            case types_1.ItemType.row:
            case types_1.ItemType.column:
            case types_1.ItemType.stack:
            case types_1.ItemType.component:
                return true;
            case types_1.ItemType.ground:
                return false;
            default:
                throw new internal_error_1.UnreachableCaseError('UROCOSPCICIC13687', itemConfig.type);
        }
    }
    RowOrColumnItemConfig.isChildItemConfig = isChildItemConfig;
    /** @internal */
    function resolve(itemConfig, rowAndColumnChildLegacySizeDefault) {
        var _a;
        const { size, sizeUnit } = ItemConfig.resolveSize(itemConfig.size, itemConfig.width, itemConfig.height, rowAndColumnChildLegacySizeDefault);
        const { size: minSize, sizeUnit: minSizeUnit } = ItemConfig.resolveMinSize(itemConfig.minSize, itemConfig.minWidth, itemConfig.minHeight);
        const result = {
            type: itemConfig.type,
            content: RowOrColumnItemConfig.resolveContent(itemConfig.content),
            size,
            sizeUnit,
            minSize,
            minSizeUnit,
            id: ItemConfig.resolveId(itemConfig.id),
            isClosable: (_a = itemConfig.isClosable) !== null && _a !== void 0 ? _a : resolved_config_1.ResolvedItemConfig.defaults.isClosable,
        };
        return result;
    }
    RowOrColumnItemConfig.resolve = resolve;
    /** @internal */
    function fromResolved(resolvedConfig) {
        const result = {
            type: resolvedConfig.type,
            content: fromResolvedContent(resolvedConfig.content),
            size: formatSize(resolvedConfig.size, resolvedConfig.sizeUnit),
            minSize: formatUndefinableSize(resolvedConfig.minSize, resolvedConfig.minSizeUnit),
            id: resolvedConfig.id,
            isClosable: resolvedConfig.isClosable,
        };
        return result;
    }
    RowOrColumnItemConfig.fromResolved = fromResolved;
    /** @internal */
    function resolveContent(content) {
        if (content === undefined) {
            return [];
        }
        else {
            const count = content.length;
            const childItemConfigs = new Array(count);
            let widthOrHeightSpecifiedAtLeastOnce = false;
            let sizeSpecifiedAtLeastOnce = false;
            for (let i = 0; i < count; i++) {
                const childItemConfig = content[i];
                if (!RowOrColumnItemConfig.isChildItemConfig(childItemConfig)) {
                    throw new external_error_1.ConfigurationError('ItemConfig is not Row, Column or Stack', childItemConfig);
                }
                else {
                    if (!sizeSpecifiedAtLeastOnce) {
                        const sizeWidthHeightSpecificationType = ItemConfig.calculateSizeWidthHeightSpecificationType(childItemConfig);
                        switch (sizeWidthHeightSpecificationType) {
                            case 0 /* None */:
                                break;
                            case 2 /* WidthOrHeight */:
                                widthOrHeightSpecifiedAtLeastOnce = true;
                                break;
                            case 1 /* Size */:
                                sizeSpecifiedAtLeastOnce = true;
                                break;
                            default:
                                throw new internal_error_1.UnreachableCaseError('ROCICRC87556', sizeWidthHeightSpecificationType);
                        }
                    }
                    childItemConfigs[i] = childItemConfig;
                }
            }
            let legacySizeDefault;
            if (sizeSpecifiedAtLeastOnce) {
                legacySizeDefault = false;
            }
            else {
                if (widthOrHeightSpecifiedAtLeastOnce) {
                    legacySizeDefault = true;
                }
                else {
                    legacySizeDefault = false;
                }
            }
            const result = new Array(count);
            for (let i = 0; i < count; i++) {
                const childItemConfig = childItemConfigs[i];
                const resolvedChildItemConfig = ItemConfig.resolve(childItemConfig, legacySizeDefault);
                if (!resolved_config_1.ResolvedRowOrColumnItemConfig.isChildItemConfig(resolvedChildItemConfig)) {
                    throw new internal_error_1.AssertError('UROCOSPIC99512', JSON.stringify(resolvedChildItemConfig));
                }
                else {
                    result[i] = resolvedChildItemConfig;
                }
            }
            return result;
        }
    }
    RowOrColumnItemConfig.resolveContent = resolveContent;
    /** @internal */
    function fromResolvedContent(resolvedContent) {
        const count = resolvedContent.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            const resolvedContentConfig = resolvedContent[i];
            const type = resolvedContentConfig.type;
            let contentConfig;
            switch (type) {
                case types_1.ItemType.row:
                case types_1.ItemType.column:
                    contentConfig = RowOrColumnItemConfig.fromResolved(resolvedContentConfig);
                    break;
                case types_1.ItemType.stack:
                    contentConfig = StackItemConfig.fromResolved(resolvedContentConfig);
                    break;
                case types_1.ItemType.component:
                    contentConfig = ComponentItemConfig.fromResolved(resolvedContentConfig);
                    break;
                default:
                    throw new internal_error_1.UnreachableCaseError('ROCICFRC44797', type);
            }
            result[i] = contentConfig;
        }
        return result;
    }
})(RowOrColumnItemConfig = exports.RowOrColumnItemConfig || (exports.RowOrColumnItemConfig = {}));
/** @public */
var RootItemConfig;
(function (RootItemConfig) {
    function isRootItemConfig(itemConfig) {
        switch (itemConfig.type) {
            case types_1.ItemType.row:
            case types_1.ItemType.column:
            case types_1.ItemType.stack:
            case types_1.ItemType.component:
                return true;
            case types_1.ItemType.ground:
                return false;
            default:
                throw new internal_error_1.UnreachableCaseError('URICIR23687', itemConfig.type);
        }
    }
    RootItemConfig.isRootItemConfig = isRootItemConfig;
    /** @internal */
    function resolve(itemConfig) {
        if (itemConfig === undefined) {
            return undefined;
        }
        else {
            const result = ItemConfig.resolve(itemConfig, false);
            if (!resolved_config_1.ResolvedRootItemConfig.isRootItemConfig(result)) {
                throw new external_error_1.ConfigurationError('ItemConfig is not Row, Column or Stack', JSON.stringify(itemConfig));
            }
            else {
                return result;
            }
        }
    }
    RootItemConfig.resolve = resolve;
    /** @internal */
    function fromResolvedOrUndefined(resolvedItemConfig) {
        if (resolvedItemConfig === undefined) {
            return undefined;
        }
        else {
            const type = resolvedItemConfig.type;
            switch (type) {
                case types_1.ItemType.row:
                case types_1.ItemType.column:
                    return RowOrColumnItemConfig.fromResolved(resolvedItemConfig);
                case types_1.ItemType.stack:
                    return StackItemConfig.fromResolved(resolvedItemConfig);
                case types_1.ItemType.component:
                    return ComponentItemConfig.fromResolved(resolvedItemConfig);
                default:
                    throw new internal_error_1.UnreachableCaseError('RICFROU89921', type);
            }
        }
    }
    RootItemConfig.fromResolvedOrUndefined = fromResolvedOrUndefined;
})(RootItemConfig = exports.RootItemConfig || (exports.RootItemConfig = {}));
/** Use to specify LayoutConfig with defaults or deserialise a LayoutConfig.
 * Deserialisation will handle backwards compatibility.
 * Note that LayoutConfig should be used for serialisation (not LayoutConfig)
 * @public
 */
var LayoutConfig;
(function (LayoutConfig) {
    let Settings;
    (function (Settings) {
        function resolve(settings) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const result = {
                constrainDragToContainer: (_a = settings === null || settings === void 0 ? void 0 : settings.constrainDragToContainer) !== null && _a !== void 0 ? _a : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.constrainDragToContainer,
                reorderEnabled: (_b = settings === null || settings === void 0 ? void 0 : settings.reorderEnabled) !== null && _b !== void 0 ? _b : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.reorderEnabled,
                popoutWholeStack: (_c = settings === null || settings === void 0 ? void 0 : settings.popoutWholeStack) !== null && _c !== void 0 ? _c : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.popoutWholeStack,
                blockedPopoutsThrowError: (_d = settings === null || settings === void 0 ? void 0 : settings.blockedPopoutsThrowError) !== null && _d !== void 0 ? _d : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.blockedPopoutsThrowError,
                closePopoutsOnUnload: (_e = settings === null || settings === void 0 ? void 0 : settings.closePopoutsOnUnload) !== null && _e !== void 0 ? _e : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.closePopoutsOnUnload,
                responsiveMode: (_f = settings === null || settings === void 0 ? void 0 : settings.responsiveMode) !== null && _f !== void 0 ? _f : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.responsiveMode,
                tabOverlapAllowance: (_g = settings === null || settings === void 0 ? void 0 : settings.tabOverlapAllowance) !== null && _g !== void 0 ? _g : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.tabOverlapAllowance,
                reorderOnTabMenuClick: (_h = settings === null || settings === void 0 ? void 0 : settings.reorderOnTabMenuClick) !== null && _h !== void 0 ? _h : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.reorderOnTabMenuClick,
                tabControlOffset: (_j = settings === null || settings === void 0 ? void 0 : settings.tabControlOffset) !== null && _j !== void 0 ? _j : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.tabControlOffset,
                popInOnClose: (_k = settings === null || settings === void 0 ? void 0 : settings.popInOnClose) !== null && _k !== void 0 ? _k : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.popInOnClose,
            };
            return result;
        }
        Settings.resolve = resolve;
    })(Settings = LayoutConfig.Settings || (LayoutConfig.Settings = {}));
    let Dimensions;
    (function (Dimensions) {
        /** @internal */
        function resolve(dimensions) {
            var _a, _b, _c, _d, _e;
            const { size: defaultMinItemHeight, sizeUnit: defaultMinItemHeightUnit } = Dimensions.resolveDefaultMinItemHeight(dimensions);
            const { size: defaultMinItemWidth, sizeUnit: defaultMinItemWidthUnit } = Dimensions.resolveDefaultMinItemWidth(dimensions);
            const result = {
                borderWidth: (_a = dimensions === null || dimensions === void 0 ? void 0 : dimensions.borderWidth) !== null && _a !== void 0 ? _a : resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.borderWidth,
                borderGrabWidth: (_b = dimensions === null || dimensions === void 0 ? void 0 : dimensions.borderGrabWidth) !== null && _b !== void 0 ? _b : resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.borderGrabWidth,
                defaultMinItemHeight,
                defaultMinItemHeightUnit,
                defaultMinItemWidth,
                defaultMinItemWidthUnit,
                headerHeight: (_c = dimensions === null || dimensions === void 0 ? void 0 : dimensions.headerHeight) !== null && _c !== void 0 ? _c : resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.headerHeight,
                dragProxyWidth: (_d = dimensions === null || dimensions === void 0 ? void 0 : dimensions.dragProxyWidth) !== null && _d !== void 0 ? _d : resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.dragProxyWidth,
                dragProxyHeight: (_e = dimensions === null || dimensions === void 0 ? void 0 : dimensions.dragProxyHeight) !== null && _e !== void 0 ? _e : resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.dragProxyHeight,
            };
            return result;
        }
        Dimensions.resolve = resolve;
        /** @internal */
        function fromResolved(resolvedDimensions) {
            const result = {
                borderWidth: resolvedDimensions.borderWidth,
                borderGrabWidth: resolvedDimensions.borderGrabWidth,
                defaultMinItemHeight: formatSize(resolvedDimensions.defaultMinItemHeight, resolvedDimensions.defaultMinItemHeightUnit),
                defaultMinItemWidth: formatSize(resolvedDimensions.defaultMinItemWidth, resolvedDimensions.defaultMinItemWidthUnit),
                headerHeight: resolvedDimensions.headerHeight,
                dragProxyWidth: resolvedDimensions.dragProxyWidth,
                dragProxyHeight: resolvedDimensions.dragProxyHeight,
            };
            return result;
        }
        Dimensions.fromResolved = fromResolved;
        /** @internal */
        function resolveDefaultMinItemHeight(dimensions) {
            const height = dimensions === null || dimensions === void 0 ? void 0 : dimensions.defaultMinItemHeight;
            if (height === undefined) {
                return { size: resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.defaultMinItemHeight, sizeUnit: resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.defaultMinItemHeightUnit };
            }
            else {
                return parseSize(height, [types_1.SizeUnitEnum.Pixel]);
            }
        }
        Dimensions.resolveDefaultMinItemHeight = resolveDefaultMinItemHeight;
        /** @internal */
        function resolveDefaultMinItemWidth(dimensions) {
            const width = dimensions === null || dimensions === void 0 ? void 0 : dimensions.defaultMinItemWidth;
            if (width === undefined) {
                return { size: resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.defaultMinItemWidth, sizeUnit: resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.defaultMinItemWidthUnit };
            }
            else {
                return parseSize(width, [types_1.SizeUnitEnum.Pixel]);
            }
        }
        Dimensions.resolveDefaultMinItemWidth = resolveDefaultMinItemWidth;
    })(Dimensions = LayoutConfig.Dimensions || (LayoutConfig.Dimensions = {}));
    let Header;
    (function (Header) {
        /** @internal */
        function resolve(header, settings, labels) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            let show;
            if ((header === null || header === void 0 ? void 0 : header.show) !== undefined) {
                show = header.show;
            }
            else {
                if (settings !== undefined && settings.hasHeaders !== undefined) {
                    show = settings.hasHeaders ? resolved_config_1.ResolvedLayoutConfig.Header.defaults.show : false;
                }
                else {
                    show = resolved_config_1.ResolvedLayoutConfig.Header.defaults.show;
                }
            }
            const result = {
                show,
                popout: (_b = (_a = header === null || header === void 0 ? void 0 : header.popout) !== null && _a !== void 0 ? _a : labels === null || labels === void 0 ? void 0 : labels.popout) !== null && _b !== void 0 ? _b : ((settings === null || settings === void 0 ? void 0 : settings.showPopoutIcon) === false ? false : resolved_config_1.ResolvedLayoutConfig.Header.defaults.popout),
                dock: (_d = (_c = header === null || header === void 0 ? void 0 : header.popin) !== null && _c !== void 0 ? _c : labels === null || labels === void 0 ? void 0 : labels.popin) !== null && _d !== void 0 ? _d : resolved_config_1.ResolvedLayoutConfig.Header.defaults.dock,
                maximise: (_f = (_e = header === null || header === void 0 ? void 0 : header.maximise) !== null && _e !== void 0 ? _e : labels === null || labels === void 0 ? void 0 : labels.maximise) !== null && _f !== void 0 ? _f : ((settings === null || settings === void 0 ? void 0 : settings.showMaximiseIcon) === false ? false : resolved_config_1.ResolvedLayoutConfig.Header.defaults.maximise),
                close: (_h = (_g = header === null || header === void 0 ? void 0 : header.close) !== null && _g !== void 0 ? _g : labels === null || labels === void 0 ? void 0 : labels.close) !== null && _h !== void 0 ? _h : ((settings === null || settings === void 0 ? void 0 : settings.showCloseIcon) === false ? false : resolved_config_1.ResolvedLayoutConfig.Header.defaults.close),
                minimise: (_k = (_j = header === null || header === void 0 ? void 0 : header.minimise) !== null && _j !== void 0 ? _j : labels === null || labels === void 0 ? void 0 : labels.minimise) !== null && _k !== void 0 ? _k : resolved_config_1.ResolvedLayoutConfig.Header.defaults.minimise,
                tabDropdown: (_m = (_l = header === null || header === void 0 ? void 0 : header.tabDropdown) !== null && _l !== void 0 ? _l : labels === null || labels === void 0 ? void 0 : labels.tabDropdown) !== null && _m !== void 0 ? _m : resolved_config_1.ResolvedLayoutConfig.Header.defaults.tabDropdown,
            };
            return result;
        }
        Header.resolve = resolve;
    })(Header = LayoutConfig.Header || (LayoutConfig.Header = {}));
    function isPopout(config) {
        return 'parentId' in config || 'indexInParent' in config || 'window' in config;
    }
    LayoutConfig.isPopout = isPopout;
    /** @internal */
    function resolve(layoutConfig) {
        if (isPopout(layoutConfig)) {
            return PopoutLayoutConfig.resolve(layoutConfig);
        }
        else {
            let root;
            if (layoutConfig.root !== undefined) {
                root = layoutConfig.root;
            }
            else {
                if (layoutConfig.content !== undefined && layoutConfig.content.length > 0) {
                    root = layoutConfig.content[0];
                }
                else {
                    root = undefined;
                }
            }
            const config = {
                resolved: true,
                root: RootItemConfig.resolve(root),
                openPopouts: LayoutConfig.resolveOpenPopouts(layoutConfig.openPopouts),
                dimensions: LayoutConfig.Dimensions.resolve(layoutConfig.dimensions),
                settings: LayoutConfig.Settings.resolve(layoutConfig.settings),
                header: LayoutConfig.Header.resolve(layoutConfig.header, layoutConfig.settings, layoutConfig.labels),
            };
            return config;
        }
    }
    LayoutConfig.resolve = resolve;
    function fromResolved(config) {
        const result = {
            root: RootItemConfig.fromResolvedOrUndefined(config.root),
            openPopouts: PopoutLayoutConfig.fromResolvedArray(config.openPopouts),
            settings: resolved_config_1.ResolvedLayoutConfig.Settings.createCopy(config.settings),
            dimensions: LayoutConfig.Dimensions.fromResolved(config.dimensions),
            header: resolved_config_1.ResolvedLayoutConfig.Header.createCopy(config.header),
        };
        return result;
    }
    LayoutConfig.fromResolved = fromResolved;
    function isResolved(configOrResolvedConfig) {
        const config = configOrResolvedConfig;
        return config.resolved !== undefined && (config.resolved === true);
    }
    LayoutConfig.isResolved = isResolved;
    /** @internal */
    function resolveOpenPopouts(popoutConfigs) {
        if (popoutConfigs === undefined) {
            return [];
        }
        else {
            const count = popoutConfigs.length;
            const result = new Array(count);
            for (let i = 0; i < count; i++) {
                result[i] = PopoutLayoutConfig.resolve(popoutConfigs[i]);
            }
            return result;
        }
    }
    LayoutConfig.resolveOpenPopouts = resolveOpenPopouts;
})(LayoutConfig = exports.LayoutConfig || (exports.LayoutConfig = {}));
/** @public */
var PopoutLayoutConfig;
(function (PopoutLayoutConfig) {
    let Window;
    (function (Window) {
        /** @internal */
        function resolve(window, dimensions) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            let result;
            const defaults = resolved_config_1.ResolvedPopoutLayoutConfig.Window.defaults;
            if (window !== undefined) {
                result = {
                    width: (_a = window.width) !== null && _a !== void 0 ? _a : defaults.width,
                    height: (_b = window.height) !== null && _b !== void 0 ? _b : defaults.height,
                    left: (_c = window.left) !== null && _c !== void 0 ? _c : defaults.left,
                    top: (_d = window.top) !== null && _d !== void 0 ? _d : defaults.top,
                };
            }
            else {
                result = {
                    width: (_e = dimensions === null || dimensions === void 0 ? void 0 : dimensions.width) !== null && _e !== void 0 ? _e : defaults.width,
                    height: (_f = dimensions === null || dimensions === void 0 ? void 0 : dimensions.height) !== null && _f !== void 0 ? _f : defaults.height,
                    left: (_g = dimensions === null || dimensions === void 0 ? void 0 : dimensions.left) !== null && _g !== void 0 ? _g : defaults.left,
                    top: (_h = dimensions === null || dimensions === void 0 ? void 0 : dimensions.top) !== null && _h !== void 0 ? _h : defaults.top,
                };
            }
            return result;
        }
        Window.resolve = resolve;
        /** @internal */
        function fromResolved(resolvedWindow) {
            const result = {
                width: resolvedWindow.width === null ? undefined : resolvedWindow.width,
                height: resolvedWindow.height === null ? undefined : resolvedWindow.height,
                left: resolvedWindow.left === null ? undefined : resolvedWindow.left,
                top: resolvedWindow.top === null ? undefined : resolvedWindow.top,
            };
            return result;
        }
        Window.fromResolved = fromResolved;
    })(Window = PopoutLayoutConfig.Window || (PopoutLayoutConfig.Window = {}));
    /** @internal */
    function resolve(popoutConfig) {
        var _a, _b;
        let root;
        if (popoutConfig.root !== undefined) {
            root = popoutConfig.root;
        }
        else {
            if (popoutConfig.content !== undefined && popoutConfig.content.length > 0) {
                root = popoutConfig.content[0];
            }
            else {
                root = undefined;
            }
        }
        const config = {
            root: RootItemConfig.resolve(root),
            openPopouts: LayoutConfig.resolveOpenPopouts(popoutConfig.openPopouts),
            dimensions: LayoutConfig.Dimensions.resolve(popoutConfig.dimensions),
            settings: LayoutConfig.Settings.resolve(popoutConfig.settings),
            header: LayoutConfig.Header.resolve(popoutConfig.header, popoutConfig.settings, popoutConfig.labels),
            parentId: (_a = popoutConfig.parentId) !== null && _a !== void 0 ? _a : null,
            indexInParent: (_b = popoutConfig.indexInParent) !== null && _b !== void 0 ? _b : null,
            window: PopoutLayoutConfig.Window.resolve(popoutConfig.window, popoutConfig.dimensions),
            resolved: true,
        };
        return config;
    }
    PopoutLayoutConfig.resolve = resolve;
    /** @internal */
    function fromResolved(resolvedConfig) {
        const result = {
            root: RootItemConfig.fromResolvedOrUndefined(resolvedConfig.root),
            openPopouts: fromResolvedArray(resolvedConfig.openPopouts),
            dimensions: LayoutConfig.Dimensions.fromResolved(resolvedConfig.dimensions),
            settings: resolved_config_1.ResolvedLayoutConfig.Settings.createCopy(resolvedConfig.settings),
            header: resolved_config_1.ResolvedLayoutConfig.Header.createCopy(resolvedConfig.header),
            parentId: resolvedConfig.parentId,
            indexInParent: resolvedConfig.indexInParent,
            window: PopoutLayoutConfig.Window.fromResolved(resolvedConfig.window),
        };
        return result;
    }
    PopoutLayoutConfig.fromResolved = fromResolved;
    /** @internal */
    function fromResolvedArray(resolvedArray) {
        const resolvedOpenPopoutCount = resolvedArray.length;
        const result = new Array(resolvedOpenPopoutCount);
        for (let i = 0; i < resolvedOpenPopoutCount; i++) {
            const resolvedOpenPopout = resolvedArray[i];
            result[i] = PopoutLayoutConfig.fromResolved(resolvedOpenPopout);
        }
        return result;
    }
    PopoutLayoutConfig.fromResolvedArray = fromResolvedArray;
})(PopoutLayoutConfig = exports.PopoutLayoutConfig || (exports.PopoutLayoutConfig = {}));
/** @internal */
function parseSize(sizeString, allowableSizeUnits) {
    const { numericPart: digitsPart, firstNonNumericCharPart: firstNonDigitPart } = (0, utils_1.splitStringAtFirstNonNumericChar)(sizeString);
    const size = Number.parseInt(digitsPart, 10);
    if (isNaN(size)) {
        throw new external_error_1.ConfigurationError(`${i18n_strings_1.i18nStrings[7 /* InvalidNumberPartInSizeString */]}: ${sizeString}`);
    }
    else {
        const sizeUnit = types_1.SizeUnitEnum.tryParse(firstNonDigitPart);
        if (sizeUnit === undefined) {
            throw new external_error_1.ConfigurationError(`${i18n_strings_1.i18nStrings[8 /* UnknownUnitInSizeString */]}: ${sizeString}`);
        }
        else {
            if (!allowableSizeUnits.includes(sizeUnit)) {
                throw new external_error_1.ConfigurationError(`${i18n_strings_1.i18nStrings[9 /* UnsupportedUnitInSizeString */]}: ${sizeString}`);
            }
            else {
                return { size, sizeUnit };
            }
        }
    }
}
exports.parseSize = parseSize;
/** @internal */
function formatSize(size, sizeUnit) {
    return size.toString(10) + types_1.SizeUnitEnum.format(sizeUnit);
}
exports.formatSize = formatSize;
/** @internal */
function formatUndefinableSize(size, sizeUnit) {
    if (size === undefined) {
        return undefined;
    }
    else {
        return size.toString(10) + types_1.SizeUnitEnum.format(sizeUnit);
    }
}
exports.formatUndefinableSize = formatUndefinableSize;
//# sourceMappingURL=config.js.map
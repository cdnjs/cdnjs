import { ConfigurationError } from '../errors/external-error';
import { AssertError, UnreachableCaseError } from '../errors/internal-error';
import { ItemType } from '../utils/types';
import { ResolvedComponentItemConfig, ResolvedItemConfig, ResolvedLayoutConfig, ResolvedPopoutLayoutConfig, ResolvedRootItemConfig, ResolvedRowOrColumnItemConfig, ResolvedStackItemConfig } from "./resolved-config";
/** @public */
export var ItemConfig;
(function (ItemConfig) {
    function resolve(itemConfig) {
        switch (itemConfig.type) {
            case ItemType.ground:
                throw new ConfigurationError('ItemConfig cannot specify type ground', JSON.stringify(itemConfig));
            case ItemType.row:
            case ItemType.column:
                return RowOrColumnItemConfig.resolve(itemConfig);
            case ItemType.stack:
                return StackItemConfig.resolve(itemConfig);
            case ItemType.component:
                return ComponentItemConfig.resolve(itemConfig);
            default:
                throw new UnreachableCaseError('UCUICR55499', itemConfig.type);
        }
    }
    ItemConfig.resolve = resolve;
    function resolveContent(content) {
        if (content === undefined) {
            return [];
        }
        else {
            const count = content.length;
            const result = new Array(count);
            for (let i = 0; i < count; i++) {
                result[i] = ItemConfig.resolve(content[i]);
            }
            return result;
        }
    }
    ItemConfig.resolveContent = resolveContent;
    function resolveId(id) {
        if (id === undefined) {
            return ResolvedItemConfig.defaults.id;
        }
        else {
            if (Array.isArray(id)) {
                if (id.length === 0) {
                    return ResolvedItemConfig.defaults.id;
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
    function isGround(config) {
        return config.type === ItemType.ground;
    }
    ItemConfig.isGround = isGround;
    function isRow(config) {
        return config.type === ItemType.row;
    }
    ItemConfig.isRow = isRow;
    function isColumn(config) {
        return config.type === ItemType.column;
    }
    ItemConfig.isColumn = isColumn;
    function isStack(config) {
        return config.type === ItemType.stack;
    }
    ItemConfig.isStack = isStack;
    function isComponent(config) {
        return config.type === ItemType.component;
    }
    ItemConfig.isComponent = isComponent;
})(ItemConfig || (ItemConfig = {}));
/** @public */
export var HeaderedItemConfig;
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
                    show: (_a = header === null || header === void 0 ? void 0 : header.show) !== null && _a !== void 0 ? _a : (hasHeaders === undefined ? undefined : hasHeaders ? ResolvedLayoutConfig.Header.defaults.show : false),
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
    function resolveIdAndMaximised(config) {
        let id;
        // To support legacy configs with Id saved as an array of string, assign config.id to a type which includes string array
        let legacyId = config.id;
        let legacyMaximised = false;
        if (legacyId === undefined) {
            id = ResolvedItemConfig.defaults.id;
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
                    id = ResolvedItemConfig.defaults.id;
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
})(HeaderedItemConfig || (HeaderedItemConfig = {}));
/** @public */
export var StackItemConfig;
(function (StackItemConfig) {
    function resolve(itemConfig) {
        var _a, _b, _c, _d, _e, _f;
        const { id, maximised } = HeaderedItemConfig.resolveIdAndMaximised(itemConfig);
        const result = {
            type: ItemType.stack,
            content: resolveContent(itemConfig.content),
            width: (_a = itemConfig.width) !== null && _a !== void 0 ? _a : ResolvedItemConfig.defaults.width,
            minWidth: (_b = itemConfig.minWidth) !== null && _b !== void 0 ? _b : ResolvedItemConfig.defaults.minWidth,
            height: (_c = itemConfig.height) !== null && _c !== void 0 ? _c : ResolvedItemConfig.defaults.height,
            minHeight: (_d = itemConfig.minHeight) !== null && _d !== void 0 ? _d : ResolvedItemConfig.defaults.minHeight,
            id,
            maximised,
            isClosable: (_e = itemConfig.isClosable) !== null && _e !== void 0 ? _e : ResolvedItemConfig.defaults.isClosable,
            activeItemIndex: (_f = itemConfig.activeItemIndex) !== null && _f !== void 0 ? _f : ResolvedStackItemConfig.defaultActiveItemIndex,
            header: HeaderedItemConfig.Header.resolve(itemConfig.header, itemConfig.hasHeaders),
        };
        return result;
    }
    StackItemConfig.resolve = resolve;
    function resolveContent(content) {
        if (content === undefined) {
            return [];
        }
        else {
            const count = content.length;
            const result = new Array(count);
            for (let i = 0; i < count; i++) {
                const childItemConfig = content[i];
                const itemConfig = ItemConfig.resolve(childItemConfig);
                if (!ResolvedItemConfig.isComponentItem(itemConfig)) {
                    throw new AssertError('UCUSICRC91114', JSON.stringify(itemConfig));
                }
                else {
                    result[i] = itemConfig;
                }
            }
            return result;
        }
    }
    StackItemConfig.resolveContent = resolveContent;
})(StackItemConfig || (StackItemConfig = {}));
/** @public */
export var ComponentItemConfig;
(function (ComponentItemConfig) {
    function resolve(itemConfig) {
        var _a, _b, _c, _d, _e, _f, _g;
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
            const result = {
                type: itemConfig.type,
                content: [],
                width: (_a = itemConfig.width) !== null && _a !== void 0 ? _a : ResolvedItemConfig.defaults.width,
                minWidth: (_b = itemConfig.minWidth) !== null && _b !== void 0 ? _b : ResolvedItemConfig.defaults.minWidth,
                height: (_c = itemConfig.height) !== null && _c !== void 0 ? _c : ResolvedItemConfig.defaults.height,
                minHeight: (_d = itemConfig.minHeight) !== null && _d !== void 0 ? _d : ResolvedItemConfig.defaults.minHeight,
                id,
                maximised,
                isClosable: (_e = itemConfig.isClosable) !== null && _e !== void 0 ? _e : ResolvedItemConfig.defaults.isClosable,
                reorderEnabled: (_f = itemConfig.reorderEnabled) !== null && _f !== void 0 ? _f : ResolvedComponentItemConfig.defaultReorderEnabled,
                title,
                header: HeaderedItemConfig.Header.resolve(itemConfig.header, itemConfig.hasHeaders),
                componentType,
                componentState: (_g = itemConfig.componentState) !== null && _g !== void 0 ? _g : {},
            };
            return result;
        }
    }
    ComponentItemConfig.resolve = resolve;
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
})(ComponentItemConfig || (ComponentItemConfig = {}));
/** @public */
export var RowOrColumnItemConfig;
(function (RowOrColumnItemConfig) {
    function isChildItemConfig(itemConfig) {
        switch (itemConfig.type) {
            case ItemType.row:
            case ItemType.column:
            case ItemType.stack:
            case ItemType.component:
                return true;
            case ItemType.ground:
                return false;
            default:
                throw new UnreachableCaseError('UROCOSPCICIC13687', itemConfig.type);
        }
    }
    RowOrColumnItemConfig.isChildItemConfig = isChildItemConfig;
    function resolve(itemConfig) {
        var _a, _b, _c, _d, _e;
        const result = {
            type: itemConfig.type,
            content: RowOrColumnItemConfig.resolveContent(itemConfig.content),
            width: (_a = itemConfig.width) !== null && _a !== void 0 ? _a : ResolvedItemConfig.defaults.width,
            minWidth: (_b = itemConfig.width) !== null && _b !== void 0 ? _b : ResolvedItemConfig.defaults.minWidth,
            height: (_c = itemConfig.height) !== null && _c !== void 0 ? _c : ResolvedItemConfig.defaults.height,
            minHeight: (_d = itemConfig.height) !== null && _d !== void 0 ? _d : ResolvedItemConfig.defaults.minHeight,
            id: ItemConfig.resolveId(itemConfig.id),
            isClosable: (_e = itemConfig.isClosable) !== null && _e !== void 0 ? _e : ResolvedItemConfig.defaults.isClosable,
        };
        return result;
    }
    RowOrColumnItemConfig.resolve = resolve;
    function resolveContent(content) {
        if (content === undefined) {
            return [];
        }
        else {
            const count = content.length;
            const result = new Array(count);
            for (let i = 0; i < count; i++) {
                const childItemConfig = content[i];
                if (!RowOrColumnItemConfig.isChildItemConfig(childItemConfig)) {
                    throw new ConfigurationError('ItemConfig is not Row, Column or Stack', childItemConfig);
                }
                else {
                    const resolvedChildItemConfig = ItemConfig.resolve(childItemConfig);
                    if (!ResolvedRowOrColumnItemConfig.isChildItemConfig(resolvedChildItemConfig)) {
                        throw new AssertError('UROCOSPIC99512', JSON.stringify(resolvedChildItemConfig));
                    }
                    else {
                        result[i] = resolvedChildItemConfig;
                    }
                }
            }
            return result;
        }
    }
    RowOrColumnItemConfig.resolveContent = resolveContent;
})(RowOrColumnItemConfig || (RowOrColumnItemConfig = {}));
/** @public */
export var RootItemConfig;
(function (RootItemConfig) {
    function isRootItemConfig(itemConfig) {
        switch (itemConfig.type) {
            case ItemType.row:
            case ItemType.column:
            case ItemType.stack:
            case ItemType.component:
                return true;
            case ItemType.ground:
                return false;
            default:
                throw new UnreachableCaseError('URICIR23687', itemConfig.type);
        }
    }
    RootItemConfig.isRootItemConfig = isRootItemConfig;
    function resolve(itemConfig) {
        if (itemConfig === undefined) {
            return undefined;
        }
        else {
            const result = ItemConfig.resolve(itemConfig);
            if (!ResolvedRootItemConfig.isRootItemConfig(result)) {
                throw new ConfigurationError('ItemConfig is not Row, Column or Stack', JSON.stringify(itemConfig));
            }
            else {
                return result;
            }
        }
    }
    RootItemConfig.resolve = resolve;
})(RootItemConfig || (RootItemConfig = {}));
/** Use to specify LayoutConfig with defaults or deserialise a LayoutConfig.
 * Deserialisation will handle backwards compatibility.
 * Note that LayoutConfig should be used for serialisation (not LayoutConfig)
 * @public
 */
export var LayoutConfig;
(function (LayoutConfig) {
    let Settings;
    (function (Settings) {
        function resolve(settings) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const result = {
                constrainDragToContainer: (_a = settings === null || settings === void 0 ? void 0 : settings.constrainDragToContainer) !== null && _a !== void 0 ? _a : ResolvedLayoutConfig.Settings.defaults.constrainDragToContainer,
                reorderEnabled: (_b = settings === null || settings === void 0 ? void 0 : settings.reorderEnabled) !== null && _b !== void 0 ? _b : ResolvedLayoutConfig.Settings.defaults.reorderEnabled,
                popoutWholeStack: (_c = settings === null || settings === void 0 ? void 0 : settings.popoutWholeStack) !== null && _c !== void 0 ? _c : ResolvedLayoutConfig.Settings.defaults.popoutWholeStack,
                blockedPopoutsThrowError: (_d = settings === null || settings === void 0 ? void 0 : settings.blockedPopoutsThrowError) !== null && _d !== void 0 ? _d : ResolvedLayoutConfig.Settings.defaults.blockedPopoutsThrowError,
                closePopoutsOnUnload: (_e = settings === null || settings === void 0 ? void 0 : settings.closePopoutsOnUnload) !== null && _e !== void 0 ? _e : ResolvedLayoutConfig.Settings.defaults.closePopoutsOnUnload,
                responsiveMode: (_f = settings === null || settings === void 0 ? void 0 : settings.responsiveMode) !== null && _f !== void 0 ? _f : ResolvedLayoutConfig.Settings.defaults.responsiveMode,
                tabOverlapAllowance: (_g = settings === null || settings === void 0 ? void 0 : settings.tabOverlapAllowance) !== null && _g !== void 0 ? _g : ResolvedLayoutConfig.Settings.defaults.tabOverlapAllowance,
                reorderOnTabMenuClick: (_h = settings === null || settings === void 0 ? void 0 : settings.reorderOnTabMenuClick) !== null && _h !== void 0 ? _h : ResolvedLayoutConfig.Settings.defaults.reorderOnTabMenuClick,
                tabControlOffset: (_j = settings === null || settings === void 0 ? void 0 : settings.tabControlOffset) !== null && _j !== void 0 ? _j : ResolvedLayoutConfig.Settings.defaults.tabControlOffset,
                popInOnClose: (_k = settings === null || settings === void 0 ? void 0 : settings.popInOnClose) !== null && _k !== void 0 ? _k : ResolvedLayoutConfig.Settings.defaults.popInOnClose,
            };
            return result;
        }
        Settings.resolve = resolve;
    })(Settings = LayoutConfig.Settings || (LayoutConfig.Settings = {}));
    let Dimensions;
    (function (Dimensions) {
        function resolve(dimensions) {
            var _a, _b, _c, _d, _e, _f, _g;
            const result = {
                borderWidth: (_a = dimensions === null || dimensions === void 0 ? void 0 : dimensions.borderWidth) !== null && _a !== void 0 ? _a : ResolvedLayoutConfig.Dimensions.defaults.borderWidth,
                borderGrabWidth: (_b = dimensions === null || dimensions === void 0 ? void 0 : dimensions.borderGrabWidth) !== null && _b !== void 0 ? _b : ResolvedLayoutConfig.Dimensions.defaults.borderGrabWidth,
                minItemHeight: (_c = dimensions === null || dimensions === void 0 ? void 0 : dimensions.minItemHeight) !== null && _c !== void 0 ? _c : ResolvedLayoutConfig.Dimensions.defaults.minItemHeight,
                minItemWidth: (_d = dimensions === null || dimensions === void 0 ? void 0 : dimensions.minItemWidth) !== null && _d !== void 0 ? _d : ResolvedLayoutConfig.Dimensions.defaults.minItemWidth,
                headerHeight: (_e = dimensions === null || dimensions === void 0 ? void 0 : dimensions.headerHeight) !== null && _e !== void 0 ? _e : ResolvedLayoutConfig.Dimensions.defaults.headerHeight,
                dragProxyWidth: (_f = dimensions === null || dimensions === void 0 ? void 0 : dimensions.dragProxyWidth) !== null && _f !== void 0 ? _f : ResolvedLayoutConfig.Dimensions.defaults.dragProxyWidth,
                dragProxyHeight: (_g = dimensions === null || dimensions === void 0 ? void 0 : dimensions.dragProxyHeight) !== null && _g !== void 0 ? _g : ResolvedLayoutConfig.Dimensions.defaults.dragProxyHeight,
            };
            return result;
        }
        Dimensions.resolve = resolve;
    })(Dimensions = LayoutConfig.Dimensions || (LayoutConfig.Dimensions = {}));
    let Header;
    (function (Header) {
        function resolve(header, settings, labels) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            let show;
            if ((header === null || header === void 0 ? void 0 : header.show) !== undefined) {
                show = header.show;
            }
            else {
                if (settings !== undefined && settings.hasHeaders !== undefined) {
                    show = settings.hasHeaders ? ResolvedLayoutConfig.Header.defaults.show : false;
                }
                else {
                    show = ResolvedLayoutConfig.Header.defaults.show;
                }
            }
            const result = {
                show,
                popout: (_b = (_a = header === null || header === void 0 ? void 0 : header.popout) !== null && _a !== void 0 ? _a : labels === null || labels === void 0 ? void 0 : labels.popout) !== null && _b !== void 0 ? _b : ((settings === null || settings === void 0 ? void 0 : settings.showPopoutIcon) === false ? false : ResolvedLayoutConfig.Header.defaults.popout),
                dock: (_d = (_c = header === null || header === void 0 ? void 0 : header.popin) !== null && _c !== void 0 ? _c : labels === null || labels === void 0 ? void 0 : labels.popin) !== null && _d !== void 0 ? _d : ResolvedLayoutConfig.Header.defaults.dock,
                maximise: (_f = (_e = header === null || header === void 0 ? void 0 : header.maximise) !== null && _e !== void 0 ? _e : labels === null || labels === void 0 ? void 0 : labels.maximise) !== null && _f !== void 0 ? _f : ((settings === null || settings === void 0 ? void 0 : settings.showMaximiseIcon) === false ? false : ResolvedLayoutConfig.Header.defaults.maximise),
                close: (_h = (_g = header === null || header === void 0 ? void 0 : header.close) !== null && _g !== void 0 ? _g : labels === null || labels === void 0 ? void 0 : labels.close) !== null && _h !== void 0 ? _h : ((settings === null || settings === void 0 ? void 0 : settings.showCloseIcon) === false ? false : ResolvedLayoutConfig.Header.defaults.close),
                minimise: (_k = (_j = header === null || header === void 0 ? void 0 : header.minimise) !== null && _j !== void 0 ? _j : labels === null || labels === void 0 ? void 0 : labels.minimise) !== null && _k !== void 0 ? _k : ResolvedLayoutConfig.Header.defaults.minimise,
                tabDropdown: (_m = (_l = header === null || header === void 0 ? void 0 : header.tabDropdown) !== null && _l !== void 0 ? _l : labels === null || labels === void 0 ? void 0 : labels.tabDropdown) !== null && _m !== void 0 ? _m : ResolvedLayoutConfig.Header.defaults.tabDropdown,
            };
            return result;
        }
        Header.resolve = resolve;
    })(Header = LayoutConfig.Header || (LayoutConfig.Header = {}));
    function isPopout(config) {
        return 'parentId' in config || 'indexInParent' in config || 'window' in config;
    }
    LayoutConfig.isPopout = isPopout;
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
        const copiedConfig = ResolvedLayoutConfig.createCopy(config);
        const result = {
            root: copiedConfig.root,
            openPopouts: copiedConfig.openPopouts,
            dimensions: copiedConfig.dimensions,
            settings: copiedConfig.settings,
            header: copiedConfig.header,
        };
        return result;
    }
    LayoutConfig.fromResolved = fromResolved;
    function isResolved(configOrResolvedConfig) {
        const config = configOrResolvedConfig;
        return config.resolved !== undefined && (config.resolved === true);
    }
    LayoutConfig.isResolved = isResolved;
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
})(LayoutConfig || (LayoutConfig = {}));
/** @public */
export var PopoutLayoutConfig;
(function (PopoutLayoutConfig) {
    let Window;
    (function (Window) {
        function resolve(window, dimensions) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            let result;
            const defaults = ResolvedPopoutLayoutConfig.Window.defaults;
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
    })(Window = PopoutLayoutConfig.Window || (PopoutLayoutConfig.Window = {}));
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
            settings: LayoutConfig.Settings.resolve(popoutConfig.settings),
            dimensions: LayoutConfig.Dimensions.resolve(popoutConfig.dimensions),
            header: LayoutConfig.Header.resolve(popoutConfig.header, popoutConfig.settings, popoutConfig.labels),
            parentId: (_a = popoutConfig.parentId) !== null && _a !== void 0 ? _a : null,
            indexInParent: (_b = popoutConfig.indexInParent) !== null && _b !== void 0 ? _b : null,
            window: PopoutLayoutConfig.Window.resolve(popoutConfig.window, popoutConfig.dimensions),
            resolved: true,
        };
        return config;
    }
    PopoutLayoutConfig.resolve = resolve;
})(PopoutLayoutConfig || (PopoutLayoutConfig = {}));
//# sourceMappingURL=config.js.map
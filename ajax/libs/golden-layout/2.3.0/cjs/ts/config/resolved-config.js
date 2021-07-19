"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvedPopoutLayoutConfig = exports.ResolvedLayoutConfig = exports.ResolvedGroundItemConfig = exports.ResolvedRootItemConfig = exports.ResolvedRowOrColumnItemConfig = exports.ResolvedComponentItemConfig = exports.ResolvedStackItemConfig = exports.ResolvedHeaderedItemConfig = exports.ResolvedItemConfig = void 0;
const internal_error_1 = require("../errors/internal-error");
const config_minifier_1 = require("../utils/config-minifier");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
/** @public */
var ResolvedItemConfig;
(function (ResolvedItemConfig) {
    ResolvedItemConfig.defaults = {
        type: types_1.ItemType.ground,
        content: [],
        width: 50,
        minWidth: 0,
        height: 50,
        minHeight: 0,
        id: '',
        isClosable: true,
    };
    /** Creates a copy of the original ResolvedItemConfig using an alternative content if specified */
    function createCopy(original, content) {
        switch (original.type) {
            case types_1.ItemType.ground:
            case types_1.ItemType.row:
            case types_1.ItemType.column:
                return ResolvedRowOrColumnItemConfig.createCopy(original, content);
            case types_1.ItemType.stack:
                return ResolvedStackItemConfig.createCopy(original, content);
            case types_1.ItemType.component:
                return ResolvedComponentItemConfig.createCopy(original);
            default:
                throw new internal_error_1.UnreachableCaseError('CICC91354', original.type, 'Invalid Config Item type specified');
        }
    }
    ResolvedItemConfig.createCopy = createCopy;
    function createDefault(type) {
        switch (type) {
            case types_1.ItemType.ground:
                throw new internal_error_1.AssertError('CICCDR91562'); // Get default root from LayoutConfig
            case types_1.ItemType.row:
            case types_1.ItemType.column:
                return ResolvedRowOrColumnItemConfig.createDefault(type);
            case types_1.ItemType.stack:
                return ResolvedStackItemConfig.createDefault();
            case types_1.ItemType.component:
                return ResolvedComponentItemConfig.createDefault();
            default:
                throw new internal_error_1.UnreachableCaseError('CICCDD91563', type, 'Invalid Config Item type specified');
        }
    }
    ResolvedItemConfig.createDefault = createDefault;
    function isComponentItem(itemConfig) {
        return itemConfig.type === types_1.ItemType.component;
    }
    ResolvedItemConfig.isComponentItem = isComponentItem;
    function isStackItem(itemConfig) {
        return itemConfig.type === types_1.ItemType.stack;
    }
    ResolvedItemConfig.isStackItem = isStackItem;
    /** @internal */
    function isGroundItem(itemConfig) {
        return itemConfig.type === types_1.ItemType.ground;
    }
    ResolvedItemConfig.isGroundItem = isGroundItem;
})(ResolvedItemConfig = exports.ResolvedItemConfig || (exports.ResolvedItemConfig = {}));
/** @public */
var ResolvedHeaderedItemConfig;
(function (ResolvedHeaderedItemConfig) {
    ResolvedHeaderedItemConfig.defaultMaximised = false;
    let Header;
    (function (Header) {
        function createCopy(original, show) {
            if (original === undefined) {
                return undefined;
            }
            else {
                return {
                    show: show !== null && show !== void 0 ? show : original.show,
                    popout: original.popout,
                    close: original.close,
                    maximise: original.maximise,
                    minimise: original.minimise,
                    tabDropdown: original.tabDropdown,
                };
            }
        }
        Header.createCopy = createCopy;
    })(Header = ResolvedHeaderedItemConfig.Header || (ResolvedHeaderedItemConfig.Header = {}));
})(ResolvedHeaderedItemConfig = exports.ResolvedHeaderedItemConfig || (exports.ResolvedHeaderedItemConfig = {}));
/** @public */
var ResolvedStackItemConfig;
(function (ResolvedStackItemConfig) {
    ResolvedStackItemConfig.defaultActiveItemIndex = 0;
    function createCopy(original, content) {
        const result = {
            type: original.type,
            content: content !== undefined ? copyContent(content) : copyContent(original.content),
            width: original.width,
            minWidth: original.minWidth,
            height: original.height,
            minHeight: original.minHeight,
            id: original.id,
            maximised: original.maximised,
            isClosable: original.isClosable,
            activeItemIndex: original.activeItemIndex,
            header: ResolvedHeaderedItemConfig.Header.createCopy(original.header),
        };
        return result;
    }
    ResolvedStackItemConfig.createCopy = createCopy;
    function copyContent(original) {
        const count = original.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            result[i] = ResolvedItemConfig.createCopy(original[i]);
        }
        return result;
    }
    ResolvedStackItemConfig.copyContent = copyContent;
    function createDefault() {
        const result = {
            type: types_1.ItemType.stack,
            content: [],
            width: ResolvedItemConfig.defaults.width,
            minWidth: ResolvedItemConfig.defaults.minWidth,
            height: ResolvedItemConfig.defaults.height,
            minHeight: ResolvedItemConfig.defaults.minHeight,
            id: ResolvedItemConfig.defaults.id,
            maximised: ResolvedHeaderedItemConfig.defaultMaximised,
            isClosable: ResolvedItemConfig.defaults.isClosable,
            activeItemIndex: ResolvedStackItemConfig.defaultActiveItemIndex,
            header: undefined,
        };
        return result;
    }
    ResolvedStackItemConfig.createDefault = createDefault;
})(ResolvedStackItemConfig = exports.ResolvedStackItemConfig || (exports.ResolvedStackItemConfig = {}));
/** @public */
var ResolvedComponentItemConfig;
(function (ResolvedComponentItemConfig) {
    ResolvedComponentItemConfig.defaultReorderEnabled = true;
    function resolveComponentTypeName(itemConfig) {
        const componentType = itemConfig.componentType;
        if (typeof componentType === 'string') {
            return componentType;
        }
        else {
            return undefined;
        }
    }
    ResolvedComponentItemConfig.resolveComponentTypeName = resolveComponentTypeName;
    function createCopy(original) {
        const result = {
            type: original.type,
            content: [],
            width: original.width,
            minWidth: original.minWidth,
            height: original.height,
            minHeight: original.minHeight,
            id: original.id,
            maximised: original.maximised,
            isClosable: original.isClosable,
            reorderEnabled: original.reorderEnabled,
            title: original.title,
            header: ResolvedHeaderedItemConfig.Header.createCopy(original.header),
            componentType: original.componentType,
            componentState: utils_1.deepExtendValue(undefined, original.componentState),
        };
        return result;
    }
    ResolvedComponentItemConfig.createCopy = createCopy;
    function createDefault(componentType = '', componentState, title = '') {
        const result = {
            type: types_1.ItemType.component,
            content: [],
            width: ResolvedItemConfig.defaults.width,
            minWidth: ResolvedItemConfig.defaults.minWidth,
            height: ResolvedItemConfig.defaults.height,
            minHeight: ResolvedItemConfig.defaults.minHeight,
            id: ResolvedItemConfig.defaults.id,
            maximised: ResolvedHeaderedItemConfig.defaultMaximised,
            isClosable: ResolvedItemConfig.defaults.isClosable,
            reorderEnabled: ResolvedComponentItemConfig.defaultReorderEnabled,
            title,
            header: undefined,
            componentType,
            componentState,
        };
        return result;
    }
    ResolvedComponentItemConfig.createDefault = createDefault;
    function copyComponentType(componentType) {
        return utils_1.deepExtendValue({}, componentType);
    }
    ResolvedComponentItemConfig.copyComponentType = copyComponentType;
})(ResolvedComponentItemConfig = exports.ResolvedComponentItemConfig || (exports.ResolvedComponentItemConfig = {}));
/** @public */
var ResolvedRowOrColumnItemConfig;
(function (ResolvedRowOrColumnItemConfig) {
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
                throw new internal_error_1.UnreachableCaseError('CROCOSPCICIC13687', itemConfig.type);
        }
    }
    ResolvedRowOrColumnItemConfig.isChildItemConfig = isChildItemConfig;
    function createCopy(original, content) {
        const result = {
            type: original.type,
            content: content !== undefined ? copyContent(content) : copyContent(original.content),
            width: original.width,
            minWidth: original.minWidth,
            height: original.height,
            minHeight: original.minHeight,
            id: original.id,
            isClosable: original.isClosable,
        };
        return result;
    }
    ResolvedRowOrColumnItemConfig.createCopy = createCopy;
    function copyContent(original) {
        const count = original.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            result[i] = ResolvedItemConfig.createCopy(original[i]);
        }
        return result;
    }
    ResolvedRowOrColumnItemConfig.copyContent = copyContent;
    function createDefault(type) {
        const result = {
            type,
            content: [],
            width: ResolvedItemConfig.defaults.width,
            minWidth: ResolvedItemConfig.defaults.minWidth,
            height: ResolvedItemConfig.defaults.height,
            minHeight: ResolvedItemConfig.defaults.minHeight,
            id: ResolvedItemConfig.defaults.id,
            isClosable: ResolvedItemConfig.defaults.isClosable,
        };
        return result;
    }
    ResolvedRowOrColumnItemConfig.createDefault = createDefault;
})(ResolvedRowOrColumnItemConfig = exports.ResolvedRowOrColumnItemConfig || (exports.ResolvedRowOrColumnItemConfig = {}));
/** @public */
var ResolvedRootItemConfig;
(function (ResolvedRootItemConfig) {
    function createCopy(config) {
        return ResolvedItemConfig.createCopy(config);
    }
    ResolvedRootItemConfig.createCopy = createCopy;
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
                throw new internal_error_1.UnreachableCaseError('CROCOSPCICIC13687', itemConfig.type);
        }
    }
    ResolvedRootItemConfig.isRootItemConfig = isRootItemConfig;
})(ResolvedRootItemConfig = exports.ResolvedRootItemConfig || (exports.ResolvedRootItemConfig = {}));
/** @internal */
var ResolvedGroundItemConfig;
(function (ResolvedGroundItemConfig) {
    function create(rootItemConfig) {
        const content = rootItemConfig === undefined ? [] : [rootItemConfig];
        return {
            type: types_1.ItemType.ground,
            content,
            width: 100,
            minWidth: 0,
            height: 100,
            minHeight: 0,
            id: '',
            isClosable: false,
            title: '',
            reorderEnabled: false,
        };
    }
    ResolvedGroundItemConfig.create = create;
})(ResolvedGroundItemConfig = exports.ResolvedGroundItemConfig || (exports.ResolvedGroundItemConfig = {}));
/** @public */
var ResolvedLayoutConfig;
(function (ResolvedLayoutConfig) {
    let Settings;
    (function (Settings) {
        Settings.defaults = {
            constrainDragToContainer: true,
            reorderEnabled: true,
            popoutWholeStack: false,
            blockedPopoutsThrowError: true,
            closePopoutsOnUnload: true,
            responsiveMode: types_1.ResponsiveMode.none,
            tabOverlapAllowance: 0,
            reorderOnTabMenuClick: true,
            tabControlOffset: 10,
            popInOnClose: false,
        };
        function createCopy(original) {
            return {
                constrainDragToContainer: original.constrainDragToContainer,
                reorderEnabled: original.reorderEnabled,
                popoutWholeStack: original.popoutWholeStack,
                blockedPopoutsThrowError: original.blockedPopoutsThrowError,
                closePopoutsOnUnload: original.closePopoutsOnUnload,
                responsiveMode: original.responsiveMode,
                tabOverlapAllowance: original.tabOverlapAllowance,
                reorderOnTabMenuClick: original.reorderOnTabMenuClick,
                tabControlOffset: original.tabControlOffset,
                popInOnClose: original.popInOnClose,
            };
        }
        Settings.createCopy = createCopy;
    })(Settings = ResolvedLayoutConfig.Settings || (ResolvedLayoutConfig.Settings = {}));
    let Dimensions;
    (function (Dimensions) {
        function createCopy(original) {
            return {
                borderWidth: original.borderWidth,
                borderGrabWidth: original.borderGrabWidth,
                minItemHeight: original.minItemHeight,
                minItemWidth: original.minItemWidth,
                headerHeight: original.headerHeight,
                dragProxyWidth: original.dragProxyWidth,
                dragProxyHeight: original.dragProxyHeight,
            };
        }
        Dimensions.createCopy = createCopy;
        Dimensions.defaults = {
            borderWidth: 5,
            borderGrabWidth: 5,
            minItemHeight: 10,
            minItemWidth: 10,
            headerHeight: 20,
            dragProxyWidth: 300,
            dragProxyHeight: 200
        };
    })(Dimensions = ResolvedLayoutConfig.Dimensions || (ResolvedLayoutConfig.Dimensions = {}));
    let Header;
    (function (Header) {
        function createCopy(original) {
            return {
                show: original.show,
                popout: original.popout,
                dock: original.dock,
                close: original.close,
                maximise: original.maximise,
                minimise: original.minimise,
                tabDropdown: original.tabDropdown,
            };
        }
        Header.createCopy = createCopy;
        Header.defaults = {
            show: types_1.Side.top,
            popout: 'open in new window',
            dock: 'dock',
            maximise: 'maximise',
            minimise: 'minimise',
            close: 'close',
            tabDropdown: 'additional tabs'
        };
    })(Header = ResolvedLayoutConfig.Header || (ResolvedLayoutConfig.Header = {}));
    function isPopout(config) {
        return 'parentId' in config;
    }
    ResolvedLayoutConfig.isPopout = isPopout;
    function createDefault() {
        const result = {
            root: undefined,
            openPopouts: [],
            dimensions: ResolvedLayoutConfig.Dimensions.defaults,
            settings: ResolvedLayoutConfig.Settings.defaults,
            header: ResolvedLayoutConfig.Header.defaults,
            resolved: true,
        };
        return result;
    }
    ResolvedLayoutConfig.createDefault = createDefault;
    function createCopy(config) {
        if (isPopout(config)) {
            return ResolvedPopoutLayoutConfig.createCopy(config);
        }
        else {
            const result = {
                root: config.root === undefined ? undefined : ResolvedRootItemConfig.createCopy(config.root),
                openPopouts: ResolvedLayoutConfig.copyOpenPopouts(config.openPopouts),
                settings: ResolvedLayoutConfig.Settings.createCopy(config.settings),
                dimensions: ResolvedLayoutConfig.Dimensions.createCopy(config.dimensions),
                header: ResolvedLayoutConfig.Header.createCopy(config.header),
                resolved: config.resolved,
            };
            return result;
        }
    }
    ResolvedLayoutConfig.createCopy = createCopy;
    function copyOpenPopouts(original) {
        const count = original.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            result[i] = ResolvedPopoutLayoutConfig.createCopy(original[i]);
        }
        return result;
    }
    ResolvedLayoutConfig.copyOpenPopouts = copyOpenPopouts;
    /**
     * Takes a GoldenLayout configuration object and
     * replaces its keys and values recursively with
     * one letter counterparts
     */
    function minifyConfig(layoutConfig) {
        return config_minifier_1.ConfigMinifier.translateObject(layoutConfig, true);
    }
    ResolvedLayoutConfig.minifyConfig = minifyConfig;
    /**
     * Takes a configuration Object that was previously minified
     * using minifyConfig and returns its original version
     */
    function unminifyConfig(minifiedConfig) {
        return config_minifier_1.ConfigMinifier.translateObject(minifiedConfig, false);
    }
    ResolvedLayoutConfig.unminifyConfig = unminifyConfig;
})(ResolvedLayoutConfig = exports.ResolvedLayoutConfig || (exports.ResolvedLayoutConfig = {}));
/** @public */
var ResolvedPopoutLayoutConfig;
(function (ResolvedPopoutLayoutConfig) {
    let Window;
    (function (Window) {
        function createCopy(original) {
            return {
                width: original.width,
                height: original.height,
                left: original.left,
                top: original.top,
            };
        }
        Window.createCopy = createCopy;
        Window.defaults = {
            width: null,
            height: null,
            left: null,
            top: null,
        };
    })(Window = ResolvedPopoutLayoutConfig.Window || (ResolvedPopoutLayoutConfig.Window = {}));
    function createCopy(original) {
        const result = {
            root: original.root === undefined ? undefined : ResolvedRootItemConfig.createCopy(original.root),
            openPopouts: ResolvedLayoutConfig.copyOpenPopouts(original.openPopouts),
            settings: ResolvedLayoutConfig.Settings.createCopy(original.settings),
            dimensions: ResolvedLayoutConfig.Dimensions.createCopy(original.dimensions),
            header: ResolvedLayoutConfig.Header.createCopy(original.header),
            parentId: original.parentId,
            indexInParent: original.indexInParent,
            window: ResolvedPopoutLayoutConfig.Window.createCopy(original.window),
            resolved: original.resolved,
        };
        return result;
    }
    ResolvedPopoutLayoutConfig.createCopy = createCopy;
})(ResolvedPopoutLayoutConfig = exports.ResolvedPopoutLayoutConfig || (exports.ResolvedPopoutLayoutConfig = {}));
//# sourceMappingURL=resolved-config.js.map
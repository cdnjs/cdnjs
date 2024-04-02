"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    arrowMiddleware: function() {
        return _reactdom.arrow;
    },
    autoPlacementMiddleware: function() {
        return _reactdom.autoPlacement;
    },
    autoUpdateFloatingElement: function() {
        return autoUpdateFloatingElement;
    },
    flipMiddleware: function() {
        return _reactdom.flip;
    },
    getOverflowAncestors: function() {
        return _reactdom.getOverflowAncestors;
    },
    hideMiddleware: function() {
        return _reactdom.hide;
    },
    offsetMiddleware: function() {
        return _reactdom.offset;
    },
    shiftMiddleware: function() {
        return _reactdom.shift;
    },
    sizeMiddleware: function() {
        return _reactdom.size;
    },
    useFloating: function() {
        return _reactdom.useFloating;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _reactdom = require("@vkontakte/vkui-floating-ui/react-dom");
const _dom = require("../dom");
const _customResizeObserver = require("./customResizeObserver");
const defaultOptions = {
    ancestorScroll: true,
    ancestorResize: true,
    // По умолчанию отключаем, т.к. навешивать `CustomResizeObserver` может быть дорого.
    // В `autoUpdateLib` по умолчанию опция включена. Там используется ResizeObserver, но и он не менее дорогостоящий.
    // https://github.com/floating-ui/floating-ui/blob/0a34fe9cc2c7483976785a71bd0777cd7c3f2a6a/packages/dom/src/autoUpdate.ts#L6-L33
    elementResize: false,
    animationFrame: false
};
function autoUpdateFloatingElement(reference, floating, update, options = defaultOptions) {
    const { elementResize = false } = options, restOptions = _object_without_properties._(options, [
        "elementResize"
    ]);
    // eslint-disable-next-line no-restricted-globals, compat/compat
    const canUseResizeObserver = window.ResizeObserver !== undefined;
    const autoUpdateLibDisposer = (0, _reactdom.autoUpdate)(reference, floating, update, _object_spread_props._(_object_spread._({}, restOptions), {
        elementResize: elementResize && canUseResizeObserver
    }));
    // В случае если `ResizeObserver` будет полифилиться или он будет покрываться нашим `browserlist`, то надо удалить
    // код с `CustomResizeObserver`.
    let observer = null;
    if (elementResize && !canUseResizeObserver) {
        observer = new _customResizeObserver.CustomResizeObserver(update);
        if ((0, _dom.isHTMLElement)(reference)) {
            observer.observe(reference);
        }
        observer.observe(floating);
        observer.appendToTheDOM();
    }
    return ()=>{
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        autoUpdateLibDisposer();
    };
}

//# sourceMappingURL=adapters.js.map
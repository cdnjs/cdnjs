"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "autoUpdateFloatingElement", {
    enumerable: true,
    get: function() {
        return autoUpdateFloatingElement;
    }
});
var _instanceof = require("@swc/helpers/_/_instanceof");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _reactdom = require("@vkontakte/vkui-floating-ui/react-dom");
var defaultOptions = {
    ancestorScroll: true,
    ancestorResize: true,
    // По умолчанию отключаем, т.к. навешивать `MutationObserver` может быть дорого.
    // В `autoUpdateLib` по умолчанию опция включена. Там используется ResizeObserver, но и он не менее дорогостоящий.
    // https://github.com/floating-ui/floating-ui/blob/0a34fe9cc2c7483976785a71bd0777cd7c3f2a6a/packages/dom/src/autoUpdate.ts#L6-L33
    elementResize: false,
    animationFrame: false
};
function autoUpdateFloatingElement(reference, floating, update) {
    var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : defaultOptions;
    var _options_elementResize = options.elementResize, elementResize = _options_elementResize === void 0 ? false : _options_elementResize, restOptions = _object_without_properties._(options, [
        "elementResize"
    ]);
    var autoUpdateLibDisposer = (0, _reactdom.autoUpdate)(reference, floating, update, _object_spread_props._(_object_spread._({}, restOptions), {
        // Отключаем в библиотеке, т.к. под капотом используется `ResizeObserver`, которое не покрывается нашим `browserlist`.
        // Вместо него мы используем `MutationObserver`.
        // https://caniuse.com/resizeobserver
        elementResize: false
    }));
    // В случае если `ResizeObserver` будет полифилиться или он будет покрываться нашим `browserlist`, то надо удалить
    // код с `MutationObserver`.
    var observer = null;
    if (elementResize) {
        observer = new MutationObserver(update);
        if (_instanceof._(reference, Element)) {
            observer.observe(reference, {
                childList: true,
                subtree: true
            });
        }
        observer.observe(floating, {
            childList: true,
            subtree: true
        });
    }
    return function() {
        if (observer !== null) {
            observer.disconnect();
            observer = null;
        }
        autoUpdateLibDisposer();
    };
}

//# sourceMappingURL=adapters.js.map
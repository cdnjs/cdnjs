import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["elementResize"];
import { autoUpdate as autoUpdateLib } from '@floating-ui/react-dom';
var defaultOptions = {
  ancestorScroll: true,
  ancestorResize: true,
  // По умолчанию отключаем, т.к. навешивать `MutationObserver` может быть дорого.
  // В `autoUpdateLib` по умолчанию опция включена. Там используется ResizeObserver, но и он не менее дорогостоящий.
  // https://github.com/floating-ui/floating-ui/blob/0a34fe9cc2c7483976785a71bd0777cd7c3f2a6a/packages/dom/src/autoUpdate.ts#L6-L33
  elementResize: false,
  animationFrame: false
};
export function autoUpdateFloatingElement(reference, floating, update) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultOptions;
  var _options$elementResiz = options.elementResize,
    elementResize = _options$elementResiz === void 0 ? false : _options$elementResiz,
    restOptions = _objectWithoutProperties(options, _excluded);
  var autoUpdateLibDisposer = autoUpdateLib(reference, floating, update, _objectSpread(_objectSpread({}, restOptions), {}, {
    // Отключаем в библиотеке, т.к. под капотом используется `ResizeObserver`, которое не покрывается нашим `browserlist`.
    // Вместо него мы используем `MutationObserver`.
    // https://caniuse.com/resizeobserver
    elementResize: false
  }));

  // В случае если `ResizeObserver` будет полифилиться или он будет покрываться нашим `browserlist`, то надо удалить
  // код с `MutationObserver`.
  var observer = null;
  if (elementResize) {
    var initialUpdate = true;
    observer = new MutationObserver(function () {
      if (!initialUpdate) {
        update();
      }
      initialUpdate = false;
    });
    if (reference instanceof Element) {
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
  return function () {
    if (observer !== null) {
      observer.disconnect();
      observer = null;
    }
    autoUpdateLibDisposer();
  };
}
//# sourceMappingURL=adapters.js.map
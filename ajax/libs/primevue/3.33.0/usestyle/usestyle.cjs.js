'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('primevue/utils');
var vue = require('vue');

/*
 * Ported from useStyleTag in @vueuse/core
 * https://github.com/vueuse
 */
function tryOnMounted(fn) {
  var sync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (vue.getCurrentInstance()) vue.onMounted(fn);else if (sync) fn();else vue.nextTick(fn);
}
var _id = 0;
function useStyle(css) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var isLoaded = vue.ref(false);
  var cssRef = vue.ref(css);
  var styleRef = vue.ref(null);
  var defaultDocument = utils.DomHandler.isClient() ? window.document : undefined;
  var _options$document = options.document,
    document = _options$document === void 0 ? defaultDocument : _options$document,
    _options$immediate = options.immediate,
    immediate = _options$immediate === void 0 ? true : _options$immediate,
    _options$manual = options.manual,
    manual = _options$manual === void 0 ? false : _options$manual,
    _options$name = options.name,
    name = _options$name === void 0 ? "style_".concat(++_id) : _options$name,
    _options$id = options.id,
    id = _options$id === void 0 ? undefined : _options$id,
    _options$media = options.media,
    media = _options$media === void 0 ? undefined : _options$media,
    _options$nonce = options.nonce,
    nonce = _options$nonce === void 0 ? undefined : _options$nonce;
  var stop = function stop() {};

  /* @todo: Improve _options params */
  var load = function load(_css) {
    var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!document) return;
    var _name = _options.name || name,
      _id = _options.id || id,
      _nonce = _options.nonce || nonce;
    styleRef.value = document.querySelector("style[data-primevue-style-id=\"".concat(_name, "\"]")) || document.getElementById(_id) || document.createElement('style');
    if (!styleRef.value.isConnected) {
      cssRef.value = _css || css;
      utils.DomHandler.setAttributes(styleRef.value, {
        type: 'text/css',
        id: _id,
        media: media,
        nonce: _nonce
      });
      document.head.appendChild(styleRef.value);
      utils.DomHandler.setAttribute(styleRef.value, 'data-primevue-style-id', name);
      utils.DomHandler.setAttributes(styleRef.value, _options);
    }
    if (isLoaded.value) return;
    stop = vue.watch(cssRef, function (value) {
      styleRef.value.textContent = value;
    }, {
      immediate: true
    });
    isLoaded.value = true;
  };
  var unload = function unload() {
    if (!document || !isLoaded.value) return;
    stop();
    utils.DomHandler.isExist(styleRef.value) && document.head.removeChild(styleRef.value);
    isLoaded.value = false;
  };
  if (immediate && !manual) tryOnMounted(load);

  /*if (!manual)
    tryOnScopeDispose(unload)*/

  return {
    id: id,
    name: name,
    css: cssRef,
    unload: unload,
    load: load,
    isLoaded: vue.readonly(isLoaded)
  };
}

exports.useStyle = useStyle;

import { DomHandler } from 'primevue/utils';
import { ref, readonly, getCurrentInstance, onMounted, nextTick, watch } from 'vue';

/*
 * Ported from useStyleTag in @vueuse/core
 * https://github.com/vueuse
 */
function tryOnMounted(fn) {
  var sync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (getCurrentInstance()) onMounted(fn);else if (sync) fn();else nextTick(fn);
}
var _id = 0;
function useStyle(css) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var isLoaded = ref(false);
  var cssRef = ref(css);
  var styleRef = ref(null);
  var defaultDocument = DomHandler.isClient() ? window.document : undefined;
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
    media = _options$media === void 0 ? undefined : _options$media;
  var stop = function stop() {};
  var load = function load() {
    if (!document) return;
    styleRef.value = document.querySelector("style[data-primevue-style-id=\"".concat(name, "\"]")) || document.getElementById(id) || document.createElement('style');
    if (!styleRef.value.isConnected) {
      styleRef.value.type = 'text/css';
      id && (styleRef.value.id = id);
      media && (styleRef.value.media = media);
      document.head.appendChild(styleRef.value);
      name && styleRef.value.setAttribute('data-primevue-style-id', name);
    }
    if (isLoaded.value) return;
    stop = watch(cssRef, function (value) {
      styleRef.value.textContent = value;
    }, {
      immediate: true
    });
    isLoaded.value = true;
  };
  var unload = function unload() {
    if (!document || !isLoaded.value) return;
    stop();
    DomHandler.isExist(styleRef.value) && document.head.removeChild(styleRef.value);
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
    isLoaded: readonly(isLoaded)
  };
}

export { useStyle };

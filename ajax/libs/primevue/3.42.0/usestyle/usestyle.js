this.primevue = this.primevue || {};
this.primevue.usestyle = (function (exports, utils, vue) {
    'use strict';

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
        nonce = _options$nonce === void 0 ? undefined : _options$nonce,
        _options$props = options.props,
        props = _options$props === void 0 ? {} : _options$props;
      var stop = function stop() {};

      /* @todo: Improve _options params */
      var load = function load(_css) {
        var _props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (!document) return;
        var _styleProps = _objectSpread(_objectSpread({}, props), _props);
        var _name = _styleProps.name || name,
          _id = _styleProps.id || id,
          _nonce = _styleProps.nonce || nonce;
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
          utils.DomHandler.setAttributes(styleRef.value, _styleProps);
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

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, primevue.utils, Vue);

this.primevue = this.primevue || {};
this.primevue.basecomponent = (function (BaseStyle, utils, vue, usestyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

    function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
    function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$1(i) ? i : String(i); }
    function _toPrimitive$1(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var BaseComponentStyle = BaseStyle__default["default"].extend({
      name: 'common',
      loadGlobalStyle: function loadGlobalStyle(globalCSS) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return usestyle.useStyle(globalCSS, _objectSpread$1({
          name: 'global'
        }, options));
      }
    });

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
    function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
    function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var script = {
      name: 'BaseComponent',
      props: {
        pt: {
          type: Object,
          "default": undefined
        },
        ptOptions: {
          type: Object,
          "default": undefined
        },
        unstyled: {
          type: Boolean,
          "default": undefined
        }
      },
      inject: {
        $parentInstance: {
          "default": undefined
        }
      },
      watch: {
        isUnstyled: {
          immediate: true,
          handler: function handler(newValue) {
            if (!newValue) {
              var _this$$config, _this$$config2;
              BaseComponentStyle.loadStyle({
                nonce: (_this$$config = this.$config) === null || _this$$config === void 0 || (_this$$config = _this$$config.csp) === null || _this$$config === void 0 ? void 0 : _this$$config.nonce
              });
              this.$options.style && this.$style.loadStyle({
                nonce: (_this$$config2 = this.$config) === null || _this$$config2 === void 0 || (_this$$config2 = _this$$config2.csp) === null || _this$$config2 === void 0 ? void 0 : _this$$config2.nonce
              });
            }
          }
        }
      },
      beforeCreate: function beforeCreate() {
        var _this$pt, _this$pt2, _this$pt3, _ref, _ref$onBeforeCreate, _this$$config3, _this$$primevue, _this$$primevue2, _this$$primevue3, _ref2, _ref2$onBeforeCreate;
        var _usept = (_this$pt = this.pt) === null || _this$pt === void 0 ? void 0 : _this$pt['_usept'];
        var originalValue = _usept ? (_this$pt2 = this.pt) === null || _this$pt2 === void 0 || (_this$pt2 = _this$pt2.originalValue) === null || _this$pt2 === void 0 ? void 0 : _this$pt2[this.$.type.name] : undefined;
        var value = _usept ? (_this$pt3 = this.pt) === null || _this$pt3 === void 0 || (_this$pt3 = _this$pt3.value) === null || _this$pt3 === void 0 ? void 0 : _this$pt3[this.$.type.name] : this.pt;
        (_ref = value || originalValue) === null || _ref === void 0 || (_ref = _ref.hooks) === null || _ref === void 0 || (_ref$onBeforeCreate = _ref['onBeforeCreate']) === null || _ref$onBeforeCreate === void 0 || _ref$onBeforeCreate.call(_ref);
        var _useptInConfig = (_this$$config3 = this.$config) === null || _this$$config3 === void 0 || (_this$$config3 = _this$$config3.pt) === null || _this$$config3 === void 0 ? void 0 : _this$$config3['_usept'];
        var originalValueInConfig = _useptInConfig ? (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.pt) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.originalValue : undefined;
        var valueInConfig = _useptInConfig ? (_this$$primevue2 = this.$primevue) === null || _this$$primevue2 === void 0 || (_this$$primevue2 = _this$$primevue2.config) === null || _this$$primevue2 === void 0 || (_this$$primevue2 = _this$$primevue2.pt) === null || _this$$primevue2 === void 0 ? void 0 : _this$$primevue2.value : (_this$$primevue3 = this.$primevue) === null || _this$$primevue3 === void 0 || (_this$$primevue3 = _this$$primevue3.config) === null || _this$$primevue3 === void 0 ? void 0 : _this$$primevue3.pt;
        (_ref2 = valueInConfig || originalValueInConfig) === null || _ref2 === void 0 || (_ref2 = _ref2[this.$.type.name]) === null || _ref2 === void 0 || (_ref2 = _ref2.hooks) === null || _ref2 === void 0 || (_ref2$onBeforeCreate = _ref2['onBeforeCreate']) === null || _ref2$onBeforeCreate === void 0 || _ref2$onBeforeCreate.call(_ref2);
      },
      created: function created() {
        this._hook('onCreated');
      },
      beforeMount: function beforeMount() {
        var _this$$config4;
        BaseStyle__default["default"].loadStyle({
          nonce: (_this$$config4 = this.$config) === null || _this$$config4 === void 0 || (_this$$config4 = _this$$config4.csp) === null || _this$$config4 === void 0 ? void 0 : _this$$config4.nonce
        });
        this._loadGlobalStyles();
        this._hook('onBeforeMount');
      },
      mounted: function mounted() {
        this._hook('onMounted');
      },
      beforeUpdate: function beforeUpdate() {
        this._hook('onBeforeUpdate');
      },
      updated: function updated() {
        this._hook('onUpdated');
      },
      beforeUnmount: function beforeUnmount() {
        this._hook('onBeforeUnmount');
      },
      unmounted: function unmounted() {
        this._hook('onUnmounted');
      },
      methods: {
        _hook: function _hook(hookName) {
          if (!this.$options.hostName) {
            var selfHook = this._usePT(this._getPT(this.pt, this.$.type.name), this._getOptionValue, "hooks.".concat(hookName));
            var defaultHook = this._useDefaultPT(this._getOptionValue, "hooks.".concat(hookName));
            selfHook === null || selfHook === void 0 || selfHook();
            defaultHook === null || defaultHook === void 0 || defaultHook();
          }
        },
        _mergeProps: function _mergeProps(fn) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          return utils.ObjectUtils.isFunction(fn) ? fn.apply(void 0, args) : vue.mergeProps.apply(void 0, args);
        },
        _loadGlobalStyles: function _loadGlobalStyles() {
          var _this$$config5;
          /*
           * @todo Add self custom css support;
           * <Panel :pt="{ css: `...` }" .../>
           *
           * const selfCSS = this._getPTClassValue(this.pt, 'css', this.$params);
           * const defaultCSS = this._getPTClassValue(this.defaultPT, 'css', this.$params);
           * const mergedCSS = mergeProps(selfCSS, defaultCSS);
           * ObjectUtils.isNotEmpty(mergedCSS?.class) && this.$css.loadCustomStyle(mergedCSS?.class);
           */

          var globalCSS = this._useGlobalPT(this._getOptionValue, 'global.css', this.$params);
          utils.ObjectUtils.isNotEmpty(globalCSS) && BaseComponentStyle.loadGlobalStyle(globalCSS, {
            nonce: (_this$$config5 = this.$config) === null || _this$$config5 === void 0 || (_this$$config5 = _this$$config5.csp) === null || _this$$config5 === void 0 ? void 0 : _this$$config5.nonce
          });
        },
        _getHostInstance: function _getHostInstance(instance) {
          return instance ? this.$options.hostName ? instance.$.type.name === this.$options.hostName ? instance : this._getHostInstance(instance.$parentInstance) : instance.$parentInstance : undefined;
        },
        _getPropValue: function _getPropValue(name) {
          var _this$_getHostInstanc;
          return this[name] || ((_this$_getHostInstanc = this._getHostInstance(this)) === null || _this$_getHostInstanc === void 0 ? void 0 : _this$_getHostInstanc[name]);
        },
        _getOptionValue: function _getOptionValue(options) {
          var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          var fKeys = utils.ObjectUtils.toFlatCase(key).split('.');
          var fKey = fKeys.shift();
          return fKey ? utils.ObjectUtils.isObject(options) ? this._getOptionValue(utils.ObjectUtils.getItemValue(options[Object.keys(options).find(function (k) {
            return utils.ObjectUtils.toFlatCase(k) === fKey;
          }) || ''], params), fKeys.join('.'), params) : undefined : utils.ObjectUtils.getItemValue(options, params);
        },
        _getPTValue: function _getPTValue() {
          var _this$$config6;
          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          var searchInDefaultPT = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
          var searchOut = /./g.test(key) && !!params[key.split('.')[0]];
          var _ref3 = this._getPropValue('ptOptions') || ((_this$$config6 = this.$config) === null || _this$$config6 === void 0 ? void 0 : _this$$config6.ptOptions) || {},
            _ref3$mergeSections = _ref3.mergeSections,
            mergeSections = _ref3$mergeSections === void 0 ? true : _ref3$mergeSections,
            _ref3$mergeProps = _ref3.mergeProps,
            useMergeProps = _ref3$mergeProps === void 0 ? false : _ref3$mergeProps;
          var global = searchInDefaultPT ? searchOut ? this._useGlobalPT(this._getPTClassValue, key, params) : this._useDefaultPT(this._getPTClassValue, key, params) : undefined;
          var self = searchOut ? undefined : this._getPTSelf(obj, this._getPTClassValue, key, _objectSpread(_objectSpread({}, params), {}, {
            global: global || {}
          }));
          var datasets = this._getPTDatasets(key);
          return mergeSections || !mergeSections && self ? useMergeProps ? this._mergeProps(useMergeProps, global, self, datasets) : _objectSpread(_objectSpread(_objectSpread({}, global), self), datasets) : _objectSpread(_objectSpread({}, self), datasets);
        },
        _getPTSelf: function _getPTSelf() {
          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
            args[_key3 - 1] = arguments[_key3];
          }
          return vue.mergeProps(this._usePT.apply(this, [this._getPT(obj, this.$name)].concat(args)),
          // Exp; <component :pt="{}"
          this._usePT.apply(this, [this.$_attrsPT].concat(args)) // Exp; <component :pt:[passthrough_key]:[attribute]="{value}" or <component :pt:[passthrough_key]="() =>{value}"
          );
        },
        _getPTDatasets: function _getPTDatasets() {
          var _this$pt4, _this$pt5;
          var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          var datasetPrefix = 'data-pc-';
          var isExtended = key === 'root' && utils.ObjectUtils.isNotEmpty((_this$pt4 = this.pt) === null || _this$pt4 === void 0 ? void 0 : _this$pt4['data-pc-section']);
          return key !== 'transition' && _objectSpread(_objectSpread({}, key === 'root' && _objectSpread(_defineProperty({}, "".concat(datasetPrefix, "name"), utils.ObjectUtils.toFlatCase(isExtended ? (_this$pt5 = this.pt) === null || _this$pt5 === void 0 ? void 0 : _this$pt5['data-pc-section'] : this.$.type.name)), isExtended && _defineProperty({}, "".concat(datasetPrefix, "extend"), utils.ObjectUtils.toFlatCase(this.$.type.name)))), {}, _defineProperty({}, "".concat(datasetPrefix, "section"), utils.ObjectUtils.toFlatCase(key)));
        },
        _getPTClassValue: function _getPTClassValue() {
          var value = this._getOptionValue.apply(this, arguments);
          return utils.ObjectUtils.isString(value) || utils.ObjectUtils.isArray(value) ? {
            "class": value
          } : value;
        },
        _getPT: function _getPT(pt) {
          var _this = this;
          var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var callback = arguments.length > 2 ? arguments[2] : undefined;
          var getValue = function getValue(value) {
            var _ref5;
            var checkSameKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var computedValue = callback ? callback(value) : value;
            var _key = utils.ObjectUtils.toFlatCase(key);
            var _cKey = utils.ObjectUtils.toFlatCase(_this.$name);
            return (_ref5 = checkSameKey ? _key !== _cKey ? computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key] : undefined : computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key]) !== null && _ref5 !== void 0 ? _ref5 : computedValue;
          };
          return pt !== null && pt !== void 0 && pt.hasOwnProperty('_usept') ? {
            _usept: pt['_usept'],
            originalValue: getValue(pt.originalValue),
            value: getValue(pt.value)
          } : getValue(pt, true);
        },
        _usePT: function _usePT(pt, callback, key, params) {
          var fn = function fn(value) {
            return callback(value, key, params);
          };
          if (pt !== null && pt !== void 0 && pt.hasOwnProperty('_usept')) {
            var _this$$config7;
            var _ref6 = pt['_usept'] || ((_this$$config7 = this.$config) === null || _this$$config7 === void 0 ? void 0 : _this$$config7.ptOptions) || {},
              _ref6$mergeSections = _ref6.mergeSections,
              mergeSections = _ref6$mergeSections === void 0 ? true : _ref6$mergeSections,
              _ref6$mergeProps = _ref6.mergeProps,
              useMergeProps = _ref6$mergeProps === void 0 ? false : _ref6$mergeProps;
            var originalValue = fn(pt.originalValue);
            var value = fn(pt.value);
            if (originalValue === undefined && value === undefined) return undefined;else if (utils.ObjectUtils.isString(value)) return value;else if (utils.ObjectUtils.isString(originalValue)) return originalValue;
            return mergeSections || !mergeSections && value ? useMergeProps ? this._mergeProps(useMergeProps, originalValue, value) : _objectSpread(_objectSpread({}, originalValue), value) : value;
          }
          return fn(pt);
        },
        _useGlobalPT: function _useGlobalPT(callback, key, params) {
          return this._usePT(this.globalPT, callback, key, params);
        },
        _useDefaultPT: function _useDefaultPT(callback, key, params) {
          return this._usePT(this.defaultPT, callback, key, params);
        },
        ptm: function ptm() {
          var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return this._getPTValue(this.pt, key, _objectSpread(_objectSpread({}, this.$params), params));
        },
        ptmi: function ptmi() {
          var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          // inheritAttrs:true without `pt:*`
          return vue.mergeProps(this.$_attrsNoPT, this.ptm(key, params));
        },
        ptmo: function ptmo() {
          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          return this._getPTValue(obj, key, _objectSpread({
            instance: this
          }, params), false);
        },
        cx: function cx() {
          var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return !this.isUnstyled ? this._getOptionValue(this.$style.classes, key, _objectSpread(_objectSpread({}, this.$params), params)) : undefined;
        },
        sx: function sx() {
          var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          if (when) {
            var self = this._getOptionValue(this.$style.inlineStyles, key, _objectSpread(_objectSpread({}, this.$params), params));
            var base = this._getOptionValue(BaseComponentStyle.inlineStyles, key, _objectSpread(_objectSpread({}, this.$params), params));
            return [base, self];
          }
          return undefined;
        }
      },
      computed: {
        globalPT: function globalPT() {
          var _this$$config8,
            _this2 = this;
          return this._getPT((_this$$config8 = this.$config) === null || _this$$config8 === void 0 ? void 0 : _this$$config8.pt, undefined, function (value) {
            return utils.ObjectUtils.getItemValue(value, {
              instance: _this2
            });
          });
        },
        defaultPT: function defaultPT() {
          var _this$$config9,
            _this3 = this;
          return this._getPT((_this$$config9 = this.$config) === null || _this$$config9 === void 0 ? void 0 : _this$$config9.pt, undefined, function (value) {
            return _this3._getOptionValue(value, _this3.$name, _objectSpread({}, _this3.$params)) || utils.ObjectUtils.getItemValue(value, _objectSpread({}, _this3.$params));
          });
        },
        isUnstyled: function isUnstyled() {
          var _this$$config10;
          return this.unstyled !== undefined ? this.unstyled : (_this$$config10 = this.$config) === null || _this$$config10 === void 0 ? void 0 : _this$$config10.unstyled;
        },
        $params: function $params() {
          var parentInstance = this._getHostInstance(this) || this.$parent;
          return {
            instance: this,
            props: this.$props,
            state: this.$data,
            attrs: this.$attrs,
            parent: {
              instance: parentInstance,
              props: parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$props,
              state: parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$data,
              attrs: parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$attrs
            },
            /* @deprecated since v3.43.0. Use the `parent.instance` instead of the `parentInstance`.*/
            parentInstance: parentInstance
          };
        },
        $style: function $style() {
          return _objectSpread(_objectSpread({
            classes: undefined,
            inlineStyles: undefined,
            loadStyle: function loadStyle() {},
            loadCustomStyle: function loadCustomStyle() {}
          }, (this._getHostInstance(this) || {}).$style), this.$options.style);
        },
        $config: function $config() {
          var _this$$primevue4;
          return (_this$$primevue4 = this.$primevue) === null || _this$$primevue4 === void 0 ? void 0 : _this$$primevue4.config;
        },
        $name: function $name() {
          return this.$options.hostName || this.$.type.name;
        },
        $_attrsPT: function $_attrsPT() {
          return Object.entries(this.$attrs || {}).filter(function (_ref7) {
            var _ref8 = _slicedToArray(_ref7, 1),
              key = _ref8[0];
            return key === null || key === void 0 ? void 0 : key.startsWith('pt:');
          }).reduce(function (result, _ref9) {
            var _ref10 = _slicedToArray(_ref9, 2),
              key = _ref10[0],
              value = _ref10[1];
            var _key$split = key.split(':'),
              _key$split2 = _toArray(_key$split),
              rest = _key$split2.slice(1);
            rest === null || rest === void 0 || rest.reduce(function (currentObj, nestedKey, index, array) {
              !currentObj[nestedKey] && (currentObj[nestedKey] = index === array.length - 1 ? value : {});
              return currentObj[nestedKey];
            }, result);
            return result;
          }, {});
        },
        $_attrsNoPT: function $_attrsNoPT() {
          // $attrs without `pt:*`
          return Object.entries(this.$attrs || {}).filter(function (_ref11) {
            var _ref12 = _slicedToArray(_ref11, 1),
              key = _ref12[0];
            return !(key !== null && key !== void 0 && key.startsWith('pt:'));
          }).reduce(function (acc, _ref13) {
            var _ref14 = _slicedToArray(_ref13, 2),
              key = _ref14[0],
              value = _ref14[1];
            acc[key] = value;
            return acc;
          }, {});
        }
      }
    };

    return script;

})(primevue.base.style, primevue.utils, Vue, primevue.usestyle);

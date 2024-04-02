this.primevue = this.primevue || {};
this.primevue.basedirective = (function (BaseStyle, Theme, utils, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);
    var Theme__default = /*#__PURE__*/_interopDefaultLegacy(Theme);

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
    var BaseDirective = {
      _getMeta: function _getMeta() {
        return [utils.ObjectUtils.isObject(arguments.length <= 0 ? undefined : arguments[0]) ? undefined : arguments.length <= 0 ? undefined : arguments[0], utils.ObjectUtils.getItemValue(utils.ObjectUtils.isObject(arguments.length <= 0 ? undefined : arguments[0]) ? arguments.length <= 0 ? undefined : arguments[0] : arguments.length <= 1 ? undefined : arguments[1])];
      },
      _getConfig: function _getConfig(binding, vnode) {
        var _ref, _binding$instance, _vnode$ctx;
        return (_ref = (binding === null || binding === void 0 || (_binding$instance = binding.instance) === null || _binding$instance === void 0 ? void 0 : _binding$instance.$primevue) || (vnode === null || vnode === void 0 || (_vnode$ctx = vnode.ctx) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.appContext) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.config) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.globalProperties) === null || _vnode$ctx === void 0 ? void 0 : _vnode$ctx.$primevue)) === null || _ref === void 0 ? void 0 : _ref.config;
      },
      _getOptionValue: function _getOptionValue(options) {
        var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var fKeys = utils.ObjectUtils.toFlatCase(key).split('.');
        var fKey = fKeys.shift();
        return fKey ? utils.ObjectUtils.isObject(options) ? BaseDirective._getOptionValue(utils.ObjectUtils.getItemValue(options[Object.keys(options).find(function (k) {
          return utils.ObjectUtils.toFlatCase(k) === fKey;
        }) || ''], params), fKeys.join('.'), params) : undefined : utils.ObjectUtils.getItemValue(options, params);
      },
      _getPTValue: function _getPTValue() {
        var _instance$binding, _instance$$config;
        var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var searchInDefaultPT = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var getValue = function getValue() {
          var value = BaseDirective._getOptionValue.apply(BaseDirective, arguments);
          return utils.ObjectUtils.isString(value) || utils.ObjectUtils.isArray(value) ? {
            "class": value
          } : value;
        };
        var _ref2 = ((_instance$binding = instance.binding) === null || _instance$binding === void 0 || (_instance$binding = _instance$binding.value) === null || _instance$binding === void 0 ? void 0 : _instance$binding.ptOptions) || ((_instance$$config = instance.$config) === null || _instance$$config === void 0 ? void 0 : _instance$$config.ptOptions) || {},
          _ref2$mergeSections = _ref2.mergeSections,
          mergeSections = _ref2$mergeSections === void 0 ? true : _ref2$mergeSections,
          _ref2$mergeProps = _ref2.mergeProps,
          useMergeProps = _ref2$mergeProps === void 0 ? false : _ref2$mergeProps;
        var global = searchInDefaultPT ? BaseDirective._useDefaultPT(instance, instance.defaultPT(), getValue, key, params) : undefined;
        var self = BaseDirective._usePT(instance, BaseDirective._getPT(obj, instance.$name), getValue, key, _objectSpread(_objectSpread({}, params), {}, {
          global: global || {}
        }));
        var datasets = BaseDirective._getPTDatasets(instance, key);
        return mergeSections || !mergeSections && self ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, global, self, datasets) : _objectSpread(_objectSpread(_objectSpread({}, global), self), datasets) : _objectSpread(_objectSpread({}, self), datasets);
      },
      _getPTDatasets: function _getPTDatasets() {
        var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var datasetPrefix = 'data-pc-';
        return _objectSpread(_objectSpread({}, key === 'root' && _defineProperty({}, "".concat(datasetPrefix, "name"), utils.ObjectUtils.toFlatCase(instance.$name))), {}, _defineProperty({}, "".concat(datasetPrefix, "section"), utils.ObjectUtils.toFlatCase(key)));
      },
      _getPT: function _getPT(pt) {
        var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var callback = arguments.length > 2 ? arguments[2] : undefined;
        var getValue = function getValue(value) {
          var _computedValue$_key;
          var computedValue = callback ? callback(value) : value;
          var _key = utils.ObjectUtils.toFlatCase(key);
          return (_computedValue$_key = computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key]) !== null && _computedValue$_key !== void 0 ? _computedValue$_key : computedValue;
        };
        return pt !== null && pt !== void 0 && pt.hasOwnProperty('_usept') ? {
          _usept: pt['_usept'],
          originalValue: getValue(pt.originalValue),
          value: getValue(pt.value)
        } : getValue(pt);
      },
      _usePT: function _usePT() {
        var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var pt = arguments.length > 1 ? arguments[1] : undefined;
        var callback = arguments.length > 2 ? arguments[2] : undefined;
        var key = arguments.length > 3 ? arguments[3] : undefined;
        var params = arguments.length > 4 ? arguments[4] : undefined;
        var fn = function fn(value) {
          return callback(value, key, params);
        };
        if (pt !== null && pt !== void 0 && pt.hasOwnProperty('_usept')) {
          var _instance$$config2;
          var _ref4 = pt['_usept'] || ((_instance$$config2 = instance.$config) === null || _instance$$config2 === void 0 ? void 0 : _instance$$config2.ptOptions) || {},
            _ref4$mergeSections = _ref4.mergeSections,
            mergeSections = _ref4$mergeSections === void 0 ? true : _ref4$mergeSections,
            _ref4$mergeProps = _ref4.mergeProps,
            useMergeProps = _ref4$mergeProps === void 0 ? false : _ref4$mergeProps;
          var originalValue = fn(pt.originalValue);
          var value = fn(pt.value);
          if (originalValue === undefined && value === undefined) return undefined;else if (utils.ObjectUtils.isString(value)) return value;else if (utils.ObjectUtils.isString(originalValue)) return originalValue;
          return mergeSections || !mergeSections && value ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, originalValue, value) : _objectSpread(_objectSpread({}, originalValue), value) : value;
        }
        return fn(pt);
      },
      _useDefaultPT: function _useDefaultPT() {
        var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var defaultPT = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var callback = arguments.length > 2 ? arguments[2] : undefined;
        var key = arguments.length > 3 ? arguments[3] : undefined;
        var params = arguments.length > 4 ? arguments[4] : undefined;
        return BaseDirective._usePT(instance, defaultPT, callback, key, params);
      },
      _loadStyles: function _loadStyles(el, binding, vnode) {
        var _config$csp, _el$$instance, _el$$instance2, _config$csp2, _config$csp3, _config$csp5;
        var config = BaseDirective._getConfig(binding, vnode);
        BaseStyle__default["default"].loadStyle({
          nonce: config === null || config === void 0 || (_config$csp = config.csp) === null || _config$csp === void 0 ? void 0 : _config$csp.nonce
        });
        !((_el$$instance = el.$instance) !== null && _el$$instance !== void 0 && _el$$instance.isUnstyled()) && ((_el$$instance2 = el.$instance) === null || _el$$instance2 === void 0 || (_el$$instance2 = _el$$instance2.$style) === null || _el$$instance2 === void 0 ? void 0 : _el$$instance2.loadStyle({
          nonce: config === null || config === void 0 || (_config$csp2 = config.csp) === null || _config$csp2 === void 0 ? void 0 : _config$csp2.nonce
        }));
        BaseDirective._loadThemeStyles(el.$instance, {
          nonce: config === null || config === void 0 || (_config$csp3 = config.csp) === null || _config$csp3 === void 0 ? void 0 : _config$csp3.nonce
        });
        Theme.ThemeService.on('theme:change', function () {
          var _config$csp4;
          return BaseDirective._loadThemeStyles(el.$instance, {
            nonce: config === null || config === void 0 || (_config$csp4 = config.csp) === null || _config$csp4 === void 0 ? void 0 : _config$csp4.nonce
          });
        });
        BaseDirective._loadScopedThemeStyles(el.$instance, {
          nonce: config === null || config === void 0 || (_config$csp5 = config.csp) === null || _config$csp5 === void 0 ? void 0 : _config$csp5.nonce
        });
      },
      _loadThemeStyles: function _loadThemeStyles() {
        var _instance$$style2, _instance$$style3;
        var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var useStyleOptions = arguments.length > 1 ? arguments[1] : undefined;
        if (instance !== null && instance !== void 0 && instance.isUnstyled()) return;

        // common
        if (!Theme__default["default"].isStyleNameLoaded('common')) {
          var _instance$$style, _instance$$style$getC;
          var _ref5 = ((_instance$$style = instance.$style) === null || _instance$$style === void 0 || (_instance$$style$getC = _instance$$style.getCommonThemeCSS) === null || _instance$$style$getC === void 0 ? void 0 : _instance$$style$getC.call(_instance$$style)) || {},
            primitive = _ref5.primitive,
            semantic = _ref5.semantic,
            global = _ref5.global;
          BaseStyle__default["default"].loadTheme(primitive, _objectSpread({
            name: 'primitive-variables'
          }, useStyleOptions));
          BaseStyle__default["default"].loadTheme(semantic, _objectSpread({
            name: 'semantic-variables'
          }, useStyleOptions));
          BaseStyle__default["default"].loadTheme(global, _objectSpread({
            name: 'global-style'
          }, useStyleOptions));
          Theme__default["default"].setLoadedStyleName('common');
        }

        // directive
        if (!Theme__default["default"].isStyleNameLoaded((_instance$$style2 = instance.$style) === null || _instance$$style2 === void 0 ? void 0 : _instance$$style2.name) && (_instance$$style3 = instance.$style) !== null && _instance$$style3 !== void 0 && _instance$$style3.name) {
          var _instance$$style4, _instance$$style4$get, _instance$$style5, _instance$$style6;
          var _ref6 = ((_instance$$style4 = instance.$style) === null || _instance$$style4 === void 0 || (_instance$$style4$get = _instance$$style4.getDirectiveThemeCSS) === null || _instance$$style4$get === void 0 ? void 0 : _instance$$style4$get.call(_instance$$style4)) || {},
            variables = _ref6.variables,
            style = _ref6.style;
          (_instance$$style5 = instance.$style) === null || _instance$$style5 === void 0 || _instance$$style5.loadTheme(variables, _objectSpread({
            name: "".concat(instance.$style.name, "-variables")
          }, useStyleOptions));
          (_instance$$style6 = instance.$style) === null || _instance$$style6 === void 0 || _instance$$style6.loadTheme(style, _objectSpread({
            name: "".concat(instance.$style.name, "-style")
          }, useStyleOptions));
          Theme__default["default"].setLoadedStyleName(instance.$style.name);
        }

        // layer order
        if (!Theme__default["default"].isStyleNameLoaded('layer-order')) {
          var _instance$$style7, _instance$$style7$get;
          var layerOrder = (_instance$$style7 = instance.$style) === null || _instance$$style7 === void 0 || (_instance$$style7$get = _instance$$style7.getLayerOrderThemeCSS) === null || _instance$$style7$get === void 0 ? void 0 : _instance$$style7$get.call(_instance$$style7);
          BaseStyle__default["default"].loadTheme(layerOrder, _objectSpread({
            name: 'layer-order',
            first: true
          }, useStyleOptions));
          Theme__default["default"].setLoadedStyleName('layer-order');
        }
      },
      _loadScopedThemeStyles: function _loadScopedThemeStyles() {
        var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var useStyleOptions = arguments.length > 1 ? arguments[1] : undefined;
        var preset = instance.preset();
        if (preset && instance.$attrSelector) {
          var _instance$$style8, _instance$$style8$get, _instance$$style9;
          var variables = ((_instance$$style8 = instance.$style) === null || _instance$$style8 === void 0 || (_instance$$style8$get = _instance$$style8.getPresetThemeCSS) === null || _instance$$style8$get === void 0 ? void 0 : _instance$$style8$get.call(_instance$$style8, preset, "[".concat(instance.$attrSelector, "]"))) || {};
          var scopedStyle = (_instance$$style9 = instance.$style) === null || _instance$$style9 === void 0 ? void 0 : _instance$$style9.loadTheme(variables, _objectSpread({
            name: "".concat(instance.$attrSelector, "-").concat(instance.$style.name)
          }, useStyleOptions));
          instance.scopedStyleEl = scopedStyle.el;
        }
      },
      _hook: function _hook(directiveName, hookName, el, binding, vnode, prevVnode) {
        var _binding$value, _config$pt;
        var name = "on".concat(utils.ObjectUtils.toCapitalCase(hookName));
        var config = BaseDirective._getConfig(binding, vnode);
        var instance = el === null || el === void 0 ? void 0 : el.$instance;
        var selfHook = BaseDirective._usePT(instance, BaseDirective._getPT(binding === null || binding === void 0 || (_binding$value = binding.value) === null || _binding$value === void 0 ? void 0 : _binding$value.pt, directiveName), BaseDirective._getOptionValue, "hooks.".concat(name));
        var defaultHook = BaseDirective._useDefaultPT(instance, config === null || config === void 0 || (_config$pt = config.pt) === null || _config$pt === void 0 || (_config$pt = _config$pt.directives) === null || _config$pt === void 0 ? void 0 : _config$pt[directiveName], BaseDirective._getOptionValue, "hooks.".concat(name));
        var options = {
          el: el,
          binding: binding,
          vnode: vnode,
          prevVnode: prevVnode
        };
        selfHook === null || selfHook === void 0 || selfHook(instance, options);
        defaultHook === null || defaultHook === void 0 || defaultHook(instance, options);
      },
      _mergeProps: function _mergeProps() {
        var fn = arguments.length > 1 ? arguments[1] : undefined;
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }
        return utils.ObjectUtils.isFunction(fn) ? fn.apply(void 0, args) : vue.mergeProps.apply(void 0, args);
      },
      _extend: function _extend(name) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var handleHook = function handleHook(hook, el, binding, vnode, prevVnode) {
          var _el$$instance$hook, _el$$instance11;
          el._$instances = el._$instances || {};
          var config = BaseDirective._getConfig(binding, vnode);
          var $prevInstance = el._$instances[name] || {};
          var $options = utils.ObjectUtils.isEmpty($prevInstance) ? _objectSpread(_objectSpread({}, options), options === null || options === void 0 ? void 0 : options.methods) : {};
          el._$instances[name] = _objectSpread(_objectSpread({}, $prevInstance), {}, {
            /* new instance variables to pass in directive methods */
            $name: name,
            $host: el,
            $binding: binding,
            $modifiers: binding === null || binding === void 0 ? void 0 : binding.modifiers,
            $value: binding === null || binding === void 0 ? void 0 : binding.value,
            $el: $prevInstance['$el'] || el || undefined,
            $style: _objectSpread({
              classes: undefined,
              inlineStyles: undefined,
              loadStyle: function loadStyle() {},
              loadTheme: function loadTheme() {}
            }, options === null || options === void 0 ? void 0 : options.style),
            $config: config,
            $attrSelector: el.$attrSelector,
            /* computed instance variables */
            defaultPT: function defaultPT() {
              return BaseDirective._getPT(config === null || config === void 0 ? void 0 : config.pt, undefined, function (value) {
                var _value$directives;
                return value === null || value === void 0 || (_value$directives = value.directives) === null || _value$directives === void 0 ? void 0 : _value$directives[name];
              });
            },
            isUnstyled: function isUnstyled() {
              var _el$$instance3, _el$$instance4;
              return ((_el$$instance3 = el.$instance) === null || _el$$instance3 === void 0 || (_el$$instance3 = _el$$instance3.$binding) === null || _el$$instance3 === void 0 || (_el$$instance3 = _el$$instance3.value) === null || _el$$instance3 === void 0 ? void 0 : _el$$instance3.unstyled) !== undefined ? (_el$$instance4 = el.$instance) === null || _el$$instance4 === void 0 || (_el$$instance4 = _el$$instance4.$binding) === null || _el$$instance4 === void 0 || (_el$$instance4 = _el$$instance4.value) === null || _el$$instance4 === void 0 ? void 0 : _el$$instance4.unstyled : config === null || config === void 0 ? void 0 : config.unstyled;
            },
            theme: function theme() {
              var _el$$instance5;
              return (_el$$instance5 = el.$instance) === null || _el$$instance5 === void 0 || (_el$$instance5 = _el$$instance5.$config) === null || _el$$instance5 === void 0 ? void 0 : _el$$instance5.theme;
            },
            preset: function preset() {
              var _el$$instance6;
              return (_el$$instance6 = el.$instance) === null || _el$$instance6 === void 0 || (_el$$instance6 = _el$$instance6.$binding) === null || _el$$instance6 === void 0 || (_el$$instance6 = _el$$instance6.value) === null || _el$$instance6 === void 0 ? void 0 : _el$$instance6.dt;
            },
            /* instance's methods */
            ptm: function ptm() {
              var _el$$instance7;
              var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
              var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
              return BaseDirective._getPTValue(el.$instance, (_el$$instance7 = el.$instance) === null || _el$$instance7 === void 0 || (_el$$instance7 = _el$$instance7.$binding) === null || _el$$instance7 === void 0 || (_el$$instance7 = _el$$instance7.value) === null || _el$$instance7 === void 0 ? void 0 : _el$$instance7.pt, key, _objectSpread({}, params));
            },
            ptmo: function ptmo() {
              var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
              var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
              return BaseDirective._getPTValue(el.$instance, obj, key, params, false);
            },
            cx: function cx() {
              var _el$$instance8, _el$$instance9;
              var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
              var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
              return !((_el$$instance8 = el.$instance) !== null && _el$$instance8 !== void 0 && _el$$instance8.isUnstyled()) ? BaseDirective._getOptionValue((_el$$instance9 = el.$instance) === null || _el$$instance9 === void 0 || (_el$$instance9 = _el$$instance9.$style) === null || _el$$instance9 === void 0 ? void 0 : _el$$instance9.classes, key, _objectSpread({}, params)) : undefined;
            },
            sx: function sx() {
              var _el$$instance10;
              var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
              var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
              var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
              return when ? BaseDirective._getOptionValue((_el$$instance10 = el.$instance) === null || _el$$instance10 === void 0 || (_el$$instance10 = _el$$instance10.$style) === null || _el$$instance10 === void 0 ? void 0 : _el$$instance10.inlineStyles, key, _objectSpread({}, params)) : undefined;
            }
          }, $options);
          el.$instance = el._$instances[name]; // pass instance data to hooks
          (_el$$instance$hook = (_el$$instance11 = el.$instance)[hook]) === null || _el$$instance$hook === void 0 || _el$$instance$hook.call(_el$$instance11, el, binding, vnode, prevVnode); // handle hook in directive implementation
          el["$".concat(name)] = el.$instance; // expose all options with $<directive_name>
          BaseDirective._hook(name, hook, el, binding, vnode, prevVnode); // handle hooks during directive uses (global and self-definition)
        };
        return {
          created: function created(el, binding, vnode, prevVnode) {
            handleHook('created', el, binding, vnode, prevVnode);
          },
          beforeMount: function beforeMount(el, binding, vnode, prevVnode) {
            el.$attrSelector = utils.UniqueComponentId('pd');
            BaseDirective._loadStyles(el, binding, vnode);
            handleHook('beforeMount', el, binding, vnode, prevVnode);
          },
          mounted: function mounted(el, binding, vnode, prevVnode) {
            BaseDirective._loadStyles(el, binding, vnode);
            handleHook('mounted', el, binding, vnode, prevVnode);
          },
          beforeUpdate: function beforeUpdate(el, binding, vnode, prevVnode) {
            handleHook('beforeUpdate', el, binding, vnode, prevVnode);
          },
          updated: function updated(el, binding, vnode, prevVnode) {
            BaseDirective._loadStyles(el, binding, vnode);
            handleHook('updated', el, binding, vnode, prevVnode);
          },
          beforeUnmount: function beforeUnmount(el, binding, vnode, prevVnode) {
            handleHook('beforeUnmount', el, binding, vnode, prevVnode);
          },
          unmounted: function unmounted(el, binding, vnode, prevVnode) {
            var _el$$instance12;
            (_el$$instance12 = el.$instance) === null || _el$$instance12 === void 0 || (_el$$instance12 = _el$$instance12.scopedStyleEl) === null || _el$$instance12 === void 0 || (_el$$instance12 = _el$$instance12.value) === null || _el$$instance12 === void 0 || _el$$instance12.remove();
            handleHook('unmounted', el, binding, vnode, prevVnode);
          }
        };
      },
      extend: function extend() {
        var _BaseDirective$_getMe = BaseDirective._getMeta.apply(BaseDirective, arguments),
          _BaseDirective$_getMe2 = _slicedToArray(_BaseDirective$_getMe, 2),
          name = _BaseDirective$_getMe2[0],
          options = _BaseDirective$_getMe2[1];
        return _objectSpread({
          extend: function extend() {
            var _BaseDirective$_getMe3 = BaseDirective._getMeta.apply(BaseDirective, arguments),
              _BaseDirective$_getMe4 = _slicedToArray(_BaseDirective$_getMe3, 2),
              _name = _BaseDirective$_getMe4[0],
              _options = _BaseDirective$_getMe4[1];
            return BaseDirective.extend(_name, _objectSpread(_objectSpread(_objectSpread({}, options), options === null || options === void 0 ? void 0 : options.methods), _options));
          }
        }, BaseDirective._extend(name, options));
      }
    };

    return BaseDirective;

})(primevue.base.style, primevue.themes, primevue.utils, Vue);

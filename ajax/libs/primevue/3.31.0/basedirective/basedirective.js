this.primevue = this.primevue || {};
this.primevue.basedirective = (function (base, utils, vue) {
    'use strict';

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
    function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
    function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var BaseDirective = {
      _getMeta: function _getMeta() {
        return [utils.ObjectUtils.isObject(arguments.length <= 0 ? undefined : arguments[0]) ? undefined : arguments.length <= 0 ? undefined : arguments[0], utils.ObjectUtils.getItemValue(utils.ObjectUtils.isObject(arguments.length <= 0 ? undefined : arguments[0]) ? arguments.length <= 0 ? undefined : arguments[0] : arguments.length <= 1 ? undefined : arguments[1])];
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
        var datasetPrefix = 'data-pc-';
        var self = getValue(obj, key, params);
        var globalPT = searchInDefaultPT ? getValue(instance.defaultPT, key, params) : undefined;
        var merged = vue.mergeProps(self, globalPT, _objectSpread(_objectSpread({}, key === 'root' && _defineProperty({}, "".concat(datasetPrefix, "name"), utils.ObjectUtils.toFlatCase(instance.$name))), {}, _defineProperty({}, "".concat(datasetPrefix, "section"), utils.ObjectUtils.toFlatCase(key))));
        return merged;
      },
      _hook: function _hook(directiveName, hookName, el, binding, vnode, prevVnode) {
        var _binding$instance, _binding$value, _config$pt;
        var name = "on".concat(utils.ObjectUtils.toCapitalCase(hookName));
        var config = binding === null || binding === void 0 || (_binding$instance = binding.instance) === null || _binding$instance === void 0 || (_binding$instance = _binding$instance.$primevue) === null || _binding$instance === void 0 ? void 0 : _binding$instance.config;
        var selfHook = binding === null || binding === void 0 || (_binding$value = binding.value) === null || _binding$value === void 0 || (_binding$value = _binding$value.pt) === null || _binding$value === void 0 || (_binding$value = _binding$value.hooks) === null || _binding$value === void 0 ? void 0 : _binding$value[name];
        var globalHook = config === null || config === void 0 || (_config$pt = config.pt) === null || _config$pt === void 0 || (_config$pt = _config$pt.directives) === null || _config$pt === void 0 || (_config$pt = _config$pt[directiveName]) === null || _config$pt === void 0 || (_config$pt = _config$pt.hooks) === null || _config$pt === void 0 ? void 0 : _config$pt[name];
        var options = {
          el: el,
          binding: binding,
          vnode: vnode,
          prevVnode: prevVnode
        };
        selfHook === null || selfHook === void 0 ? void 0 : selfHook(el === null || el === void 0 ? void 0 : el.$instance, options);
        globalHook === null || globalHook === void 0 ? void 0 : globalHook(el === null || el === void 0 ? void 0 : el.$instance, options);
      },
      _extend: function _extend(name) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var handleHook = function handleHook(hook, el, binding, vnode, prevVnode) {
          var _binding$instance2, _config$pt2, _el$$instance$hook, _el$$instance5;
          el._$instances = el._$instances || {};
          var config = binding === null || binding === void 0 || (_binding$instance2 = binding.instance) === null || _binding$instance2 === void 0 || (_binding$instance2 = _binding$instance2.$primevue) === null || _binding$instance2 === void 0 ? void 0 : _binding$instance2.config;
          var $prevInstance = el._$instances[name] || {};
          var $options = utils.ObjectUtils.isEmpty($prevInstance) ? _objectSpread(_objectSpread({}, options), options === null || options === void 0 ? void 0 : options.methods) : {};
          el._$instances[name] = _objectSpread(_objectSpread({}, $prevInstance), {}, {
            /* new instance variables to pass in directive methods */
            $name: name,
            $host: el,
            $binding: binding,
            $el: $prevInstance['$el'] || undefined,
            $css: _objectSpread({
              classes: undefined,
              inlineStyles: undefined,
              loadStyle: function loadStyle() {}
            }, options === null || options === void 0 ? void 0 : options.css),
            /* computed instance variables */
            defaultPT: config === null || config === void 0 || (_config$pt2 = config.pt) === null || _config$pt2 === void 0 || (_config$pt2 = _config$pt2.directives) === null || _config$pt2 === void 0 ? void 0 : _config$pt2[name],
            isUnstyled: el.unstyled !== undefined ? el.unstyled : config === null || config === void 0 ? void 0 : config.unstyled,
            /* instance's methods */
            ptm: function ptm() {
              var _el$$instance;
              var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
              var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
              return BaseDirective._getPTValue(el.$instance, (_el$$instance = el.$instance) === null || _el$$instance === void 0 || (_el$$instance = _el$$instance.$binding) === null || _el$$instance === void 0 || (_el$$instance = _el$$instance.value) === null || _el$$instance === void 0 ? void 0 : _el$$instance.pt, key, _objectSpread({}, params));
            },
            ptmo: function ptmo() {
              var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
              var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
              return BaseDirective._getPTValue(el.$instance, obj, key, params, false);
            },
            cx: function cx() {
              var _el$$instance2, _el$$instance3;
              var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
              var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
              return !((_el$$instance2 = el.$instance) !== null && _el$$instance2 !== void 0 && _el$$instance2.isUnstyled) ? BaseDirective._getOptionValue((_el$$instance3 = el.$instance) === null || _el$$instance3 === void 0 || (_el$$instance3 = _el$$instance3.$css) === null || _el$$instance3 === void 0 ? void 0 : _el$$instance3.classes, key, _objectSpread({}, params)) : undefined;
            },
            sx: function sx() {
              var _el$$instance4;
              var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
              var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
              var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
              return when ? BaseDirective._getOptionValue((_el$$instance4 = el.$instance) === null || _el$$instance4 === void 0 || (_el$$instance4 = _el$$instance4.$css) === null || _el$$instance4 === void 0 ? void 0 : _el$$instance4.inlineStyles, key, _objectSpread({}, params)) : undefined;
            }
          }, $options);
          el.$instance = el._$instances[name]; // pass instance data to hooks
          (_el$$instance$hook = (_el$$instance5 = el.$instance)[hook]) === null || _el$$instance$hook === void 0 ? void 0 : _el$$instance$hook.call(_el$$instance5, el, binding, vnode, prevVnode); // handle hook in directive implementation
          BaseDirective._hook(name, hook, el, binding, vnode, prevVnode); // handle hooks during directive uses (global and self-definition)
        };

        return {
          created: function created(el, binding, vnode, prevVnode) {
            handleHook('created', el, binding, vnode, prevVnode);
          },
          beforeMount: function beforeMount(el, binding, vnode, prevVnode) {
            var _el$$instance6, _el$$instance7;
            base.loadBaseStyle();
            !((_el$$instance6 = el.$instance) !== null && _el$$instance6 !== void 0 && _el$$instance6.isUnstyled) && ((_el$$instance7 = el.$instance) === null || _el$$instance7 === void 0 || (_el$$instance7 = _el$$instance7.$css) === null || _el$$instance7 === void 0 ? void 0 : _el$$instance7.loadStyle());
            handleHook('beforeMount', el, binding, vnode, prevVnode);
          },
          mounted: function mounted(el, binding, vnode, prevVnode) {
            handleHook('mounted', el, binding, vnode, prevVnode);
          },
          beforeUpdate: function beforeUpdate(el, binding, vnode, prevVnode) {
            handleHook('beforeUpdate', el, binding, vnode, prevVnode);
          },
          updated: function updated(el, binding, vnode, prevVnode) {
            handleHook('updated', el, binding, vnode, prevVnode);
          },
          beforeUnmount: function beforeUnmount(el, binding, vnode, prevVnode) {
            handleHook('beforeUnmount', el, binding, vnode, prevVnode);
          },
          unmounted: function unmounted(el, binding, vnode, prevVnode) {
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

})(primevue.base, primevue.utils, Vue);

this.primevue = this.primevue || {};
this.primevue.focustrap = (function (utils, BaseDirective, FocusTrapStyle) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseDirective__default = /*#__PURE__*/_interopDefaultLegacy(BaseDirective);
    var FocusTrapStyle__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrapStyle);

    var BaseFocusTrap = BaseDirective__default["default"].extend({
      style: FocusTrapStyle__default["default"]
    });

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var FocusTrap = BaseFocusTrap.extend('focustrap', {
      mounted: function mounted(el, binding) {
        var _ref = binding.value || {},
          disabled = _ref.disabled;
        if (!disabled) {
          this.createHiddenFocusableElements(el, binding);
          this.bind(el, binding);
          this.autoElementFocus(el, binding);
        }
        el.setAttribute('data-pd-focustrap', true);
        this.$el = el;
      },
      updated: function updated(el, binding) {
        var _ref2 = binding.value || {},
          disabled = _ref2.disabled;
        disabled && this.unbind(el);
      },
      unmounted: function unmounted(el) {
        this.unbind(el);
      },
      methods: {
        getComputedSelector: function getComputedSelector(selector) {
          return ":not(.p-hidden-focusable):not([data-p-hidden-focusable=\"true\"])".concat(selector !== null && selector !== void 0 ? selector : '');
        },
        bind: function bind(el, binding) {
          var _this = this;
          var _ref3 = binding.value || {},
            onFocusIn = _ref3.onFocusIn,
            onFocusOut = _ref3.onFocusOut;
          el.$_pfocustrap_mutationobserver = new MutationObserver(function (mutationList) {
            mutationList.forEach(function (mutation) {
              if (mutation.type === 'childList' && !el.contains(document.activeElement)) {
                var findNextFocusableElement = function findNextFocusableElement(_el) {
                  var focusableElement = utils.DomHandler.isFocusableElement(_el) ? utils.DomHandler.isFocusableElement(_el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) ? _el : utils.DomHandler.getFirstFocusableElement(el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) : utils.DomHandler.getFirstFocusableElement(_el);
                  return utils.ObjectUtils.isNotEmpty(focusableElement) ? focusableElement : _el.nextSibling && findNextFocusableElement(_el.nextSibling);
                };
                utils.DomHandler.focus(findNextFocusableElement(mutation.nextSibling));
              }
            });
          });
          el.$_pfocustrap_mutationobserver.disconnect();
          el.$_pfocustrap_mutationobserver.observe(el, {
            childList: true
          });
          el.$_pfocustrap_focusinlistener = function (event) {
            return onFocusIn && onFocusIn(event);
          };
          el.$_pfocustrap_focusoutlistener = function (event) {
            return onFocusOut && onFocusOut(event);
          };
          el.addEventListener('focusin', el.$_pfocustrap_focusinlistener);
          el.addEventListener('focusout', el.$_pfocustrap_focusoutlistener);
        },
        unbind: function unbind(el) {
          el.$_pfocustrap_mutationobserver && el.$_pfocustrap_mutationobserver.disconnect();
          el.$_pfocustrap_focusinlistener && el.removeEventListener('focusin', el.$_pfocustrap_focusinlistener) && (el.$_pfocustrap_focusinlistener = null);
          el.$_pfocustrap_focusoutlistener && el.removeEventListener('focusout', el.$_pfocustrap_focusoutlistener) && (el.$_pfocustrap_focusoutlistener = null);
        },
        autoFocus: function autoFocus(options) {
          this.autoElementFocus(this.$el, {
            value: _objectSpread(_objectSpread({}, options), {}, {
              autoFocus: true
            })
          });
        },
        autoElementFocus: function autoElementFocus(el, binding) {
          var _ref4 = binding.value || {},
            _ref4$autoFocusSelect = _ref4.autoFocusSelector,
            autoFocusSelector = _ref4$autoFocusSelect === void 0 ? '' : _ref4$autoFocusSelect,
            _ref4$firstFocusableS = _ref4.firstFocusableSelector,
            firstFocusableSelector = _ref4$firstFocusableS === void 0 ? '' : _ref4$firstFocusableS,
            _ref4$autoFocus = _ref4.autoFocus,
            autoFocus = _ref4$autoFocus === void 0 ? false : _ref4$autoFocus;
          var focusableElement = utils.DomHandler.getFirstFocusableElement(el, "[autofocus]".concat(this.getComputedSelector(autoFocusSelector)));
          autoFocus && !focusableElement && (focusableElement = utils.DomHandler.getFirstFocusableElement(el, this.getComputedSelector(firstFocusableSelector)));
          utils.DomHandler.focus(focusableElement);
        },
        onFirstHiddenElementFocus: function onFirstHiddenElementFocus(event) {
          var _this$$el;
          var currentTarget = event.currentTarget,
            relatedTarget = event.relatedTarget;
          var focusableElement = relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement || !((_this$$el = this.$el) !== null && _this$$el !== void 0 && _this$$el.contains(relatedTarget)) ? utils.DomHandler.getFirstFocusableElement(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_lasthiddenfocusableelement;
          utils.DomHandler.focus(focusableElement);
        },
        onLastHiddenElementFocus: function onLastHiddenElementFocus(event) {
          var _this$$el2;
          var currentTarget = event.currentTarget,
            relatedTarget = event.relatedTarget;
          var focusableElement = relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement || !((_this$$el2 = this.$el) !== null && _this$$el2 !== void 0 && _this$$el2.contains(relatedTarget)) ? utils.DomHandler.getLastFocusableElement(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_firsthiddenfocusableelement;
          utils.DomHandler.focus(focusableElement);
        },
        createHiddenFocusableElements: function createHiddenFocusableElements(el, binding) {
          var _this2 = this;
          var _ref5 = binding.value || {},
            _ref5$tabIndex = _ref5.tabIndex,
            tabIndex = _ref5$tabIndex === void 0 ? 0 : _ref5$tabIndex,
            _ref5$firstFocusableS = _ref5.firstFocusableSelector,
            firstFocusableSelector = _ref5$firstFocusableS === void 0 ? '' : _ref5$firstFocusableS,
            _ref5$lastFocusableSe = _ref5.lastFocusableSelector,
            lastFocusableSelector = _ref5$lastFocusableSe === void 0 ? '' : _ref5$lastFocusableSe;
          var createFocusableElement = function createFocusableElement(onFocus) {
            return utils.DomHandler.createElement('span', {
              "class": 'p-hidden-accessible p-hidden-focusable',
              tabIndex: tabIndex,
              role: 'presentation',
              'aria-hidden': true,
              'data-p-hidden-accessible': true,
              'data-p-hidden-focusable': true,
              onFocus: onFocus === null || onFocus === void 0 ? void 0 : onFocus.bind(_this2)
            });
          };
          var firstFocusableElement = createFocusableElement(this.onFirstHiddenElementFocus);
          var lastFocusableElement = createFocusableElement(this.onLastHiddenElementFocus);
          firstFocusableElement.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElement;
          firstFocusableElement.$_pfocustrap_focusableselector = firstFocusableSelector;
          firstFocusableElement.setAttribute('data-pc-section', 'firstfocusableelement');
          lastFocusableElement.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElement;
          lastFocusableElement.$_pfocustrap_focusableselector = lastFocusableSelector;
          lastFocusableElement.setAttribute('data-pc-section', 'lastfocusableelement');
          el.prepend(firstFocusableElement);
          el.append(lastFocusableElement);
        }
      }
    });

    return FocusTrap;

})(primevue.utils, primevue.basedirective, primevue.focustrap.style);

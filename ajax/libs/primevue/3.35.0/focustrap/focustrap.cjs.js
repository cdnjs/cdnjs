'use strict';

var utils = require('primevue/utils');
var BaseDirective = require('primevue/basedirective');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseDirective__default = /*#__PURE__*/_interopDefaultLegacy(BaseDirective);

var BaseFocusTrap = BaseDirective__default["default"].extend({});

var FocusTrap = BaseFocusTrap.extend('focustrap', {
  mounted: function mounted(el, binding) {
    var _ref = binding.value || {},
      disabled = _ref.disabled;
    if (!disabled) {
      this.createHiddenFocusableElements(el, binding);
      this.bind(el, binding);
      this.autoFocus(el, binding);
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
              return utils.ObjectUtils.isNotEmpty(focusableElement) ? focusableElement : findNextFocusableElement(_el.nextSibling);
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
    autoFocus: function autoFocus(el, binding) {
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

module.exports = FocusTrap;

this.primevue = this.primevue || {};
this.primevue.badgedirective = (function (utils, BadgeDirectiveStyle, BaseDirective) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BadgeDirectiveStyle__default = /*#__PURE__*/_interopDefaultLegacy(BadgeDirectiveStyle);
    var BaseDirective__default = /*#__PURE__*/_interopDefaultLegacy(BaseDirective);

    var BaseBadgeDirective = BaseDirective__default["default"].extend({
      style: BadgeDirectiveStyle__default["default"]
    });

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var BadgeDirective = BaseBadgeDirective.extend('badge', {
      mounted: function mounted(el, binding) {
        var id = utils.UniqueComponentId() + '_badge';
        var badge = utils.DomHandler.createElement('span', {
          id: id,
          "class": !this.isUnstyled() && this.cx('root'),
          'p-bind': this.ptm('root', {
            context: _objectSpread(_objectSpread({}, binding.modifiers), {}, {
              nogutter: String(binding.value).length === 1,
              dot: binding.value == null
            })
          })
        });
        el.$_pbadgeId = badge.getAttribute('id');
        for (var modifier in binding.modifiers) {
          !this.isUnstyled() && utils.DomHandler.addClass(badge, 'p-badge-' + modifier);
        }
        if (binding.value != null) {
          if (_typeof(binding.value) === 'object') el.$_badgeValue = binding.value.value;else el.$_badgeValue = binding.value;
          badge.appendChild(document.createTextNode(el.$_badgeValue));
          if (String(el.$_badgeValue).length === 1 && !this.isUnstyled()) {
            !this.isUnstyled() && utils.DomHandler.addClass(badge, 'p-badge-no-gutter');
          }
        } else {
          !this.isUnstyled() && utils.DomHandler.addClass(badge, 'p-badge-dot');
        }
        el.setAttribute('data-pd-badge', true);
        !this.isUnstyled() && utils.DomHandler.addClass(el, 'p-overlay-badge');
        el.setAttribute('data-p-overlay-badge', 'true');
        el.appendChild(badge);
        this.$el = badge;
      },
      updated: function updated(el, binding) {
        !this.isUnstyled() && utils.DomHandler.addClass(el, 'p-overlay-badge');
        el.setAttribute('data-p-overlay-badge', 'true');
        if (binding.oldValue !== binding.value) {
          var badge = document.getElementById(el.$_pbadgeId);
          if (_typeof(binding.value) === 'object') el.$_badgeValue = binding.value.value;else el.$_badgeValue = binding.value;
          if (!this.isUnstyled()) {
            if (el.$_badgeValue) {
              if (utils.DomHandler.hasClass(badge, 'p-badge-dot')) utils.DomHandler.removeClass(badge, 'p-badge-dot');
              if (el.$_badgeValue.length === 1) utils.DomHandler.addClass(badge, 'p-badge-no-gutter');else utils.DomHandler.removeClass(badge, 'p-badge-no-gutter');
            } else if (!el.$_badgeValue && !utils.DomHandler.hasClass(badge, 'p-badge-dot')) {
              utils.DomHandler.addClass(badge, 'p-badge-dot');
            }
          }
          badge.innerHTML = '';
          badge.appendChild(document.createTextNode(el.$_badgeValue));
        }
      }
    });

    return BadgeDirective;

})(primevue.utils, primevue.badgedirective.style, primevue.basedirective);

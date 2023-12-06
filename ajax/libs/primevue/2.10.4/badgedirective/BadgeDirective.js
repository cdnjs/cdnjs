"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));
var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var BadgeDirective = {
  inserted: function inserted(el, binding) {
    var id = (0, _UniqueComponentId.default)() + '_badge';
    el.$_pbadgeId = id;
    var badge = document.createElement('span');
    badge.id = id;
    badge.className = 'p-badge p-component';
    for (var modifier in binding.modifiers) {
      _DomHandler.default.addClass(badge, 'p-badge-' + modifier);
    }
    if (binding.value != null) {
      badge.appendChild(document.createTextNode(binding.value));
      if (String(binding.value).length === 1) {
        _DomHandler.default.addClass(badge, 'p-badge-no-gutter');
      }
    } else {
      _DomHandler.default.addClass(badge, 'p-badge-dot');
    }
    _DomHandler.default.addClass(el, 'p-overlay-badge');
    el.appendChild(badge);
  },
  update: function update(el, binding) {
    _DomHandler.default.addClass(el, 'p-overlay-badge');
    if (binding.oldValue !== binding.value) {
      var badge = document.getElementById(el.$_pbadgeId);
      if (binding.value) {
        if (_DomHandler.default.hasClass(badge, 'p-badge-dot')) {
          _DomHandler.default.removeClass(badge, 'p-badge-dot');
        }
        if (String(binding.value).length === 1) _DomHandler.default.addClass(badge, 'p-badge-no-gutter');else _DomHandler.default.removeClass(badge, 'p-badge-no-gutter');
      } else if (!binding.value && !_DomHandler.default.hasClass(badge, 'p-badge-dot')) {
        _DomHandler.default.addClass(badge, 'p-badge-dot');
      }
      badge.innerHTML = '';
      badge.appendChild(document.createTextNode(binding.value));
    }
  }
};
var _default = exports.default = BadgeDirective;

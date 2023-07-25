import { UniqueComponentId, DomHandler } from 'primevue/utils';
import BaseDirective from 'primevue/basedirective';
import { useStyle } from 'primevue/usestyle';

var styles = "\n.p-badge {\n    display: inline-block;\n    border-radius: 10px;\n    text-align: center;\n    padding: 0 .5rem;\n}\n\n.p-overlay-badge {\n    position: relative;\n}\n\n.p-overlay-badge .p-badge {\n    position: absolute;\n    top: 0;\n    right: 0;\n    transform: translate(50%,-50%);\n    transform-origin: 100% 0;\n    margin: 0;\n}\n\n.p-badge-dot {\n    width: .5rem;\n    min-width: .5rem;\n    height: .5rem;\n    border-radius: 50%;\n    padding: 0;\n}\n\n.p-badge-no-gutter {\n    padding: 0;\n    border-radius: 50%;\n}\n";
var classes = {
  root: 'p-badge p-component'
};
var _useStyle = useStyle(styles, {
    name: 'badge',
    manual: true
  }),
  loadStyle = _useStyle.load;
var BaseBadgeDirective = BaseDirective.extend({
  css: {
    classes: classes,
    loadStyle: loadStyle
  }
});

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var BadgeDirective = BaseBadgeDirective.extend('badge', {
  mounted: function mounted(el, binding) {
    var _binding$instance$$pr, _binding$value;
    var id = UniqueComponentId() + '_badge';
    el.unstyled = ((_binding$instance$$pr = binding.instance.$primevue) === null || _binding$instance$$pr === void 0 || (_binding$instance$$pr = _binding$instance$$pr.config) === null || _binding$instance$$pr === void 0 ? void 0 : _binding$instance$$pr.unstyled) || ((_binding$value = binding.value) === null || _binding$value === void 0 ? void 0 : _binding$value.unstyled) || false;
    var badge = DomHandler.createElement('span', {
      id: id,
      "class": !el.unstyled && this.cx('root'),
      'p-bind': this.ptm('root')
    });
    el.$_pbadgeId = badge.getAttribute('id');
    for (var modifier in binding.modifiers) {
      !el.unstyled && DomHandler.addClass(badge, 'p-badge-' + modifier);
    }
    if (binding.value != null) {
      if (_typeof(binding.value) === 'object') el.$_badgeValue = binding.value.value;else el.$_badgeValue = binding.value;
      badge.appendChild(document.createTextNode(el.$_badgeValue));
      if (String(el.$_badgeValue).length === 1 && !el.unstyled) {
        !el.unstyled && DomHandler.addClass(badge, 'p-badge-no-gutter');
      }
    } else {
      !el.unstyled && DomHandler.addClass(badge, 'p-badge-dot');
    }
    el.setAttribute('data-pd-badge', true);
    !el.unstyled && DomHandler.addClass(el, 'p-overlay-badge');
    el.setAttribute('data-p-overlay-badge', 'true');
    el.appendChild(badge);
    this.$el = badge;
  },
  updated: function updated(el, binding) {
    !el.unstyled && DomHandler.addClass(el, 'p-overlay-badge');
    el.setAttribute('data-p-overlay-badge', 'true');
    if (binding.oldValue !== binding.value) {
      var badge = document.getElementById(el.$_pbadgeId);
      if (_typeof(binding.value) === 'object') el.$_badgeValue = binding.value.value;else el.$_badgeValue = binding.value;
      if (!el.unstyled) {
        if (el.$_badgeValue) {
          if (DomHandler.hasClass(badge, 'p-badge-dot')) DomHandler.removeClass(badge, 'p-badge-dot');
          if (el.$_badgeValue.length === 1) DomHandler.addClass(badge, 'p-badge-no-gutter');else DomHandler.removeClass(badge, 'p-badge-no-gutter');
        } else if (!el.$_badgeValue && !DomHandler.hasClass(badge, 'p-badge-dot')) {
          DomHandler.addClass(badge, 'p-badge-dot');
        }
      }
      badge.innerHTML = '';
      badge.appendChild(document.createTextNode(el.$_badgeValue));
    }
  }
});

export { BadgeDirective as default };

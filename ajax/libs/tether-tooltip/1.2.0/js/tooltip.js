/*! tether-tooltip 1.1.0 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["tether-drop","tether"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('tether-drop'), require('tether'));
  } else {
    root.Tooltip = factory(root.Drop, root.Tether);
  }
}(this, function(Drop, Tether) {

/* global Tether Drop */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var extend = Tether.Utils.extend;

var _Drop = Drop.createContext({
  classPrefix: 'tooltip'
});

var defaults = {
  position: 'top center',
  openOn: 'hover',
  classes: 'tooltip-theme-arrows',
  constrainToWindow: true,
  constrainToScrollParent: false
};

var tooltipCount = 0;

var Tooltip = (function () {
  function Tooltip(options) {
    _classCallCheck(this, Tooltip);

    this.options = options;

    if (!this.options.target) {
      throw new Error('Tooltip Error: You must provide a target for Tooltip to attach to');
    }

    var position = this.options.target.getAttribute('data-tooltip-position');
    if (position) {
      if (typeof this.options.position === 'undefined') {
        this.options.position = position;
      }
    }

    var content = this.options.target.getAttribute('data-tooltip');

    if (content) {
      if (typeof this.options.content === 'undefined') {
        var contentEl = document.createElement('div');
        contentEl.innerHTML = content;

        // Add ARIA attributes (see #50)
        contentEl.setAttribute('role', 'tooltip');
        contentEl.id = 'drop-tooltip-' + tooltipCount;
        this.options.target.setAttribute('aria-describedby', contentEl.id);
        tooltipCount += 1;

        this.options.content = contentEl;
      }
    }

    if (!this.options.content) {
      throw new Error('Tooltip Error: You must provide content for Tooltip to display');
    }

    this.options = extend({}, defaults, this.options);

    this.drop = new _Drop(this.options);
  }

  _createClass(Tooltip, [{
    key: 'close',
    value: function close() {
      this.drop.close();
    }
  }, {
    key: 'open',
    value: function open() {
      this.drop.open();
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.drop.toggle();
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.drop.remove();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.drop.destroy();
    }
  }, {
    key: 'position',
    value: function position() {
      this.drop.position();
    }
  }]);

  return Tooltip;
})();

var initialized = [];

Tooltip.init = function () {
  var tooltipElements = document.querySelectorAll('[data-tooltip]');
  var len = tooltipElements.length;
  for (var i = 0; i < len; ++i) {
    var el = tooltipElements[i];
    if (initialized.indexOf(el) === -1) {
      new Tooltip({
        target: el
      });
      initialized.push(el);
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  if (Tooltip.autoinit !== false) {
    Tooltip.init();
  }
});
return Tooltip;

}));

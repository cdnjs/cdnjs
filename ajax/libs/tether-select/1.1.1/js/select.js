/*! tether-select 1.1.1 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["tether"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('tether'));
  } else {
    root.Select = factory(root.Tether);
  }
}(this, function(Tether) {

/* global Tether */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Tether$Utils = Tether.Utils;
var extend = _Tether$Utils.extend;
var addClass = _Tether$Utils.addClass;
var removeClass = _Tether$Utils.removeClass;
var hasClass = _Tether$Utils.hasClass;
var getBounds = _Tether$Utils.getBounds;
var Evented = _Tether$Utils.Evented;

var ENTER = 13;
var ESCAPE = 27;
var SPACE = 32;
var UP = 38;
var DOWN = 40;

var touchDevice = ('ontouchstart' in document.documentElement);
var clickEvent = touchDevice ? 'touchstart' : 'click';

function _useNative() {
  var innerWidth = window.innerWidth;
  var innerHeight = window.innerHeight;

  return touchDevice && (innerWidth <= 640 || innerHeight <= 640);
}

function isRepeatedChar(str) {
  return Array.prototype.reduce.call(str, function (a, b) {
    return a === b ? b : false;
  });
}

function getFocusedSelect() {
  var focusedTarget = document.querySelector('.select-target-focused');
  return focusedTarget ? focusedTarget.selectInstance : null;
}

var searchText = '';
var searchTextTimeout = undefined;

document.addEventListener('keypress', function (e) {
  var select = getFocusedSelect();
  if (!select || e.charCode === 0) {
    return;
  }

  if (e.keyCode === SPACE) {
    e.preventDefault();
  }

  clearTimeout(searchTextTimeout);
  searchTextTimeout = setTimeout(function () {
    searchText = '';
  }, 500);

  searchText += String.fromCharCode(e.charCode);

  var options = select.findOptionsByPrefix(searchText);

  if (options.length === 1) {
    // We have an exact match, choose it
    select.selectOption(options[0]);
  }

  if (searchText.length > 1 && isRepeatedChar(searchText)) {
    // They hit the same char over and over, maybe they want to cycle through
    // the options that start with that char
    var repeatedOptions = select.findOptionsByPrefix(searchText[0]);

    if (repeatedOptions.length) {
      var selected = repeatedOptions.indexOf(select.getChosen());

      // Pick the next thing (if something with this prefix wasen't selected
      // we'll end up with the first option)
      selected += 1;
      selected = selected % repeatedOptions.length;

      select.selectOption(repeatedOptions[selected]);
      return;
    }
  }

  if (options.length) {
    // We have multiple things that start with this prefix.  Based on the
    // behavior of native select, this is considered after the repeated case.
    select.selectOption(options[0]);
    return;
  }

  // No match at all, do nothing
});

document.addEventListener('keydown', function (e) {
  // We consider this independently of the keypress handler so we can intercept
  // keys that have built-in functions.
  var select = getFocusedSelect();
  if (!select) {
    return;
  }

  if ([UP, DOWN, ESCAPE].indexOf(e.keyCode) >= 0) {
    e.preventDefault();
  }

  if (select.isOpen()) {
    switch (e.keyCode) {
      case UP:
      case DOWN:
        select.moveHighlight(e.keyCode);
        break;
      case ENTER:
        select.selectHighlightedOption();
        break;
      case ESCAPE:
        select.close();
        select.target.focus();
    }
  } else {
    if ([UP, DOWN, SPACE].indexOf(e.keyCode) >= 0) {
      select.open();
    }
  }
});

var Select = (function (_Evented) {
  _inherits(Select, _Evented);

  function Select(options) {
    _classCallCheck(this, Select);

    _get(Object.getPrototypeOf(Select.prototype), 'constructor', this).call(this, options);
    this.options = extend({}, Select.defaults, options);
    this.select = this.options.el;

    if (typeof this.select.selectInstance !== 'undefined') {
      throw new Error('This element has already been turned into a Select');
    }

    this.update = this.update.bind(this);

    this.setupTarget();
    this.renderTarget();

    this.setupDrop();
    this.renderDrop();

    this.setupSelect();

    this.setupTether();
    this.bindClick();

    this.bindMutationEvents();

    this.value = this.select.value;
  }

  _createClass(Select, [{
    key: 'useNative',
    value: function useNative() {
      var native = this.options.useNative;
      return native === true || _useNative() && native !== false;
    }
  }, {
    key: 'setupTarget',
    value: function setupTarget() {
      var _this = this;

      this.target = document.createElement('a');
      this.target.href = 'javascript:;';

      addClass(this.target, 'select-target');

      var tabIndex = this.select.getAttribute('tabindex') || 0;
      this.target.setAttribute('tabindex', tabIndex);

      if (this.options.className) {
        addClass(this.target, this.options.className);
      }

      this.target.selectInstance = this;

      this.target.addEventListener('click', function () {
        if (!_this.isOpen()) {
          _this.target.focus();
        } else {
          _this.target.blur();
        }
      });

      this.target.addEventListener('focus', function () {
        addClass(_this.target, 'select-target-focused');
      });

      this.target.addEventListener('blur', function (_ref) {
        var relatedTarget = _ref.relatedTarget;

        if (_this.isOpen()) {
          if (relatedTarget && !_this.drop.contains(relatedTarget)) {
            _this.close();
          }
        }

        removeClass(_this.target, 'select-target-focused');
      });

      this.select.parentNode.insertBefore(this.target, this.select.nextSibling);
    }
  }, {
    key: 'setupDrop',
    value: function setupDrop() {
      var _this2 = this;

      this.drop = document.createElement('div');
      addClass(this.drop, 'select');

      if (this.options.className) {
        addClass(this.drop, this.options.className);
      }

      document.body.appendChild(this.drop);

      this.drop.addEventListener('click', function (e) {
        if (hasClass(e.target, 'select-option')) {
          _this2.pickOption(e.target);
        }

        // Built-in selects don't propagate click events in their drop directly
        // to the body, so we don't want to either.
        e.stopPropagation();
      });

      this.drop.addEventListener('mousemove', function (e) {
        if (hasClass(e.target, 'select-option')) {
          _this2.highlightOption(e.target);
        }
      });

      this.content = document.createElement('div');
      addClass(this.content, 'select-content');
      this.drop.appendChild(this.content);
    }
  }, {
    key: 'open',
    value: function open() {
      var _this3 = this;

      addClass(this.target, 'select-open');

      if (this.useNative()) {
        var _event = document.createEvent("MouseEvents");
        _event.initEvent("mousedown", true, true);
        this.select.dispatchEvent(_event);

        return;
      }

      addClass(this.drop, 'select-open');

      setTimeout(function () {
        _this3.tether.enable();
      });

      var selectedOption = this.drop.querySelector('.select-option-selected');

      if (!selectedOption) {
        return;
      }

      this.highlightOption(selectedOption);
      this.scrollDropContentToOption(selectedOption);

      var positionSelectStyle = function positionSelectStyle() {
        if (hasClass(_this3.drop, 'tether-abutted-left') || hasClass(_this3.drop, 'tether-abutted-bottom')) {
          var dropBounds = getBounds(_this3.drop);
          var optionBounds = getBounds(selectedOption);

          var offset = dropBounds.top - (optionBounds.top + optionBounds.height);

          _this3.drop.style.top = (parseFloat(_this3.drop.style.top) || 0) + offset + 'px';
        }
      };

      var alignToHighlighted = this.options.alignToHighlighted;
      var _content = this.content;
      var scrollHeight = _content.scrollHeight;
      var clientHeight = _content.clientHeight;

      if (alignToHighlighted === 'always' || alignToHighlighted === 'auto' && scrollHeight <= clientHeight) {
        setTimeout(function () {
          positionSelectStyle();
        });
      }

      this.trigger('open');
    }
  }, {
    key: 'close',
    value: function close() {
      removeClass(this.target, 'select-open');

      if (this.useNative()) {
        this.select.blur();
      }

      this.tether.disable();

      removeClass(this.drop, 'select-open');

      this.trigger('close');
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.isOpen()) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      return hasClass(this.drop, 'select-open');
    }
  }, {
    key: 'bindClick',
    value: function bindClick() {
      var _this4 = this;

      this.target.addEventListener(clickEvent, function (e) {
        e.preventDefault();
        _this4.toggle();
      });

      document.addEventListener(clickEvent, function (event) {
        if (!_this4.isOpen()) {
          return;
        }

        // Clicking inside dropdown
        if (event.target === _this4.drop || _this4.drop.contains(event.target)) {
          return;
        }

        // Clicking target
        if (event.target === _this4.target || _this4.target.contains(event.target)) {
          return;
        }

        _this4.close();
      });
    }
  }, {
    key: 'setupTether',
    value: function setupTether() {
      this.tether = new Tether(extend({
        element: this.drop,
        target: this.target,
        attachment: 'top left',
        targetAttachment: 'bottom left',
        classPrefix: 'select',
        constraints: [{
          to: 'window',
          attachment: 'together'
        }]
      }, this.options.tetherOptions));
    }
  }, {
    key: 'renderTarget',
    value: function renderTarget() {
      this.target.innerHTML = '';

      var options = this.select.querySelectorAll('option');
      for (var i = 0; i < options.length; ++i) {
        var option = options[i];
        if (option.selected) {
          this.target.innerHTML = option.innerHTML;
          break;
        }
      }

      this.target.appendChild(document.createElement('b'));
    }
  }, {
    key: 'renderDrop',
    value: function renderDrop() {
      var optionList = document.createElement('ul');
      addClass(optionList, 'select-options');

      var options = this.select.querySelectorAll('option');
      for (var i = 0; i < options.length; ++i) {
        var el = options[i];
        var option = document.createElement('li');
        addClass(option, 'select-option');

        option.setAttribute('data-value', el.value);
        option.innerHTML = el.innerHTML;

        if (el.selected) {
          addClass(option, 'select-option-selected');
        }

        optionList.appendChild(option);
      }

      this.content.innerHTML = '';
      this.content.appendChild(optionList);
    }
  }, {
    key: 'update',
    value: function update() {
      this.renderDrop();
      this.renderTarget();
    }
  }, {
    key: 'setupSelect',
    value: function setupSelect() {
      this.select.selectInstance = this;

      addClass(this.select, 'select-select');

      this.select.addEventListener('change', this.update);
    }
  }, {
    key: 'bindMutationEvents',
    value: function bindMutationEvents() {
      if (typeof window.MutationObserver !== 'undefined') {
        this.observer = new MutationObserver(this.update);
        this.observer.observe(this.select, {
          childList: true,
          attributes: true,
          characterData: true,
          subtree: true
        });
      } else {
        this.select.addEventListener('DOMSubtreeModified', this.update);
      }
    }
  }, {
    key: 'findOptionsByPrefix',
    value: function findOptionsByPrefix(text) {
      var options = this.drop.querySelectorAll('.select-option');

      text = text.toLowerCase();

      return Array.prototype.filter.call(options, function (option) {
        return option.innerHTML.toLowerCase().substr(0, text.length) === text;
      });
    }
  }, {
    key: 'findOptionsByValue',
    value: function findOptionsByValue(val) {
      var options = this.drop.querySelectorAll('.select-option');

      return Array.prototype.filter.call(options, function (option) {
        return option.getAttribute('data-value') === val;
      });
    }
  }, {
    key: 'getChosen',
    value: function getChosen() {
      if (this.isOpen()) {
        return this.drop.querySelector('.select-option-highlight');
      }
      return this.drop.querySelector('.select-option-selected');
    }
  }, {
    key: 'selectOption',
    value: function selectOption(option) {
      if (this.isOpen()) {
        this.highlightOption(option);
        this.scrollDropContentToOption(option);
      } else {
        this.pickOption(option, false);
      }
    }
  }, {
    key: 'resetSelection',
    value: function resetSelection() {
      this.selectOption(this.drop.querySelector('.select-option'));
    }
  }, {
    key: 'highlightOption',
    value: function highlightOption(option) {
      var highlighted = this.drop.querySelector('.select-option-highlight');
      if (highlighted) {
        removeClass(highlighted, 'select-option-highlight');
      }

      addClass(option, 'select-option-highlight');

      this.trigger('highlight', { option: option });
    }
  }, {
    key: 'moveHighlight',
    value: function moveHighlight(directionKeyCode) {
      var highlighted = this.drop.querySelector('.select-option-highlight');
      if (!highlighted) {
        this.highlightOption(this.drop.querySelector('.select-option'));
        return;
      }

      var options = this.drop.querySelectorAll('.select-option');

      var highlightedIndex = Array.prototype.indexOf.call(options, highlighted);
      if (!(highlightedIndex >= 0)) {
        return;
      }

      if (directionKeyCode === UP) {
        highlightedIndex -= 1;
      } else {
        highlightedIndex += 1;
      }

      if (highlightedIndex < 0 || highlightedIndex >= options.length) {
        return;
      }

      var newHighlight = options[highlightedIndex];

      this.highlightOption(newHighlight);
      this.scrollDropContentToOption(newHighlight);
    }
  }, {
    key: 'scrollDropContentToOption',
    value: function scrollDropContentToOption(option) {
      var _content2 = this.content;
      var scrollHeight = _content2.scrollHeight;
      var clientHeight = _content2.clientHeight;
      var scrollTop = _content2.scrollTop;

      if (scrollHeight > clientHeight) {
        var contentBounds = getBounds(this.content);
        var optionBounds = getBounds(option);

        this.content.scrollTop = optionBounds.top - (contentBounds.top - scrollTop);
      }
    }
  }, {
    key: 'selectHighlightedOption',
    value: function selectHighlightedOption() {
      this.pickOption(this.drop.querySelector('.select-option-highlight'));
    }
  }, {
    key: 'pickOption',
    value: function pickOption(option) {
      var _this5 = this;

      var close = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      this.value = this.select.value = option.getAttribute('data-value');
      this.triggerChange();

      if (close) {
        setTimeout(function () {
          _this5.close();
          _this5.target.focus();
        });
      }
    }
  }, {
    key: 'triggerChange',
    value: function triggerChange() {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("change", true, false);
      this.select.dispatchEvent(event);

      this.trigger('change', { value: this.select.value });
    }
  }, {
    key: 'change',
    value: function change(val) {
      var options = this.findOptionsByValue(val);

      if (!options.length) {
        throw new Error('Select Error: An option with the value "' + val + '" doesn\'t exist');
      }

      this.pickOption(options[0], false);
    }
  }]);

  return Select;
})(Evented);

Select.defaults = {
  alignToHighlighed: 'auto',
  className: 'select-theme-default'
};

Select.init = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      return Select.init(options);
    });
    return;
  }

  if (typeof options.selector === 'undefined') {
    options.selector = 'select';
  }

  var selectors = document.querySelectorAll(options.selector);
  for (var i = 0; i < selectors.length; ++i) {
    var el = selectors[i];
    if (!el.selectInstance) {
      new Select(extend({ el: el }, options));
    }
  }
};
return Select;

}));

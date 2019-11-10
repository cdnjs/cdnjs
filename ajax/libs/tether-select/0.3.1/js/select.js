(function() {
  var DOWN, ENTER, ESCAPE, Evented, SPACE, Select, UP, addClass, clickEvent, extend, getBounds, getFocusedSelect, hasClass, isRepeatedChar, lastCharacter, removeClass, searchText, searchTextTimeout, touchDevice, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = Tether.Utils, extend = _ref.extend, addClass = _ref.addClass, removeClass = _ref.removeClass, hasClass = _ref.hasClass, getBounds = _ref.getBounds, Evented = _ref.Evented;

  ENTER = 13;

  ESCAPE = 27;

  SPACE = 32;

  UP = 38;

  DOWN = 40;

  touchDevice = 'ontouchstart' in document.documentElement;

  clickEvent = touchDevice ? 'touchstart' : 'click';

  isRepeatedChar = function(str) {
    return Array.prototype.reduce.call(str, function(a, b) {
      if (a === b) {
        return b;
      } else {
        return false;
      }
    });
  };

  getFocusedSelect = function() {
    var _ref1;
    return (_ref1 = document.querySelector('.select-target-focused')) != null ? _ref1.selectInstance : void 0;
  };

  searchText = '';

  searchTextTimeout = void 0;

  lastCharacter = void 0;

  document.addEventListener('keypress', function(e) {
    var options, repeatedOptions, select, selected;
    if (!(select = getFocusedSelect())) {
      return;
    }
    if (e.charCode === 0) {
      return;
    }
    if (e.keyCode === SPACE) {
      e.preventDefault();
    }
    clearTimeout(searchTextTimeout);
    searchTextTimeout = setTimeout(function() {
      return searchText = '';
    }, 500);
    searchText += String.fromCharCode(e.charCode);
    options = select.findOptionsByPrefix(searchText);
    if (options.length === 1) {
      select.selectOption(options[0]);
      return;
    }
    if (searchText.length > 1 && isRepeatedChar(searchText)) {
      repeatedOptions = select.findOptionsByPrefix(searchText[0]);
      if (repeatedOptions.length) {
        selected = repeatedOptions.indexOf(select.getChosen());
        selected += 1;
        selected = selected % repeatedOptions.length;
        select.selectOption(repeatedOptions[selected]);
        return;
      }
    }
    if (options.length) {
      select.selectOption(options[0]);
    }
  });

  document.addEventListener('keydown', function(e) {
    var select, _ref1, _ref2;
    if (!(select = getFocusedSelect())) {
      return;
    }
    if ((_ref1 = e.keyCode) === UP || _ref1 === DOWN || _ref1 === ESCAPE) {
      e.preventDefault();
    }
    if (select.isOpen()) {
      switch (e.keyCode) {
        case UP:
        case DOWN:
          return select.moveHighlight(e.keyCode);
        case ENTER:
          return select.selectHighlightedOption();
        case ESCAPE:
          select.close();
          return select.target.focus();
      }
    } else {
      if ((_ref2 = e.keyCode) === UP || _ref2 === DOWN || _ref2 === SPACE) {
        return select.open();
      }
    }
  });

  Select = (function(_super) {
    __extends(Select, _super);

    Select.defaults = {
      alignToHighlighed: 'auto',
      className: 'select-theme-default'
    };

    function Select(options) {
      this.options = options;
      this.options = extend({}, Select.defaults, this.options);
      this.select = this.options.el;
      if (this.select.selectInstance != null) {
        throw new Error("This element has already been turned into a Select");
      }
      this.setupTarget();
      this.renderTarget();
      this.setupDrop();
      this.renderDrop();
      this.setupSelect();
      this.setupTether();
      this.bindClick();
      this.value = this.select.value;
    }

    Select.prototype.setupTarget = function() {
      var tabIndex,
        _this = this;
      this.target = document.createElement('a');
      this.target.href = 'javascript:;';
      addClass(this.target, 'select-target');
      tabIndex = this.select.getAttribute('tabindex') || 0;
      this.target.setAttribute('tabindex', tabIndex);
      if (this.options.className) {
        addClass(this.target, this.options.className);
      }
      this.target.selectInstance = this;
      this.target.addEventListener('click', function() {
        if (!_this.isOpen()) {
          return _this.target.focus();
        } else {
          return _this.target.blur();
        }
      });
      this.target.addEventListener('focus', function() {
        return addClass(_this.target, 'select-target-focused');
      });
      this.target.addEventListener('blur', function(e) {
        if (_this.isOpen()) {
          if (e.relatedTarget && !_this.drop.contains(e.relatedTarget)) {
            return _this.close();
          }
        } else {
          return removeClass(_this.target, 'select-target-focused');
        }
      });
      this.select.parentNode.insertBefore(this.target, this.select.nextSibling);
      return this.select.style.display = 'none';
    };

    Select.prototype.setupDrop = function() {
      var _this = this;
      this.drop = document.createElement('div');
      addClass(this.drop, 'select');
      if (this.options.className) {
        addClass(this.drop, this.options.className);
      }
      document.body.appendChild(this.drop);
      this.drop.addEventListener('click', function(e) {
        if (hasClass(e.target, 'select-option')) {
          return _this.pickOption(e.target);
        }
      });
      this.drop.addEventListener('mousemove', function(e) {
        if (hasClass(e.target, 'select-option')) {
          return _this.highlightOption(e.target);
        }
      });
      this.content = document.createElement('div');
      addClass(this.content, 'select-content');
      return this.drop.appendChild(this.content);
    };

    Select.prototype.open = function() {
      var positionSelectStyle, selectedOption,
        _this = this;
      addClass(this.drop, 'select-open');
      addClass(this.target, 'select-open');
      setTimeout(function() {
        return _this.tether.enable();
      });
      selectedOption = this.drop.querySelector('.select-option-selected');
      if (!selectedOption) {
        return;
      }
      this.highlightOption(selectedOption);
      this.scrollDropContentToOption(selectedOption);
      positionSelectStyle = function() {
        var dropBounds, offset, optionBounds;
        if (hasClass(_this.drop, 'tether-abutted-left') || hasClass(_this.drop, 'tether-abutted-bottom')) {
          dropBounds = getBounds(_this.drop);
          optionBounds = getBounds(selectedOption);
          offset = dropBounds.top - (optionBounds.top + optionBounds.height);
          return _this.drop.style.top = (parseFloat(_this.drop.style.top) || 0) + offset + 'px';
        }
      };
      if (this.options.alignToHighlighted === 'always' || (this.options.alignToHighlighted === 'auto' && this.content.scrollHeight <= this.content.clientHeight)) {
        setTimeout(positionSelectStyle);
      }
      return this.trigger('open');
    };

    Select.prototype.close = function() {
      this.tether.disable();
      removeClass(this.drop, 'select-open');
      removeClass(this.target, 'select-open');
      return this.trigger('close');
    };

    Select.prototype.toggle = function() {
      if (this.isOpen()) {
        return this.close();
      } else {
        return this.open();
      }
    };

    Select.prototype.isOpen = function() {
      return hasClass(this.drop, 'select-open');
    };

    Select.prototype.bindClick = function() {
      var _this = this;
      this.target.addEventListener(clickEvent, function() {
        return _this.toggle();
      });
      return document.addEventListener(clickEvent, function(event) {
        if (!_this.isOpen()) {
          return;
        }
        if (event.target === _this.drop || _this.drop.contains(event.target)) {
          return;
        }
        if (event.target === _this.target || _this.target.contains(event.target)) {
          return;
        }
        return _this.close();
      });
    };

    Select.prototype.setupTether = function() {
      return this.tether = new Tether({
        element: this.drop,
        target: this.target,
        attachment: 'top left',
        targetAttachment: 'bottom left',
        classPrefix: 'select',
        constraints: [
          {
            to: 'window',
            pin: true,
            attachment: 'together'
          }
        ]
      });
    };

    Select.prototype.renderTarget = function() {
      var option, _i, _len, _ref1;
      this.target.innerHTML = '';
      _ref1 = this.select.querySelectorAll('option');
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        option = _ref1[_i];
        if (option.selected) {
          this.target.innerHTML = option.innerHTML;
          break;
        }
      }
      return this.target.appendChild(document.createElement('b'));
    };

    Select.prototype.renderDrop = function() {
      var el, option, optionList, _i, _len, _ref1;
      optionList = document.createElement('ul');
      addClass(optionList, 'select-options');
      _ref1 = this.select.querySelectorAll('option');
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        el = _ref1[_i];
        option = document.createElement('li');
        addClass(option, 'select-option');
        option.setAttribute('data-value', el.value);
        option.innerHTML = el.innerHTML;
        if (el.selected) {
          addClass(option, 'select-option-selected');
        }
        optionList.appendChild(option);
      }
      this.content.innerHTML = '';
      return this.content.appendChild(optionList);
    };

    Select.prototype.setupSelect = function() {
      var _this = this;
      this.select.selectInstance = this;
      addClass(this.select, 'select-select');
      return this.select.addEventListener('change', function() {
        _this.renderDrop();
        return _this.renderTarget();
      });
    };

    Select.prototype.findOptionsByPrefix = function(text) {
      var options;
      options = this.drop.querySelectorAll('.select-option');
      text = text.toLowerCase();
      return Array.prototype.filter.call(options, function(option) {
        return option.innerHTML.toLowerCase().substr(0, text.length) === text;
      });
    };

    Select.prototype.findOptionsByValue = function(val) {
      var options;
      options = this.drop.querySelectorAll('.select-option');
      return Array.prototype.filter.call(options, function(option) {
        return option.getAttribute('data-value') === val;
      });
    };

    Select.prototype.getChosen = function() {
      if (this.isOpen()) {
        return this.drop.querySelector('.select-option-highlight');
      } else {
        return this.drop.querySelector('.select-option-selected');
      }
    };

    Select.prototype.selectOption = function(option) {
      if (this.isOpen()) {
        this.highlightOption(option);
        return this.scrollDropContentToOption(option);
      } else {
        return this.pickOption(option, false);
      }
    };

    Select.prototype.resetSelection = function() {
      return this.selectOption(this.drop.querySelector('.select-option'));
    };

    Select.prototype.highlightOption = function(option) {
      var highlighted;
      highlighted = this.drop.querySelector('.select-option-highlight');
      if (highlighted != null) {
        removeClass(highlighted, 'select-option-highlight');
      }
      addClass(option, 'select-option-highlight');
      return this.trigger('highlight', {
        option: option
      });
    };

    Select.prototype.moveHighlight = function(directionKeyCode) {
      var highlighted, highlightedIndex, newHighlight, options;
      if (!(highlighted = this.drop.querySelector('.select-option-highlight'))) {
        this.highlightOption(this.drop.querySelector('.select-option'));
        return;
      }
      options = this.drop.querySelectorAll('.select-option');
      highlightedIndex = Array.prototype.indexOf.call(options, highlighted);
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
      newHighlight = options[highlightedIndex];
      this.highlightOption(newHighlight);
      return this.scrollDropContentToOption(newHighlight);
    };

    Select.prototype.scrollDropContentToOption = function(option) {
      var contentBounds, optionBounds;
      if (this.content.scrollHeight > this.content.clientHeight) {
        contentBounds = getBounds(this.content);
        optionBounds = getBounds(option);
        return this.content.scrollTop = optionBounds.top - (contentBounds.top - this.content.scrollTop);
      }
    };

    Select.prototype.selectHighlightedOption = function() {
      return this.pickOption(this.drop.querySelector('.select-option-highlight'));
    };

    Select.prototype.pickOption = function(option, close) {
      var _this = this;
      if (close == null) {
        close = true;
      }
      this.value = this.select.value = option.getAttribute('data-value');
      this.triggerChange();
      if (close) {
        return setTimeout(function() {
          _this.close();
          return _this.target.focus();
        });
      }
    };

    Select.prototype.triggerChange = function() {
      var event;
      event = document.createEvent("HTMLEvents");
      event.initEvent("change", true, false);
      this.select.dispatchEvent(event);
      return this.trigger('change', {
        value: this.select.value
      });
    };

    Select.prototype.change = function(val) {
      var options;
      options = this.findOptionsByValue(val);
      if (!options.length) {
        throw new Error("Select Error: An option with the value \"" + val + "\" doesn't exist");
      }
      return this.pickOption(options[0], false);
    };

    return Select;

  })(Evented);

  Select.init = function(options) {
    var el, _i, _len, _ref1, _results;
    if (options == null) {
      options = {};
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        return Select.init(options);
      });
      return;
    }
    if (options.selector == null) {
      options.selector = 'select';
    }
    _ref1 = document.querySelectorAll(options.selector);
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      el = _ref1[_i];
      if (!el.selectInstance) {
        _results.push(new Select(extend({
          el: el
        }, options)));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  window.Select = Select;

}).call(this);

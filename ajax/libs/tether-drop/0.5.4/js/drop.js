(function() {
  var Evented, MIRROR_ATTACH, addClass, allDrops, clickEvents, createContext, extend, hasClass, removeClass, removeFromArray, sortAttach, touchDevice, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = Tether.Utils, extend = _ref.extend, addClass = _ref.addClass, removeClass = _ref.removeClass, hasClass = _ref.hasClass, Evented = _ref.Evented;

  touchDevice = 'ontouchstart' in document.documentElement;

  clickEvents = ['click'];

  if (touchDevice) {
    clickEvents.push('touchstart');
  }

  sortAttach = function(str) {
    var first, second, _ref1, _ref2;
    _ref1 = str.split(' '), first = _ref1[0], second = _ref1[1];
    if (first === 'left' || first === 'right') {
      _ref2 = [second, first], first = _ref2[0], second = _ref2[1];
    }
    return [first, second].join(' ');
  };

  MIRROR_ATTACH = {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top',
    middle: 'middle',
    center: 'center'
  };

  allDrops = {};

  removeFromArray = function(arr, item) {
    var index, _results;
    _results = [];
    while ((index = arr.indexOf(item)) !== -1) {
      _results.push(arr.splice(index, 1));
    }
    return _results;
  };

  createContext = function(options) {
    var DropInstance, defaultOptions, drop, _name;
    if (options == null) {
      options = {};
    }
    drop = function() {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(DropInstance, arguments, function(){});
    };
    extend(drop, {
      createContext: createContext,
      drops: [],
      defaults: {}
    });
    defaultOptions = {
      classPrefix: 'drop',
      defaults: {
        position: 'bottom left',
        openOn: 'click',
        constrainToScrollParent: true,
        constrainToWindow: true,
        classes: '',
        remove: false,
        tetherOptions: {}
      }
    };
    extend(drop, defaultOptions, options);
    extend(drop.defaults, defaultOptions.defaults, options.defaults);
    if (allDrops[_name = drop.classPrefix] == null) {
      allDrops[_name] = [];
    }
    drop.updateBodyClasses = function() {
      var anyOpen, _drop, _i, _len, _ref1;
      anyOpen = false;
      _ref1 = allDrops[drop.classPrefix];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        _drop = _ref1[_i];
        if (!(_drop.isOpened())) {
          continue;
        }
        anyOpen = true;
        break;
      }
      if (anyOpen) {
        return addClass(document.body, "" + drop.classPrefix + "-open");
      } else {
        return removeClass(document.body, "" + drop.classPrefix + "-open");
      }
    };
    DropInstance = (function(_super) {
      __extends(DropInstance, _super);

      function DropInstance(options) {
        this.options = options;
        this.options = extend({}, drop.defaults, this.options);
        this.target = this.options.target;
        if (this.target == null) {
          throw new Error('Drop Error: You must provide a target.');
        }
        if (this.options.classes) {
          addClass(this.target, this.options.classes);
        }
        drop.drops.push(this);
        allDrops[drop.classPrefix].push(this);
        this._boundEvents = [];
        this.setupElements();
        this.setupEvents();
        this.setupTether();
      }

      DropInstance.prototype._on = function(element, event, handler) {
        this._boundEvents.push({
          element: element,
          event: event,
          handler: handler
        });
        return element.addEventListener(event, handler);
      };

      DropInstance.prototype.setupElements = function() {
        this.drop = document.createElement('div');
        addClass(this.drop, drop.classPrefix);
        if (this.options.classes) {
          addClass(this.drop, this.options.classes);
        }
        this.content = document.createElement('div');
        addClass(this.content, "" + drop.classPrefix + "-content");
        if (typeof this.options.content === 'object') {
          this.content.appendChild(this.options.content);
        } else {
          this.content.innerHTML = this.options.content;
        }
        return this.drop.appendChild(this.content);
      };

      DropInstance.prototype.setupTether = function() {
        var constraints, dropAttach;
        dropAttach = this.options.position.split(' ');
        dropAttach[0] = MIRROR_ATTACH[dropAttach[0]];
        dropAttach = dropAttach.join(' ');
        constraints = [];
        if (this.options.constrainToScrollParent) {
          constraints.push({
            to: 'scrollParent',
            pin: 'top, bottom',
            attachment: 'together none'
          });
        } else {
          constraints.push({
            to: 'scrollParent'
          });
        }
        if (this.options.constrainToWindow !== false) {
          constraints.push({
            to: 'window',
            attachment: 'together'
          });
        } else {
          constraints.push({
            to: 'window'
          });
        }
        options = {
          element: this.drop,
          target: this.target,
          attachment: sortAttach(dropAttach),
          targetAttachment: sortAttach(this.options.position),
          classPrefix: drop.classPrefix,
          offset: '0 0',
          targetOffset: '0 0',
          enabled: false,
          constraints: constraints
        };
        if (this.options.tetherOptions !== false) {
          return this.tether = new Tether(extend({}, options, this.options.tetherOptions));
        }
      };

      DropInstance.prototype.setupEvents = function() {
        var clickEvent, closeHandler, events, onUs, openHandler, out, outTimeout, over, _i, _len,
          _this = this;
        if (!this.options.openOn) {
          return;
        }
        if (this.options.openOn === 'always') {
          setTimeout(this.open.bind(this));
          return;
        }
        events = this.options.openOn.split(' ');
        if (__indexOf.call(events, 'click') >= 0) {
          openHandler = function(event) {
            _this.toggle();
            return event.preventDefault();
          };
          closeHandler = function(event) {
            if (!_this.isOpened()) {
              return;
            }
            if (event.target === _this.drop || _this.drop.contains(event.target)) {
              return;
            }
            if (event.target === _this.target || _this.target.contains(event.target)) {
              return;
            }
            return _this.close();
          };
          for (_i = 0, _len = clickEvents.length; _i < _len; _i++) {
            clickEvent = clickEvents[_i];
            this._on(this.target, clickEvent, openHandler);
            this._on(document, clickEvent, closeHandler);
          }
        }
        if (__indexOf.call(events, 'hover') >= 0) {
          onUs = false;
          over = function() {
            onUs = true;
            return _this.open();
          };
          outTimeout = null;
          out = function() {
            onUs = false;
            if (outTimeout != null) {
              clearTimeout(outTimeout);
            }
            return outTimeout = setTimeout(function() {
              if (!onUs) {
                _this.close();
              }
              return outTimeout = null;
            }, 50);
          };
          this._on(this.target, 'mouseover', over);
          this._on(this.drop, 'mouseover', over);
          this._on(this.target, 'mouseout', out);
          return this._on(this.drop, 'mouseout', out);
        }
      };

      DropInstance.prototype.isOpened = function() {
        return hasClass(this.drop, "" + drop.classPrefix + "-open");
      };

      DropInstance.prototype.toggle = function() {
        if (this.isOpened()) {
          return this.close();
        } else {
          return this.open();
        }
      };

      DropInstance.prototype.open = function() {
        var _ref1, _ref2,
          _this = this;
        if (this.isOpened()) {
          return;
        }
        if (!this.drop.parentNode) {
          document.body.appendChild(this.drop);
        }
        if ((_ref1 = this.tether) != null) {
          _ref1.enable();
        }
        addClass(this.drop, "" + drop.classPrefix + "-open");
        addClass(this.drop, "" + drop.classPrefix + "-open-transitionend");
        setTimeout(function() {
          return addClass(_this.drop, "" + drop.classPrefix + "-after-open");
        });
        if ((_ref2 = this.tether) != null) {
          _ref2.position();
        }
        this.trigger('open');
        return drop.updateBodyClasses();
      };

      DropInstance.prototype.close = function() {
        var handler, _ref1,
          _this = this;
        if (!this.isOpened()) {
          return;
        }
        removeClass(this.drop, "" + drop.classPrefix + "-open");
        removeClass(this.drop, "" + drop.classPrefix + "-after-open");
        this.drop.addEventListener('transitionend', handler = function() {
          if (!hasClass(_this.drop, "" + drop.classPrefix + "-open")) {
            removeClass(_this.drop, "" + drop.classPrefix + "-open-transitionend");
          }
          return _this.drop.removeEventListener('transitionend', handler);
        });
        this.trigger('close');
        if ((_ref1 = this.tether) != null) {
          _ref1.disable();
        }
        drop.updateBodyClasses();
        if (this.options.remove) {
          return this.remove();
        }
      };

      DropInstance.prototype.remove = function() {
        var _ref1;
        this.close();
        return (_ref1 = this.drop.parentNode) != null ? _ref1.removeChild(this.drop) : void 0;
      };

      DropInstance.prototype.position = function() {
        var _ref1;
        if (this.isOpened()) {
          return (_ref1 = this.tether) != null ? _ref1.position() : void 0;
        }
      };

      DropInstance.prototype.destroy = function() {
        var element, event, handler, _i, _len, _ref1, _ref2, _ref3;
        this.remove();
        if ((_ref1 = this.tether) != null) {
          _ref1.destroy();
        }
        _ref2 = this._boundEvents;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          _ref3 = _ref2[_i], element = _ref3.element, event = _ref3.event, handler = _ref3.handler;
          element.removeEventListener(event, handler);
        }
        this._boundEvents = [];
        this.tether = null;
        this.drop = null;
        this.content = null;
        this.target = null;
        removeFromArray(allDrops[drop.classPrefix], this);
        return removeFromArray(drop.drops, this);
      };

      return DropInstance;

    })(Evented);
    return drop;
  };

  window.Drop = createContext();

  document.addEventListener('DOMContentLoaded', function() {
    return Drop.updateBodyClasses();
  });

}).call(this);

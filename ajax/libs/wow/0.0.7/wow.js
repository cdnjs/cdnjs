(function() {
  var extend,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  extend = function(object) {
    var i, key, replacement, result;
    result = object || {};
    i = 1;
    while (i < arguments.length) {
      replacement = arguments[i] || {};
      for (key in replacement) {
        if (typeof result[key] === "object") {
          result[key] = extend(result[key], replacement[key]);
        } else {
          result[key] = result[key] || replacement[key];
        }
      }
      i++;
    }
    return result;
  };

  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = __bind(this.scrollCallback, this);
      this.scrollHandler = __bind(this.scrollHandler, this);
      this.config = extend(options, this.defaults);
      this.visibleCount = 0;
      this.element = window.document.documentElement;
      this.boxes = Array.prototype.slice.call(this.element.getElementsByClassName(this.config.boxClass));
      this.scrolled = true;
    }

    WOW.prototype.init = function() {
      if (this.boxes.length) {
        this.hideAll();
        window.addEventListener('scroll', this.scrollHandler, false);
        return this.interval = setInterval(this.scrollCallback, 50);
      }
    };

    WOW.prototype.stop = function() {
      window.removeEventListener('scroll', this.scrollHandler, false);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.show = function(box) {
      box.style.visibility = 'visible';
      return box.className = "" + box.className + " " + this.config.animateClass;
    };

    WOW.prototype.hideAll = function() {
      var box, _i, _len, _ref, _results;
      _ref = this.boxes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        box = _ref[_i];
        _results.push(box.style.visibility = 'hidden');
      }
      return _results;
    };

    WOW.prototype.scrollHandler = function() {
      return this.scrolled = true;
    };

    WOW.prototype.scrollCallback = function() {
      var i, _i, _ref, _results;
      if (this.scrolled) {
        this.scrolled = false;
        _results = [];
        for (i = _i = 0, _ref = this.boxes.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          if ((this.boxes[i] != null) && this.isVisible(this.boxes[i])) {
            this.show(this.boxes[i]);
            this.boxes[i] = null;
            this.visibleCount++;
            if (this.boxes.length === this.visibleCount) {
              _results.push(this.stop());
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    WOW.prototype.offsetTop = function(element) {
      var top;
      top = element.offsetTop;
      while (element = element.offsetParent) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var bottom, top, viewBottom, viewTop;
      viewTop = window.pageYOffset;
      viewBottom = viewTop + this.element.clientHeight - this.config.offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    return WOW;

  })();

}).call(this);

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
      offset: 0,
      duration: '1s',
      delay: '0s',
      iteration: '1'
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
        this.applyStyle(this.boxes);
        window.addEventListener('scroll', this.scrollHandler, false);
        window.addEventListener('resize', this.scrollHandler, false);
        return this.interval = setInterval(this.scrollCallback, 50);
      }
    };

    WOW.prototype.stop = function() {
      window.removeEventListener('scroll', this.scrollHandler, false);
      window.removeEventListener('resize', this.scrollHandler, false);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.show = function(box) {
      box.style.visibility = 'visible';
      return box.className = "" + box.className + " " + this.config.animateClass;
    };

    WOW.prototype.applyStyle = function() {
      var box, delay, duration, iteration, _i, _len, _ref, _results;
      _ref = this.boxes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        box = _ref[_i];
        duration = box.getAttribute('data-wow-duration') || this.config.duration;
        delay = box.getAttribute('data-wow-delay') || this.config.delay;
        iteration = box.getAttribute('data-wow-iteration') || this.config.iteration;
        _results.push(box.setAttribute('style', this.customStyle(duration, delay, iteration)));
      }
      return _results;
    };

    WOW.prototype.customStyle = function(duration, delay, iteration) {
      var visibility;
      visibility = "visibility: hidden; ";
      duration = ("-webkit-animation-duration: " + duration + "; ") + ("-moz-animation-duration: " + duration + ";") + ("animation-duration: " + duration + "; ");
      delay = ("-moz-animation-delay: " + delay + "; ") + ("-webkit-animation-delay: " + delay + "; ") + ("animation-delay: " + delay + "; ");
      iteration = ("-moz-animation-iteration-count: " + iteration + "; ") + ("-webkit-animation-iteration-count: " + iteration + "; ") + ("animation-iteration-count: " + iteration + "; ");
      return visibility + duration + delay + iteration;
    };

    WOW.prototype.scrollHandler = function() {
      return this.scrolled = true;
    };

    WOW.prototype.scrollCallback = function() {
      var box, i, _i, _len, _ref, _results;
      if (this.scrolled) {
        this.scrolled = false;
        _ref = this.boxes;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          box = _ref[i];
          if ((box != null) && this.isVisible(box)) {
            this.show(box);
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
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute('data-wow-offset') || this.config.offset;
      viewTop = window.pageYOffset;
      viewBottom = viewTop + this.element.clientHeight - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    return WOW;

  })();

}).call(this);

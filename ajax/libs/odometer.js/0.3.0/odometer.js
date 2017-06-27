(function() {
  var COUNT_FRAMERATE, COUNT_MS_PER_FRAME, DIGIT_FORMAT, DIGIT_HTML, DIGIT_SPEEDBOOST, DURATION, FORMAT_MARK_HTML, FRAMERATE, FRAMES_PER_VALUE, MS_PER_FRAME, Odometer, RIBBON_HTML, TRANSITION_END_EVENTS, TRANSITION_SUPPORT, VALUE_HTML, createFromHTML, now, renderTemplate, _ref;

  DIGIT_HTML = '<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner"></span></span>';

  RIBBON_HTML = '<span class="odometer-ribbon"><span class="odometer-ribbon-inner"></span></span>';

  VALUE_HTML = '<span class="odometer-value">{value}</span>';

  FORMAT_MARK_HTML = '<span class="odometer-formatting-mark">{char}</span>';

  DIGIT_FORMAT = ',ddd';

  FRAMERATE = 60;

  DURATION = 2000;

  COUNT_FRAMERATE = 20;

  FRAMES_PER_VALUE = 2;

  DIGIT_SPEEDBOOST = .5;

  MS_PER_FRAME = 1000 / FRAMERATE;

  COUNT_MS_PER_FRAME = 1000 / COUNT_FRAMERATE;

  TRANSITION_END_EVENTS = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';

  TRANSITION_SUPPORT = document.createElement('div').style.transition != null;

  renderTemplate = function(template, ctx) {
    return template.replace(/\{([\s\S]*?)\}/gm, function(match, val) {
      return ctx[val];
    });
  };

  createFromHTML = function(html) {
    var el;
    el = document.createElement('div');
    el.innerHTML = html;
    return el.children[0];
  };

  now = function() {
    var _ref;
    return (_ref = typeof performance !== "undefined" && performance !== null ? performance.now() : void 0) != null ? _ref : +(new Date);
  };

  Odometer = (function() {
    function Odometer(options) {
      var k, property, v, _base, _base1, _base2, _fn, _i, _j, _len, _len1, _ref, _ref1, _ref2,
        _this = this;
      this.options = options;
      _ref = Odometer.options;
      for (v = _i = 0, _len = _ref.length; _i < _len; v = ++_i) {
        k = _ref[v];
        if (this.options[k] == null) {
          this.options[k] = v;
        }
      }
      this.value = this.cleanValue((_ref1 = this.options.value) != null ? _ref1 : '');
      this.el = this.options.el;
      this.inside = document.createElement('div');
      this.inside.className = 'odometer-inside';
      this.el.innerHTML = '';
      this.el.appendChild(this.inside);
      if ((_base = this.options).format == null) {
        _base.format = DIGIT_FORMAT;
      }
      (_base1 = this.options).format || (_base1.format = 'd');
      if ((_base2 = this.options).duration == null) {
        _base2.duration = DURATION;
      }
      this.MAX_VALUES = ((this.options.duration / MS_PER_FRAME) / FRAMES_PER_VALUE) | 0;
      this.render();
      _ref2 = ['HTML', 'Text'];
      _fn = function(property) {
        return Object.defineProperty(_this.el, "inner" + property, {
          get: function() {
            return _this.inside["outer" + property];
          },
          set: function(val) {
            return _this.update(_this.cleanValue(val));
          }
        });
      };
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        property = _ref2[_j];
        _fn(property);
      }
      this;
    }

    Odometer.prototype.cleanValue = function(val) {
      return val.toString().replace(/[.,]/g, '');
    };

    Odometer.prototype.bindTransitionEnd = function() {
      var event, renderEnqueued, _i, _len, _ref, _results,
        _this = this;
      if (this.transitionEndBound) {
        return;
      }
      this.transitionEndBound = true;
      renderEnqueued = false;
      _ref = TRANSITION_END_EVENTS.split(' ');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        _results.push(this.el.addEventListener(event, function() {
          if (renderEnqueued) {
            return true;
          }
          renderEnqueued = true;
          setTimeout(function() {
            _this.render();
            return renderEnqueued = false;
          }, 0);
          return true;
        }));
      }
      return _results;
    };

    Odometer.prototype.resetFormat = function() {
      return this.format = this.options.format.split('').reverse().join('');
    };

    Odometer.prototype.render = function(value) {
      var classes, cls, ctx, digit, newClasses, _i, _j, _len, _len1, _ref, _results;
      if (value == null) {
        value = this.value;
      }
      this.resetFormat();
      this.inside.innerHTML = '';
      classes = this.el.className.split(' ');
      newClasses = [];
      for (_i = 0, _len = classes.length; _i < _len; _i++) {
        cls = classes[_i];
        if (cls.length) {
          if (!/^odometer(-|$)/.test(cls)) {
            newClasses.push(cls);
          }
        }
      }
      newClasses.push('odometer');
      if (!TRANSITION_SUPPORT) {
        newClasses.push('odometer-no-transitions');
      }
      if (this.options.theme) {
        newClasses.push("odometer-theme-" + this.options.theme);
      } else {
        newClasses.push("odometer-auto-theme");
      }
      this.el.className = newClasses.join(' ');
      this.ribbons = {};
      this.digits = [];
      _ref = value.toString().split('').reverse();
      _results = [];
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        digit = _ref[_j];
        ctx = {
          value: digit
        };
        _results.push(this.addDigit(digit));
      }
      return _results;
    };

    Odometer.prototype.update = function(newValue) {
      var diff,
        _this = this;
      if (!(diff = newValue - this.value)) {
        return;
      }
      if (diff > 0) {
        this.el.className += ' odometer-animating-up';
      } else {
        this.el.className += ' odometer-animating-down';
      }
      this.animate(newValue);
      setTimeout(function() {
        _this.el.offsetHeight;
        return _this.el.className += ' odometer-animating';
      }, 0);
      return this.value = newValue;
    };

    Odometer.prototype.renderDigit = function() {
      var digit;
      digit = createFromHTML(renderTemplate(DIGIT_HTML));
      digit.querySelector('.odometer-digit-inner').innerHTML = renderTemplate(RIBBON_HTML);
      return digit;
    };

    Odometer.prototype.insertDigit = function(digit) {
      if (!this.inside.children.length) {
        return this.inside.appendChild(digit);
      } else {
        return this.inside.insertBefore(digit, this.inside.children[0]);
      }
    };

    Odometer.prototype.addDigit = function(value) {
      var char, digit, spacer;
      while (true) {
        if (!this.format.length) {
          this.resetFormat();
        }
        char = this.format.substring(0, 1);
        this.format = this.format.substring(1);
        if (char === 'd') {
          break;
        }
        spacer = createFromHTML(renderTemplate(FORMAT_MARK_HTML, {
          char: char
        }));
        this.insertDigit(spacer);
      }
      digit = this.renderDigit();
      digit.querySelector('.odometer-ribbon-inner').innerHTML = renderTemplate(VALUE_HTML, {
        value: value
      });
      this.digits.push(digit);
      return this.insertDigit(digit);
    };

    Odometer.prototype.animate = function(newValue) {
      if (TRANSITION_SUPPORT) {
        return this.animateSlide(newValue);
      } else {
        return this.animateCount(newValue);
      }
    };

    Odometer.prototype.animateCount = function(newValue) {
      var cur, diff, last, start, tick,
        _this = this;
      if (!(diff = newValue - this.value)) {
        return;
      }
      start = last = now();
      cur = this.value;
      return (tick = function() {
        var delta, dist, fraction;
        if ((now() - start) > _this.options.duration) {
          _this.value = newValue;
          _this.render();
          return;
        }
        delta = now() - last;
        if (delta > COUNT_MS_PER_FRAME) {
          last = now();
          fraction = delta / _this.options.duration;
          dist = diff * fraction;
          cur += dist;
          _this.render(Math.round(cur));
        }
        if (window.requestAnimationFrame) {
          return requestAnimationFrame(tick);
        } else {
          return setTimeout(tick, COUNT_MS_PER_FRAME);
        }
      })();
    };

    Odometer.prototype.animateSlide = function(newValue) {
      var boosted, cur, diff, digitCount, digits, dist, end, frame, frames, i, incr, j, numEl, start, _base, _i, _j, _k, _l, _len, _len1, _ref, _results, _results1;
      if (!(diff = newValue - this.value)) {
        return;
      }
      this.bindTransitionEnd();
      digitCount = Math.ceil(Math.log(Math.max(newValue, this.value)) / Math.log(10));
      digits = [];
      boosted = 0;
      for (i = _i = 0; 0 <= digitCount ? _i < digitCount : _i > digitCount; i = 0 <= digitCount ? ++_i : --_i) {
        start = Math.floor(this.value / Math.pow(10, digitCount - i - 1));
        end = Math.floor(newValue / Math.pow(10, digitCount - i - 1));
        dist = end - start;
        if (Math.abs(dist) > this.MAX_VALUES) {
          frames = [];
          incr = dist / (this.MAX_VALUES + this.MAX_VALUES * boosted * DIGIT_SPEEDBOOST);
          cur = start;
          while ((dist > 0 && cur < end) || (dist < 0 && cur > end)) {
            cur += incr;
            frames.push(Math.round(cur));
          }
          frames.push(end);
          boosted++;
        } else {
          frames = (function() {
            _results = [];
            for (var _j = start; start <= end ? _j <= end : _j >= end; start <= end ? _j++ : _j--){ _results.push(_j); }
            return _results;
          }).apply(this);
        }
        for (i = _k = 0, _len = frames.length; _k < _len; i = ++_k) {
          frame = frames[i];
          frames[i] = frame % 10;
        }
        digits.push(frames);
      }
      _ref = digits.reverse();
      _results1 = [];
      for (i = _l = 0, _len1 = _ref.length; _l < _len1; i = ++_l) {
        frames = _ref[i];
        if (!this.digits[i]) {
          this.addDigit(' ');
        }
        if ((_base = this.ribbons)[i] == null) {
          _base[i] = this.digits[i].querySelector('.odometer-ribbon-inner');
        }
        this.ribbons[i].innerHTML = '';
        if (diff < 0) {
          frames = frames.reverse();
        }
        _results1.push((function() {
          var _len2, _m, _results2;
          _results2 = [];
          for (j = _m = 0, _len2 = frames.length; _m < _len2; j = ++_m) {
            frame = frames[j];
            numEl = createFromHTML(renderTemplate(VALUE_HTML, {
              value: frame
            }));
            this.ribbons[i].appendChild(numEl);
            if (j === frames.length - 1) {
              numEl.className += ' odometer-last-value';
            }
            if (j === 0) {
              _results2.push(numEl.className += ' odometer-first-value');
            } else {
              _results2.push(void 0);
            }
          }
          return _results2;
        }).call(this));
      }
      return _results1;
    };

    return Odometer;

  })();

  Odometer.options = (_ref = window.odometerOptions) != null ? _ref : {};

  Odometer.init = function() {
    var el, elements, _i, _len, _results;
    elements = document.querySelectorAll(Odometer.options.selector || '.odometer');
    _results = [];
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      el = elements[_i];
      _results.push(el.odometer = new Odometer({
        el: el,
        value: el.innerText
      }));
    }
    return _results;
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (Odometer.options.auto !== false) {
      return Odometer.init();
    }
  });

  window.Odometer = Odometer;

}).call(this);

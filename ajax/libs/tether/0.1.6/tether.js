(function() {
  var $, DEBOUNCE, MIRROR_LR, MIRROR_TB, OFFSET_MAP, Tether, addOffset, attachmentToOffset, autoToFixedAttachment, debounce, getScrollParent, isIE, offsetToPx, parseAttachment, parseOffset, position, tethers,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = jQuery;

  isIE = /msie [\w.]+/.test(navigator.userAgent.toLowerCase());

  getScrollParent = function($el) {
    var position, scrollParent;
    position = $el.css('position');
    if (position === 'fixed') {
      return $el;
    }
    scrollParent = void 0;
    if (position === 'absolute' || (isIE && (position === 'static' || position === 'relative'))) {
      scrollParent = $el.parents().filter(function() {
        var _ref;
        return ((_ref = $.css(this, 'position')) === 'relative' || _ref === 'absolute' || _ref === 'fixed') && /(auto|scroll)/.test($.css(this, 'overflow') + $.css(this, 'overflow-y') + $.css(this, 'overflow-x'));
      }).first();
    } else {
      scrollParent = $el.parents().filter(function() {
        return /(auto|scroll)/.test($.css(this, 'overflow') + $.css(this, 'overflow-y') + $.css(this, 'overflow-x'));
      }).first();
    }
    if (scrollParent.length) {
      return scrollParent;
    } else {
      return $('html');
    }
  };

  DEBOUNCE = 16;

  debounce = function(fn, time) {
    var pending;
    if (time == null) {
      time = DEBOUNCE;
    }
    pending = false;
    return function() {
      var args,
        _this = this;
      if (pending) {
        return;
      }
      args = arguments;
      pending = true;
      setTimeout(function() {
        pending = false;
        return fn.apply(_this, args);
      }, time);
      return true;
    };
  };

  tethers = [];

  position = function() {
    var tether, _i, _len;
    for (_i = 0, _len = tethers.length; _i < _len; _i++) {
      tether = tethers[_i];
      tether.position();
    }
    return true;
  };

  if (isIE) {
    position = debounce(position);
  }

  $(window).on('resize scroll', position);

  MIRROR_LR = {
    center: 'center',
    left: 'right',
    right: 'left'
  };

  MIRROR_TB = {
    middle: 'middle',
    top: 'bottom',
    bottom: 'top'
  };

  OFFSET_MAP = {
    top: '0',
    left: '0',
    middle: '50%',
    center: '50%',
    bottom: '100%',
    right: '100%'
  };

  autoToFixedAttachment = function(attachment, relativeToAttachment) {
    var left, top;
    left = attachment.left, top = attachment.top;
    if (left === 'auto') {
      left = MIRROR_LR[relativeToAttachment.left];
    }
    if (top === 'auto') {
      top = MIRROR_TB[relativeToAttachment.top];
    }
    return {
      left: left,
      top: top
    };
  };

  attachmentToOffset = function(attachment) {
    var _ref, _ref1;
    return {
      left: (_ref = OFFSET_MAP[attachment.left]) != null ? _ref : attachment.left,
      top: (_ref1 = OFFSET_MAP[attachment.top]) != null ? _ref1 : attachment.top
    };
  };

  addOffset = function() {
    var left, offsets, out, top, _i, _len, _ref;
    offsets = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    out = {
      top: 0,
      left: 0
    };
    for (_i = 0, _len = offsets.length; _i < _len; _i++) {
      _ref = offsets[_i], top = _ref.top, left = _ref.left;
      if (typeof top === 'string') {
        top = parseFloat(top, 10);
      }
      if (typeof left === 'string') {
        left = parseFloat(left, 10);
      }
      out.top += top;
      out.left += left;
    }
    return out;
  };

  offsetToPx = function(offset, size) {
    if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
      offset.left = parseFloat(offset.left, 10) / 100 * size.width;
    }
    if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
      offset.top = parseFloat(offset.top, 10) / 100 * size.height;
    }
    return offset;
  };

  parseAttachment = parseOffset = function(value) {
    var left, top, _ref;
    _ref = value.split(' '), top = _ref[0], left = _ref[1];
    return {
      top: top,
      left: left
    };
  };

  Tether = (function() {
    Tether.modules = [];

    function Tether(options) {
      this.position = __bind(this.position, this);
      var module, _i, _len, _ref, _ref1;
      tethers.push(this);
      this.history = [];
      this.setOptions(options, false);
      _ref = Tether.modules;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        module = _ref[_i];
        if ((_ref1 = module.initialize) != null) {
          _ref1.call(this);
        }
      }
      this.position();
    }

    Tether.prototype.setOptions = function(options, position) {
      var defaults, _ref, _ref1;
      this.options = options;
      if (position == null) {
        position = true;
      }
      defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto'
      };
      this.options = $.extend(defaults, this.options);
      _ref = this.options, this.element = _ref.element, this.target = _ref.target;
      if (this.element.jquery) {
        this.$element = this.element;
        this.element = this.element[0];
      }
      if (this.target.jquery) {
        this.$target = this.target;
        this.target = this.target[0];
      }
      if (this.$element == null) {
        this.$element = $(this.element);
      }
      if (typeof this.target !== 'string') {
        if (this.$target == null) {
          this.$target = $(this.target);
        }
      }
      this.$element.addClass('tether-element');
      if ((_ref1 = this.$target) != null) {
        _ref1.addClass('tether-target');
      }
      this.targetAttachment = parseAttachment(this.options.targetAttachment);
      this.attachment = parseAttachment(this.options.attachment);
      this.offset = parseOffset(this.options.offset);
      this.targetOffset = parseOffset(this.options.targetOffset);
      if (this.scrollParent != null) {
        this.disable();
      }
      this.scrollParent = getScrollParent($(this.target));
      if (this.options.enabled !== false) {
        return this.enable(position);
      }
    };

    Tether.prototype.getTargetOffset = function() {
      if (typeof this.target === 'string') {
        switch (this.target) {
          case 'viewport':
            return {
              top: pageYOffset,
              left: pageXOffset
            };
          case 'scroll-handle':
            return {
              top: pageYOffset + innerHeight * (pageYOffset / document.body.scrollHeight),
              left: innerWidth - 15
            };
        }
      } else {
        return this.$target.offset();
      }
    };

    Tether.prototype.getTargetSize = function() {
      if (typeof this.target === 'string') {
        switch (this.target) {
          case 'viewport':
            return {
              height: innerHeight,
              width: innerWidth
            };
          case 'scroll-handle':
            return {
              height: innerHeight * 0.98 * (innerHeight / document.body.scrollHeight),
              width: 15
            };
        }
      } else {
        return {
          height: this.cache('target-outerheight', function() {
            return this.$target.outerHeight();
          }),
          width: this.cache('target-outerwidth', function() {
            return this.$target.outerWidth();
          })
        };
      }
    };

    Tether.prototype.clearCache = function() {
      return this._cache = {};
    };

    Tether.prototype.cache = function(k, getter) {
      if (this._cache == null) {
        this._cache = {};
      }
      if (this._cache[k] == null) {
        this._cache[k] = getter.call(this);
      }
      return this._cache[k];
    };

    Tether.prototype.enable = function(position) {
      if (position == null) {
        position = true;
      }
      this.addClass('tether-enabled');
      this.enabled = true;
      this.scrollParent.on('scroll', this.position);
      if (position) {
        return this.position();
      }
    };

    Tether.prototype.disable = function() {
      this.removeClass('tether-enabled');
      this.enabled = false;
      if (this.scrollParent != null) {
        return this.scrollParent.off('scroll', this.position);
      }
    };

    Tether.prototype.destroy = function() {
      var i, tether, _i, _len, _results;
      this.disable();
      _results = [];
      for (i = _i = 0, _len = tethers.length; _i < _len; i = ++_i) {
        tether = tethers[i];
        if (tether === this) {
          tethers.splice(i, 1);
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Tether.prototype.updateAttachClasses = function(elementAttach, targetAttach) {
      var side, sides, _i, _j, _len, _len1;
      if (elementAttach == null) {
        elementAttach = this.attachment;
      }
      if (targetAttach == null) {
        targetAttach = this.targetAttachment;
      }
      sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];
      for (_i = 0, _len = sides.length; _i < _len; _i++) {
        side = sides[_i];
        this.removeClass("tether-element-attached-" + side);
      }
      if (elementAttach.top) {
        this.addClass("tether-element-attached-" + elementAttach.top);
      }
      if (elementAttach.left) {
        this.addClass("tether-element-attached-" + elementAttach.left);
      }
      for (_j = 0, _len1 = sides.length; _j < _len1; _j++) {
        side = sides[_j];
        this.removeClass("tether-target-attached-" + side);
      }
      if (targetAttach.top) {
        this.addClass("tether-target-attached-" + targetAttach.top);
      }
      if (targetAttach.left) {
        return this.addClass("tether-target-attached-" + targetAttach.left);
      }
    };

    Tether.prototype.addClass = function(classes) {
      var _ref;
      this.$element.addClass(classes);
      return (_ref = this.$target) != null ? _ref.addClass(classes) : void 0;
    };

    Tether.prototype.removeClass = function(classes) {
      var _ref;
      this.$element.removeClass(classes);
      return (_ref = this.$target) != null ? _ref.removeClass(classes) : void 0;
    };

    Tether.prototype.position = function() {
      var $offsetParent, elementPos, height, left, manualOffset, manualTargetOffset, module, next, offset, offsetBorder, offsetPosition, ret, scrollLeft, scrollTop, side, targetAttachment, targetOffset, targetPos, top, width, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      if (!this.enabled) {
        return;
      }
      this.clearCache();
      targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);
      this.updateAttachClasses(this.attachment, targetAttachment);
      width = this.cache('element-outerwidth', function() {
        return this.$element.outerWidth();
      });
      height = this.cache('element-outerheight', function() {
        return this.$element.outerHeight();
      });
      offset = offsetToPx(attachmentToOffset(this.attachment), {
        width: width,
        height: height
      });
      targetOffset = offsetToPx(attachmentToOffset(targetAttachment), this.getTargetSize());
      manualOffset = offsetToPx(this.offset, {
        width: width,
        height: height
      });
      manualTargetOffset = offsetToPx(this.targetOffset, this.getTargetSize());
      offset = addOffset(offset, manualOffset);
      targetOffset = addOffset(targetOffset, manualTargetOffset);
      targetPos = this.getTargetOffset();
      elementPos = this.cache('element-offset', function() {
        return this.$element.offset();
      });
      left = targetPos.left + targetOffset.left - offset.left;
      top = targetPos.top + targetOffset.top - offset.top;
      _ref = Tether.modules;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        module = _ref[_i];
        ret = module.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset
        });
        if ((ret == null) || typeof ret !== 'object') {
          continue;
        } else if (ret === false) {
          return false;
        } else {
          top = ret.top, left = ret.left;
        }
      }
      next = {
        page: {
          top: top,
          bottom: document.body.scrollHeight - top - height,
          left: left,
          right: document.body.scrollWidth - left - width
        },
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };
      if (((_ref1 = this.options.optimizations) != null ? _ref1.moveElement : void 0) !== false && (this.$target != null)) {
        $offsetParent = this.cache('target-offsetparent', function() {
          return this.$target.offsetParent();
        });
        offsetPosition = this.cache('target-offsetparent-offset', function() {
          return $offsetParent.offset();
        });
        offsetBorder = {};
        _ref2 = ['top', 'left', 'bottom', 'right'];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          side = _ref2[_j];
          offsetBorder[side] = parseFloat($offsetParent.css("border-" + side + "-width"));
        }
        offsetPosition.left += offsetBorder.left;
        offsetPosition.top += offsetBorder.top;
        offsetPosition.right = document.body.scrollWidth - offsetPosition.left - $offsetParent.width();
        offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - $offsetParent.height();
        if (next.page.top >= offsetPosition.top && next.page.bottom >= offsetPosition.bottom) {
          if (next.page.left >= offsetPosition.left && next.page.right >= offsetPosition.right) {
            scrollTop = $offsetParent.scrollTop();
            scrollLeft = $offsetParent.scrollLeft();
            next.offset = {
              top: next.page.top - offsetPosition.top + scrollTop + offsetBorder.top,
              left: next.page.left - offsetPosition.left + scrollLeft + offsetBorder.left,
              right: next.page.right - offsetPosition.right - scrollLeft + offsetBorder.right,
              bottom: next.page.bottom - offsetPosition.bottom - scrollTop + offsetBorder.bottom
            };
          }
        }
      }
      this.move(next);
      this.history.unshift(next);
      if (this.history.length > 3) {
        this.history.pop();
      }
      return true;
    };

    Tether.prototype.move = function(position) {
      var $offsetParent, css, found, key, moved, offset, point, same, side, transcribe, type, val, write, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      same = {};
      for (type in position) {
        same[type] = {};
        for (key in position[type]) {
          found = false;
          _ref = this.history;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            point = _ref[_i];
            if (((_ref1 = point[type]) != null ? _ref1[key] : void 0) !== position[type][key]) {
              found = true;
              break;
            }
          }
          if (!found) {
            same[type][key] = true;
          }
        }
      }
      css = {
        top: '',
        left: '',
        right: '',
        bottom: ''
      };
      transcribe = function(same, pos) {
        if (same.top) {
          css.top = "" + pos.top + "px";
        } else {
          css.bottom = "" + pos.bottom + "px";
        }
        if (same.left) {
          return css.left = "" + pos.left + "px";
        } else {
          return css.right = "" + pos.right + "px";
        }
      };
      moved = false;
      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, position.page);
      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, position.viewport);
      } else if ((same.offset != null) && (same.offset.top || same.offset.bottom) && (same.offset.left || same.offset.right)) {
        css.position = 'absolute';
        $offsetParent = this.getTargetOffset();
        if (this.$element.offsetParent()[0] !== $offsetParent[0]) {
          this.$element.detach();
          $offsetParent.append(this.$element);
        }
        offset = $.extend({}, position.offset);
        _ref2 = ['top', 'left', 'bottom', 'right'];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          side = _ref2[_j];
          offset[side] -= parseFloat($offsetParent.css("border-" + side + "-width"), 10);
        }
        transcribe(same.offset, offset);
        moved = true;
      } else {
        css.position = 'absolute';
        css.top = "" + position.page.top + "px";
        css.left = "" + position.page.left + "px";
      }
      if (!moved && !this.$element.parent().is('body')) {
        this.$element.detach();
        $(document.body).append(this.$element);
      }
      write = false;
      for (key in css) {
        val = css[key];
        if (this.$element.css(key) !== val) {
          write = true;
          break;
        }
      }
      if (write) {
        return this.$element.css(css);
      }
    };

    return Tether;

  })();

  window.Tether = Tether;

}).call(this);

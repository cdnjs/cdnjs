/* ===========================================================
# bootstrap-tour - v0.8.0
# http://bootstraptour.com
# ==============================================================
# Copyright 2012-2013 Ulrich Sossou
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
*/
(function($, window) {
  var Tour, document;
  document = window.document;
  Tour = (function() {
    function Tour(options) {
      this._options = $.extend({
        name: "tour",
        container: "body",
        keyboard: true,
        storage: window.localStorage,
        debug: false,
        backdrop: false,
        redirect: true,
        orphan: false,
        duration: false,
        basePath: "",
        template: "<div class='popover'>          <div class='arrow'></div>          <h3 class='popover-title'></h3>          <div class='popover-content'></div>          <div class='popover-navigation'>            <div class='btn-group'>              <button class='btn btn-sm btn-default' data-role='prev'>&laquo; Prev</button>              <button class='btn btn-sm btn-default' data-role='next'>Next &raquo;</button>              <button class='btn btn-sm btn-default' data-role='pause-resume'                data-pause-text='Pause'                data-resume-text='Resume'              >Pause</button>            </div>            <button class='btn btn-sm btn-default' data-role='end'>End tour</button>          </div>        </div>",
        afterSetState: function(key, value) {},
        afterGetState: function(key, value) {},
        afterRemoveState: function(key) {},
        onStart: function(tour) {},
        onEnd: function(tour) {},
        onShow: function(tour) {},
        onShown: function(tour) {},
        onHide: function(tour) {},
        onHidden: function(tour) {},
        onNext: function(tour) {},
        onPrev: function(tour) {},
        onPause: function(tour, duration) {},
        onResume: function(tour, duration) {}
      }, options);
      this._force = false;
      this._inited = false;
      this._steps = [];
      this.backdrop = {
        overlay: null,
        $element: null,
        $background: null,
        backgroundShown: false,
        overlayElementShown: false
      };
    }

    Tour.prototype.setState = function(key, value) {
      var e, keyName;
      if (this._options.storage) {
        keyName = "" + this._options.name + "_" + key;
        try {
          this._options.storage.setItem(keyName, value);
        } catch (_error) {
          e = _error;
          if (e.code === DOMException.QUOTA_EXCEEDED_ERR) {
            this.debug("LocalStorage quota exceeded. setState failed.");
          }
        }
        return this._options.afterSetState(keyName, value);
      } else {
        if (this._state == null) {
          this._state = {};
        }
        return this._state[key] = value;
      }
    };

    Tour.prototype.removeState = function(key) {
      var keyName;
      if (this._options.storage) {
        keyName = "" + this._options.name + "_" + key;
        this._options.storage.removeItem(keyName);
        return this._options.afterRemoveState(keyName);
      } else {
        if (this._state != null) {
          return delete this._state[key];
        }
      }
    };

    Tour.prototype.getState = function(key) {
      var keyName, value;
      if (this._options.storage) {
        keyName = "" + this._options.name + "_" + key;
        value = this._options.storage.getItem(keyName);
      } else {
        if (this._state != null) {
          value = this._state[key];
        }
      }
      if (value === void 0 || value === "null") {
        value = null;
      }
      this._options.afterGetState(key, value);
      return value;
    };

    Tour.prototype.addSteps = function(steps) {
      var step, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = steps.length; _i < _len; _i++) {
        step = steps[_i];
        _results.push(this.addStep(step));
      }
      return _results;
    };

    Tour.prototype.addStep = function(step) {
      return this._steps.push(step);
    };

    Tour.prototype.getStep = function(i) {
      if (this._steps[i] != null) {
        return $.extend({
          id: "step-" + i,
          path: "",
          placement: "right",
          title: "",
          content: "<p></p>",
          next: i === this._steps.length - 1 ? -1 : i + 1,
          prev: i - 1,
          animation: true,
          container: this._options.container,
          backdrop: this._options.backdrop,
          redirect: this._options.redirect,
          orphan: this._options.orphan,
          duration: this._options.duration,
          template: this._options.template,
          onShow: this._options.onShow,
          onShown: this._options.onShown,
          onHide: this._options.onHide,
          onHidden: this._options.onHidden,
          onNext: this._options.onNext,
          onPrev: this._options.onPrev,
          onPause: this._options.onPause,
          onResume: this._options.onResume
        }, this._steps[i]);
      }
    };

    Tour.prototype.init = function(force) {
      var _this = this;
      this._force = force;
      if (this.ended()) {
        return this._debug("Tour ended, init prevented.");
      }
      this.setCurrentStep();
      this._setupMouseNavigation();
      this._setupKeyboardNavigation();
      this._onResize(function() {
        return _this.showStep(_this._current);
      });
      if (this._current !== null) {
        this.showStep(this._current);
      }
      this._inited = true;
      return this;
    };

    Tour.prototype.start = function(force) {
      var promise;
      if (force == null) {
        force = false;
      }
      if (!this._inited) {
        this.init(force);
      }
      if (this._current === null) {
        promise = this._makePromise(this._options.onStart != null ? this._options.onStart(this) : void 0);
        return this._callOnPromiseDone(promise, this.showStep, 0);
      }
    };

    Tour.prototype.next = function() {
      var promise;
      if (this.ended()) {
        return this._debug("Tour ended, next prevented.");
      }
      promise = this.hideStep(this._current);
      return this._callOnPromiseDone(promise, this._showNextStep);
    };

    Tour.prototype.prev = function() {
      var promise;
      if (this.ended()) {
        return this._debug("Tour ended, prev prevented.");
      }
      promise = this.hideStep(this._current);
      return this._callOnPromiseDone(promise, this._showPrevStep);
    };

    Tour.prototype.goTo = function(i) {
      var promise;
      if (this.ended()) {
        return this._debug("Tour ended, goTo prevented.");
      }
      promise = this.hideStep(this._current);
      return this._callOnPromiseDone(promise, this.showStep, i);
    };

    Tour.prototype.end = function() {
      var endHelper, promise,
        _this = this;
      endHelper = function(e) {
        $(document).off("click.tour-" + _this._options.name);
        $(document).off("keyup.tour-" + _this._options.name);
        $(window).off("resize.tour-" + _this._options.name);
        _this.setState("end", "yes");
        _this._inited = false;
        _this._force = false;
        _this._clearTimer();
        if (_this._options.onEnd != null) {
          return _this._options.onEnd(_this);
        }
      };
      promise = this.hideStep(this._current);
      return this._callOnPromiseDone(promise, endHelper);
    };

    Tour.prototype.ended = function() {
      return !this._force && !!this.getState("end");
    };

    Tour.prototype.restart = function() {
      this.removeState("current_step");
      this.removeState("end");
      this.setCurrentStep(0);
      return this.start();
    };

    Tour.prototype.pause = function() {
      var step;
      step = this.getStep(this._current);
      if (!(step && step.duration)) {
        return;
      }
      this._paused = true;
      this._duration -= new Date().getTime() - this._start;
      window.clearTimeout(this._timer);
      this._debug("Paused/Stopped step " + (this._current + 1) + " timer (" + this._duration + " remaining).");
      if (step.onPause != null) {
        return step.onPause(this, this._duration);
      }
    };

    Tour.prototype.resume = function() {
      var step,
        _this = this;
      step = this.getStep(this._current);
      if (!(step && step.duration)) {
        return;
      }
      this._paused = false;
      this._start = new Date().getTime();
      this._duration = this._duration || step.duration;
      this._timer = window.setTimeout(function() {
        if (_this._isLast()) {
          return _this.next();
        } else {
          return _this.end();
        }
      }, this._duration);
      this._debug("Started step " + (this._current + 1) + " timer with duration " + this._duration);
      if ((step.onResume != null) && this._duration !== step.duration) {
        return step.onResume(this, this._duration);
      }
    };

    Tour.prototype.hideStep = function(i) {
      var hideStepHelper, promise, step,
        _this = this;
      step = this.getStep(i);
      if (!step) {
        return;
      }
      this._clearTimer();
      promise = this._makePromise(step.onHide != null ? step.onHide(this, i) : void 0);
      hideStepHelper = function(e) {
        var $element;
        $element = $(step.element);
        if (!($element.data("bs.popover") || $element.data("popover"))) {
          $element = $("body");
        }
        $element.popover("destroy");
        if (step.reflex) {
          $element.css("cursor", "").off("click.tour-" + _this._options.name);
        }
        if (step.backdrop) {
          _this._hideBackdrop();
        }
        if (step.onHidden != null) {
          return step.onHidden(_this);
        }
      };
      this._callOnPromiseDone(promise, hideStepHelper);
      return promise;
    };

    Tour.prototype.showStep = function(i) {
      var promise, showStepHelper, skipToPrevious, step,
        _this = this;
      step = this.getStep(i);
      if (!step) {
        return;
      }
      skipToPrevious = i < this._current;
      promise = this._makePromise(step.onShow != null ? step.onShow(this, i) : void 0);
      showStepHelper = function(e) {
        var current_path, path;
        _this.setCurrentStep(i);
        path = $.isFunction(step.path) ? step.path.call() : _this._options.basePath + step.path;
        current_path = [document.location.pathname, document.location.hash].join("");
        if (_this._isRedirect(path, current_path)) {
          _this._redirect(step, path);
          return;
        }
        if (_this._isOrphan(step)) {
          if (!step.orphan) {
            _this._debug("Skip the orphan step " + (_this._current + 1) + ". Orphan option is false and the element doesn't exist or is hidden.");
            if (skipToPrevious) {
              _this._showPrevStep();
            } else {
              _this._showNextStep();
            }
            return;
          }
          _this._debug("Show the orphan step " + (_this._current + 1) + ". Orphans option is true.");
        }
        if (step.backdrop) {
          _this._showBackdrop(!_this._isOrphan(step) ? step.element : void 0);
        }
        _this._scrollIntoView(step.element, function() {
          if ((step.element != null) && step.backdrop) {
            _this._showOverlayElement(step.element);
          }
          _this._showPopover(step, i);
          if (step.onShown != null) {
            step.onShown(_this);
          }
          return _this._debug("Step " + (_this._current + 1) + " of " + _this._steps.length);
        });
        if (step.duration) {
          return _this.resume();
        }
      };
      this._callOnPromiseDone(promise, showStepHelper);
      return promise;
    };

    Tour.prototype.setCurrentStep = function(value) {
      if (value != null) {
        this._current = value;
        this.setState("current_step", value);
      } else {
        this._current = this.getState("current_step");
        this._current = this._current === null ? null : parseInt(this._current, 10);
      }
      return this;
    };

    Tour.prototype._showNextStep = function() {
      var promise, showNextStepHelper, step,
        _this = this;
      step = this.getStep(this._current);
      showNextStepHelper = function(e) {
        return _this.showStep(step.next);
      };
      promise = this._makePromise((step.onNext != null ? step.onNext(this) : void 0));
      return this._callOnPromiseDone(promise, showNextStepHelper);
    };

    Tour.prototype._showPrevStep = function() {
      var promise, showPrevStepHelper, step,
        _this = this;
      step = this.getStep(this._current);
      showPrevStepHelper = function(e) {
        return _this.showStep(step.prev);
      };
      promise = this._makePromise((step.onPrev != null ? step.onPrev(this) : void 0));
      return this._callOnPromiseDone(promise, showPrevStepHelper);
    };

    Tour.prototype._debug = function(text) {
      if (this._options.debug) {
        return window.console.log("Bootstrap Tour '" + this._options.name + "' | " + text);
      }
    };

    Tour.prototype._isRedirect = function(path, currentPath) {
      return (path != null) && path !== "" && path.replace(/\?.*$/, "").replace(/\/?$/, "") !== currentPath.replace(/\/?$/, "");
    };

    Tour.prototype._redirect = function(step, path) {
      if ($.isFunction(step.redirect)) {
        return step.redirect.call(this, path);
      } else if (step.redirect === true) {
        this._debug("Redirect to " + path);
        return document.location.href = path;
      }
    };

    Tour.prototype._isOrphan = function(step) {
      return (step.element == null) || !$(step.element).length || $(step.element).is(":hidden") && ($(step.element)[0].namespaceURI !== "http://www.w3.org/2000/svg");
    };

    Tour.prototype._isLast = function() {
      return this._current < this._steps.length - 1;
    };

    Tour.prototype._showPopover = function(step, i) {
      var $element, $navigation, $template, $tip, isOrphan, options,
        _this = this;
      options = $.extend({}, this._options);
      $template = $.isFunction(step.template) ? $(step.template(i, step)) : $(step.template);
      $navigation = $template.find(".popover-navigation");
      isOrphan = this._isOrphan(step);
      if (isOrphan) {
        step.element = "body";
        step.placement = "top";
        $template = $template.addClass("orphan");
      }
      $element = $(step.element);
      $template.addClass("tour-" + this._options.name);
      if (step.options) {
        $.extend(options, step.options);
      }
      if (step.reflex) {
        $element.css("cursor", "pointer").on("click.tour-" + this._options.name, function() {
          if (_this._isLast()) {
            return _this.next();
          } else {
            return _this.end();
          }
        });
      }
      if (step.prev < 0) {
        $navigation.find("*[data-role=prev]").addClass("disabled");
      }
      if (step.next < 0) {
        $navigation.find("*[data-role=next]").addClass("disabled");
      }
      if (!step.duration) {
        $navigation.find("*[data-role='pause-resume']").remove();
      }
      step.template = $template.clone().wrap("<div>").parent().html();
      $element.popover({
        placement: step.placement,
        trigger: "manual",
        title: step.title,
        content: step.content,
        html: true,
        animation: step.animation,
        container: step.container,
        template: step.template,
        selector: step.element
      }).popover("show");
      $tip = $element.data("bs.popover") ? $element.data("bs.popover").tip() : $element.data("popover").tip();
      $tip.attr("id", step.id);
      this._reposition($tip, step);
      if (isOrphan) {
        return this._center($tip);
      }
    };

    Tour.prototype._reposition = function($tip, step) {
      var offsetBottom, offsetHeight, offsetRight, offsetWidth, originalLeft, originalTop, tipOffset;
      offsetWidth = $tip[0].offsetWidth;
      offsetHeight = $tip[0].offsetHeight;
      tipOffset = $tip.offset();
      originalLeft = tipOffset.left;
      originalTop = tipOffset.top;
      offsetBottom = $(document).outerHeight() - tipOffset.top - $tip.outerHeight();
      if (offsetBottom < 0) {
        tipOffset.top = tipOffset.top + offsetBottom;
      }
      offsetRight = $("html").outerWidth() - tipOffset.left - $tip.outerWidth();
      if (offsetRight < 0) {
        tipOffset.left = tipOffset.left + offsetRight;
      }
      if (tipOffset.top < 0) {
        tipOffset.top = 0;
      }
      if (tipOffset.left < 0) {
        tipOffset.left = 0;
      }
      $tip.offset(tipOffset);
      if (step.placement === "bottom" || step.placement === "top") {
        if (originalLeft !== tipOffset.left) {
          return this._replaceArrow($tip, (tipOffset.left - originalLeft) * 2, offsetWidth, "left");
        }
      } else {
        if (originalTop !== tipOffset.top) {
          return this._replaceArrow($tip, (tipOffset.top - originalTop) * 2, offsetHeight, "top");
        }
      }
    };

    Tour.prototype._center = function($tip) {
      return $tip.css("top", $(window).outerHeight() / 2 - $tip.outerHeight() / 2);
    };

    Tour.prototype._replaceArrow = function($tip, delta, dimension, position) {
      return $tip.find(".arrow").css(position, delta ? 50 * (1 - delta / dimension) + "%" : "");
    };

    Tour.prototype._scrollIntoView = function(element, callback) {
      var $element, $window, offsetTop, scrollTop, windowHeight,
        _this = this;
      if (!element) {
        return callback();
      }
      $element = $(element);
      $window = $(window);
      offsetTop = $element.offset().top;
      windowHeight = $window.height();
      scrollTop = Math.max(0, offsetTop - (windowHeight / 2));
      this._debug("Scroll into view. ScrollTop: " + scrollTop + ". Element offset: " + offsetTop + ". Window height: " + windowHeight + ".");
      return $("body").stop().animate({
        scrollTop: Math.ceil(scrollTop)
      }, function() {
        callback();
        return _this._debug("Scroll into view. Animation end element offset: " + ($element.offset().top) + ". Window height: " + ($window.height()) + ".");
      });
    };

    Tour.prototype._onResize = function(callback, timeout) {
      return $(window).on("resize.tour-" + this._options.name, function() {
        clearTimeout(timeout);
        return timeout = setTimeout(callback, 100);
      });
    };

    Tour.prototype._setupMouseNavigation = function() {
      var _this = this;
      _this = this;
      $(document).off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role=next]:not(.disabled)").on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role=next]:not(.disabled)", function(e) {
        e.preventDefault();
        return _this.next();
      });
      $(document).off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role=prev]:not(.disabled)").on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role=prev]:not(.disabled)", function(e) {
        e.preventDefault();
        return _this.prev();
      });
      $(document).off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role=end]").on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role=end]", function(e) {
        e.preventDefault();
        return _this.end();
      });
      return $(document).off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role=pause-resume]").on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role=pause-resume]", function(e) {
        var $this;
        e.preventDefault();
        $this = $(this);
        $this.text(_this._paused ? $this.data("pause-text") : $this.data("resume-text"));
        if (_this._paused) {
          return _this.resume();
        } else {
          return _this.pause();
        }
      });
    };

    Tour.prototype._setupKeyboardNavigation = function() {
      var _this = this;
      if (!this._options.keyboard) {
        return;
      }
      return $(document).on("keyup.tour-" + this._options.name, function(e) {
        if (!e.which) {
          return;
        }
        switch (e.which) {
          case 39:
            e.preventDefault();
            if (_this._isLast()) {
              return _this.next();
            } else {
              return _this.end();
            }
            break;
          case 37:
            e.preventDefault();
            if (_this._current > 0) {
              return _this.prev();
            }
            break;
          case 27:
            e.preventDefault();
            return _this.end();
        }
      });
    };

    Tour.prototype._makePromise = function(result) {
      if (result && $.isFunction(result.then)) {
        return result;
      } else {
        return null;
      }
    };

    Tour.prototype._callOnPromiseDone = function(promise, cb, arg) {
      var _this = this;
      if (promise) {
        return promise.then(function(e) {
          return cb.call(_this, arg);
        });
      } else {
        return cb.call(this, arg);
      }
    };

    Tour.prototype._showBackdrop = function(element) {
      if (this.backdrop.backgroundShown) {
        return;
      }
      this.backdrop = $("<div/>", {
        "class": "tour-backdrop"
      });
      this.backdrop.backgroundShown = true;
      return $("body").append(this.backdrop);
    };

    Tour.prototype._hideBackdrop = function() {
      this._hideOverlayElement();
      return this._hideBackground();
    };

    Tour.prototype._hideBackground = function() {
      this.backdrop.remove();
      this.backdrop.overlay = null;
      return this.backdrop.backgroundShown = false;
    };

    Tour.prototype._showOverlayElement = function(element) {
      var $background, $element, offset;
      if (this.backdrop.overlayElementShown) {
        return;
      }
      this.backdrop.overlayElementShown = true;
      $element = $(element);
      $background = $("<div/>");
      offset = $element.offset();
      offset.top = offset.top;
      offset.left = offset.left;
      $background.width($element.innerWidth()).height($element.innerHeight()).addClass("tour-step-background").offset(offset);
      $element.addClass("tour-step-backdrop");
      $("body").append($background);
      this.backdrop.$element = $element;
      return this.backdrop.$background = $background;
    };

    Tour.prototype._hideOverlayElement = function() {
      if (!this.backdrop.overlayElementShown) {
        return;
      }
      this.backdrop.$element.removeClass("tour-step-backdrop");
      this.backdrop.$background.remove();
      this.backdrop.$element = null;
      this.backdrop.$background = null;
      return this.backdrop.overlayElementShown = false;
    };

    Tour.prototype._clearTimer = function() {
      window.clearTimeout(this._timer);
      this._timer = null;
      return this._duration = null;
    };

    return Tour;

  })();
  return window.Tour = Tour;
})(jQuery, window);

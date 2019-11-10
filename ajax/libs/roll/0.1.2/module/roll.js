"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x13, _x14, _x15) { var _again = true; _function: while (_again) { var object = _x13, property = _x14, receiver = _x15; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x13 = parent; _x14 = property; _x15 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events').EventEmitter;

/**
 * Roll simply keep tracks of steps' positions inside a viewport.
 * Apart from the static helper functions and the `scroll` function, a roll instance doesn't depend on DOM manipulation.
 * That means you can use a Roll instance in contexts other than DOM.
 */

var Roll = (function (_EventEmitter) {
  _inherits(Roll, _EventEmitter);

  /**
   * Create a new Roll.
   * @param viewSize viewport size (single dimension)
   */

  function Roll(viewSize) {
    _classCallCheck(this, Roll);

    _get(Object.getPrototypeOf(Roll.prototype), "constructor", this).call(this);

    this.viewportSize = viewSize;
    this.paneSize = 0;

    // store the steps object {y1, y2, size, pad}, See Roll.chunk
    this.steps = [];

    this.pos = 0; // current position
    this.current = 0; // current step
    this.last = -1; // last step

    this.movingInterval = -1;
  }

  /**
   * Add a step object. You can also use Roll.chunk() static helper function to create a step object easily.
   * @param s an object with {p1, p2, size, pad} properties, or an array of steps object
   * @returns {Roll}
   */

  _createClass(Roll, [{
    key: "addStep",
    value: function addStep(s) {

      if (!Array.isArray(s)) {
        s = [s];
      }

      // get last recorded step
      var d = s[0].p1;
      if (this.steps.length > 0) {
        var last = this.steps[this.steps.length - 1];
        d = last.p2 + last.pad;
      }

      // append new steps
      for (var i = 0; i < s.length; i++) {
        s[i].p1 = d;
        s[i].p2 = s[i].p1 + s[i].size;
        d = s[i].p2 + s[i].pad;
        this.steps.push(s[i]);
      }

      // recalculate pane size
      this.getHeight(true);

      return this;
    }

    /**
     * Get step by index
     * @param index
     */
  }, {
    key: "getStepAt",
    value: function getStepAt(index) {
      return this.steps[Math.max(0, Math.min(this.steps.length - 1, index))];
    }

    /**
     * Calculate and return current step. When padding > 0, step will be -1 when current progress is on the padding area. This allows you to check progress against padding.
     * @returns {number}
     */
  }, {
    key: "getStep",
    value: function getStep() {
      for (var i = 0; i < this.steps.length; i++) {
        var st = this.steps[i];
        if (st.p1 >= -this.viewportSize && st.p2 <= st.size) {
          this.current = i;
          return i;
        }
      }
      return -1;
    }

    /**
     * Get current progress within the current step
     * @returns 0-1 if step.pad is 0. Otherwise it will range from negative to positive.
     */
  }, {
    key: "getStepProgress",
    value: function getStepProgress() {
      var curr = this.steps[this.current];
      return 1 - curr.p2 / curr.size;
    }

    /**
     * Get current position
     * @returns {number|*}
     */
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this.pos;
    }

    /**
     * Get total height of the pane (including padding)
     * @returns {*}
     */
  }, {
    key: "getHeight",
    value: function getHeight() {
      var recalc = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      if (recalc) this.paneSize = this.steps.reduce(function (a, b) {
        return a + b.size + b.pad;
      }, 0);
      return this.paneSize;
    }

    /**
     * Get viewport's height (same as this.viewportSize)
     * @returns {*}
     */
  }, {
    key: "getViewportHeight",
    value: function getViewportHeight() {
      return this.viewportSize;
    }

    /**
     * Move the roll. This will emit two events `roll(step, currProgress, currPosition, totalProgress)` and `step(curr, last)`
     * @param pos new position
     * @returns {Roll}
     */
  }, {
    key: "move",
    value: function move(pos) {
      var last = this.pos;
      this.pos = -pos;
      var diff = this.pos - last;

      for (var i = 0; i < this.steps.length; i++) {
        var s = this.steps[i];
        s.p1 += diff;
        s.p2 = s.p1 + s.size;
      }

      var curr = this.getStep();
      var progress = this.getStepProgress();
      this.emit("roll", curr, progress, pos, pos / (this.paneSize - this.viewportSize));

      if (curr != this.last && curr >= 0) {
        this.emit("step", curr, this.last, this.viewportSize);
        this.last = curr;
      }

      return this;
    }

    /**
     * Animated scrolling a DOM element
     * @param index step index
     * @param scrollPane a DOM element with scrolling (overflow-y).
     * @param speed optional speed of animated scroll. Defaults to 0.1. Larger is faster
     * @param isVertical optional boolean to indicate horizontal or vertical scroll
     */
  }, {
    key: "scroll",
    value: function scroll(index, scrollPane) {
      var _this = this;

      var speed = arguments.length <= 2 || arguments[2] === undefined ? 0.1 : arguments[2];
      var isVertical = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

      if (!scrollPane || scrollPane.scrollTop == null) throw "scrollPane parameter requires a DOM element with scrollTop property";
      clearInterval(this.movingInterval);
      var _temp = Number.NEGATIVE_INFINITY;
      var dir = isVertical ? "scrollTop" : "scrollLeft";

      this.movingInterval = setInterval(function () {
        var target = _this.getStepAt(index);
        var d = (target.p1 + target.size / 4) * speed;
        scrollPane[dir] += d;
        if (Math.abs(d) < 1 || _temp === scrollPane[dir]) clearInterval(_this.movingInterval);
        _temp = scrollPane[dir];
      }, 17);
    }

    /**
     * A convenient static function to create a step object
     * @param size chunk size
     * @param pad optional padding (default to 0)
     * @returns {{p1: number, p2: *, size: *, pad: number}}
     */
  }], [{
    key: "chunk",
    value: function chunk(size) {
      var pad = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      return {
        p1: 0,
        p2: size,
        size: size,
        pad: pad
      };
    }

    /**
     * A convenient static function to compare a step with current step, and transform it to a name
     * @param step the step to check
     * @param currStep current step
     * @param prev optional class name for step is < currStep. Defaults to "prev"
     * @param next optional class name for step is > currStep. Defaults to "next"
     * @param match optional class name for step = currStep. Defaults to "curr"
     * @returns {string}
     */
  }, {
    key: "stepName",
    value: function stepName(step, currStep) {
      var prev = arguments.length <= 2 || arguments[2] === undefined ? "prev" : arguments[2];
      var next = arguments.length <= 3 || arguments[3] === undefined ? "next" : arguments[3];
      var match = arguments.length <= 4 || arguments[4] === undefined ? "curr" : arguments[4];

      return step === currStep ? match : step < currStep ? prev : next;
    }

    /**
     * Static helper to get a handle function for Roll's "step" event. The handler function will add class names to each step element based on current step value.
     * @param roll a Roll instance
     * @param views a list of DOM elements which are the steps
     * @param prev optional class name for step is < currStep. Defaults to "prev"
     * @param next optional class name for step is > currStep. Defaults to "next"
     * @param match optional class name for step = currStep. Defaults to "curr"
     * @returns {Function}
     */
  }, {
    key: "stepHandler",
    value: function stepHandler(roll, views) {
      var prev = arguments.length <= 2 || arguments[2] === undefined ? "prev" : arguments[2];
      var next = arguments.length <= 3 || arguments[3] === undefined ? "next" : arguments[3];
      var match = arguments.length <= 4 || arguments[4] === undefined ? "curr" : arguments[4];
      var trackTopPos = arguments.length <= 5 || arguments[5] === undefined ? false : arguments[5];

      return function (curr, last, viewportHeight) {
        for (var i = 0; i < roll.steps.length; i++) {
          var cls = Roll.stepName(i, curr, prev, next, match);
          views[i].className = "step " + cls;

          // if steps have different sizes, recalc top position and set style
          if (trackTopPos) {
            var p = cls === prev ? roll.steps[i].size * -1 : cls === next ? viewportHeight : 0;
            views[i].style.top = p + "px";
          }
        }
      };
    }

    /**
     * Static method to create a Roll instance with DOM elements
     * @param viewPortID id of viewport element, which is the parent of the viewPane. eg, "#viewport"
     * @param viewPaneID id of view pane element, eg, "#pane"
     * @param viewBox id of view box element, which is the parent the viewClass elements. eg, "#steps"
     * @param viewClass id of each step or slide element, eg, ".step"
     * @param pad optional padding between steps. Defaults to 0.
     * @returns the roll instance which you can listen for "step" and "roll" event via `roll.on(...)`
     */
  }, {
    key: "DOM",
    value: function DOM(viewPortID, viewPaneID, viewBoxID, viewClass) {
      var pad = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

      var viewport = document.querySelector(viewPortID);
      var viewpane = viewport.querySelector(viewPaneID);
      var viewbox = document.querySelector(viewBoxID);
      var views = viewbox.querySelectorAll(viewClass);

      if (!viewport || !viewpane) throw "Cannot find " + viewPortID + " or " + viewPaneID + " element id.";
      if (!viewClass) throw "Cannot find " + viewClass + " element class name";

      // create roll instance based on viewport element height
      var roll = new Roll(viewport.getBoundingClientRect().height);

      // add each viewClass element as a step
      for (var i = 0; i < views.length; i++) {
        var rect = views[i].getBoundingClientRect();
        roll.addStep(Roll.chunk(rect.height, pad));
      }

      // update viewpane height based on steps
      viewpane.style.height = roll.getHeight() + "px";

      // update viewbox width to account for scrollbar
      viewbox.style.width = viewpane.getBoundingClientRect().width + "px";

      // track scroll
      viewport.addEventListener("scroll", function (evt) {
        roll.move(viewport.scrollTop);
      });

      return roll;
    }
  }]);

  return Roll;
})(EventEmitter);

exports["default"] = Roll;

if (window) window.Roll = Roll;
module.exports = exports["default"];
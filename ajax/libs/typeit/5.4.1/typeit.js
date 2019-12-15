/*!
 *
 *   typeit - The most versatile animated typing utility on the planet.
 *   Author: Alex MacArthur <alex@macarthur.me> (https://macarthur.me)
 *   Version: v5.4.1
 *   URL: https://typeitjs.com
 *   License: GPL-2.0
 *
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.TypeIt = factory());
}(this, (function () { 'use strict';

window.TypeItDefaults = {
  strings: [],
  speed: 100,
  deleteSpeed: undefined,
  lifeLike: true,
  cursor: true,
  cursorChar: "|",
  cursorSpeed: 1000,
  breakLines: true,
  startDelay: 250,
  startDelete: false,
  nextStringDelay: 750,
  loop: false,
  loopDelay: 750,
  html: true,
  autoStart: true,
  callback: function callback() {}
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Instance = function () {
  function Instance(element, id, options) {
    classCallCheck(this, Instance);

    this.timeouts = [];
    this.id = id;
    this.queue = [];
    this.hasStarted = false;
    this.isFrozen = false;
    this.isComplete = false;
    this.isInTag = false;
    this.stringsToDelete = "";
    this.style = "display:inline;position:relative;font:inherit;color:inherit;";
    this.element = element;

    this.setOptions(options, window.TypeItDefaults, false);
    this.init();
  }

  createClass(Instance, [{
    key: "init",
    value: function init() {
      this.checkElement();

      this.options.strings = this.toArray(this.options.strings);
      this.options.strings = this.removeComments(this.options.strings);

      //-- We don't have anything. Get out of here.
      if (this.options.strings.length >= 1 && this.options.strings[0] === "") {
        return;
      }

      this.element.innerHTML = "\n        <span style=\"" + this.style + "\" class=\"ti-container\"></span>\n      ";

      this.element.setAttribute("data-typeitid", this.id);
      this.elementContainer = this.element.querySelector("span");

      if (this.options.startDelete) {
        this.insert(this.stringsToDelete);
        this.queue.push([this.delete]);
        this.insertSplitPause(1);
      }

      this.cursor();
      this.generateQueue();
      this.kickoff();
    }
  }, {
    key: "removeComments",
    value: function removeComments(arrayOfStrings) {
      return arrayOfStrings.map(function (string) {
        return string.replace(/<\!--.*?-->/g, "");
      });
    }
  }, {
    key: "generateQueue",
    value: function generateQueue() {
      var _this = this;

      var initialStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      initialStep = initialStep === null ? [this.pause, this.options.startDelay] : initialStep;

      this.queue.push(initialStep);

      this.options.strings.forEach(function (string, index) {
        _this.queueUpString(string);

        //-- This is not the last string,so insert a pause for between strings.
        if (index + 1 < _this.options.strings.length) {
          if (_this.options.breakLines) {
            _this.queue.push([_this.break]);
            _this.insertSplitPause(_this.queue.length);
          } else {
            _this.queueUpDeletions(string);
            _this.insertSplitPause(_this.queue.length, string.length);
          }
        }
      });
    }

    /**
     * Delete each character from a string.
     */

  }, {
    key: "queueUpDeletions",
    value: function queueUpDeletions() {
      var stringOrNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var number = typeof stringOrNumber === "string" ? stringOrNumber.length : stringOrNumber;

      for (var i = 0; i < number; i++) {
        this.queue.push([this.delete, 1]);
      }
    }

    /**
     * Add steps to the queue for each character in a given string.
     */

  }, {
    key: "queueUpString",
    value: function queueUpString(string) {
      var rake = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!string) return;

      string = this.toArray(string);

      var doc = document.implementation.createHTMLDocument();
      doc.body.innerHTML = string;

      //-- If it's designated, rake that bad boy for HTML tags and stuff.
      if (rake) {
        string = this.rake(string);
        string = string[0];
      }

      //-- If an opening HTML tag is found and we're not already printing inside a tag
      if (this.options.html && string[0].startsWith("<") && !string[0].startsWith("</")) {
        //-- Create node of that string name.
        var matches = string[0].match(/\<(.*?)\>/);
        var _doc = document.implementation.createHTMLDocument();
        _doc.body.innerHTML = "<" + matches[1] + "></" + matches[1] + ">";

        //-- Add to the queue.
        this.queue.push([this.type, _doc.body.children[0]]);
      } else {
        this.queue.push([this.type, string[0]]);
      }

      //-- Shorten it by one character.
      string.splice(0, 1);

      //-- If there's more to it, run again until fully printed.
      if (string.length) {
        this.queueUpString(string, false);
      }
    }

    /**
     * Insert a split pause around a range of queue items.
     *
     * @param  {Number} startPosition The position at which to start wrapping.
     * @param  {Number} numberOfActionsToWrap The number of actions in the queue to wrap.
     * @return {void}
     */

  }, {
    key: "insertSplitPause",
    value: function insertSplitPause(startPosition) {
      var numberOfActionsToWrap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var halfDelay = this.options.nextStringDelay / 2;
      this.queue.splice(startPosition, 0, [this.pause, halfDelay]);
      this.queue.splice(startPosition - numberOfActionsToWrap, 0, [this.pause, halfDelay]);
    }
  }, {
    key: "kickoff",
    value: function kickoff() {
      if (this.options.autoStart) {
        this.hasStarted = true;
        this.next();
        return;
      }

      if (this.isVisible()) {
        this.hasStarted = true;
        this.next();
        return;
      }

      var that = this;

      window.addEventListener("scroll", function checkForStart(event) {
        if (that.isVisible() && !that.hasStarted) {
          that.hasStarted = true;
          that.next();
          event.currentTarget.removeEventListener(event.type, checkForStart);
        }
      });
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      var coordinates = this.element.getBoundingClientRect();

      var viewport = {
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      };

      //-- Element extends outside of viewport.
      if (coordinates.right > viewport.width || coordinates.bottom > viewport.height) {
        return false;
      }

      //-- Top or left aren't visible.
      if (coordinates.top < 0 || coordinates.left < 0) {
        return false;
      }

      return true;
    }
  }, {
    key: "cursor",
    value: function cursor() {
      var visibilityStyle = "visibility: hidden;";

      if (this.options.cursor) {
        var styleBlock = document.createElement("style");

        styleBlock.id = this.id;

        var styles = "\n            @keyframes blink-" + this.id + " {\n              0% {opacity: 0}\n              49% {opacity: 0}\n              50% {opacity: 1}\n            }\n\n            [data-typeitid='" + this.id + "'] .ti-cursor {\n              animation: blink-" + this.id + " " + this.options.cursorSpeed / 1000 + "s infinite;\n            }\n          ";

        styleBlock.appendChild(document.createTextNode(styles));

        document.head.appendChild(styleBlock);

        visibilityStyle = "";
      }

      this.element.insertAdjacentHTML("beforeend", "<span style=\"" + this.style + visibilityStyle + "\" class=\"ti-cursor\">" + this.options.cursorChar + "</span>");
    }

    /**
     * Inserts string to element container.
     */

  }, {
    key: "insert",
    value: function insert(content) {
      var toChildNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (toChildNode) {
        this.elementContainer.lastChild.insertAdjacentHTML("beforeend", content);
      } else {
        this.elementContainer.insertAdjacentHTML("beforeend", content);
      }

      //-- Split & rejoin to avoid odd spacing issues in some browsers.
      this.elementContainer.innerHTML = this.elementContainer.innerHTML.split("").join("");
    }

    /**
     * Converts a string to an array, if it's not already.
     *
     * @return array
     */

  }, {
    key: "toArray",
    value: function toArray$$1(string) {
      return string.constructor === Array ? string.slice(0) : string.split("<br>");
    }

    /**
     * Depending on if we're starting by deleting an existing string or typing
     * from nothing, set a specific variable to what's in the HTML.
     */

  }, {
    key: "checkElement",
    value: function checkElement() {
      if (!this.options.startDelete && this.element.innerHTML.length > 0) {
        this.options.strings = this.element.innerHTML.trim();
      } else {
        this.stringsToDelete = this.element.innerHTML;
      }
    }
  }, {
    key: "break",
    value: function _break() {
      this.insert("<br>");
      this.next();
    }
  }, {
    key: "pause",
    value: function pause(time) {
      var _this2 = this;

      setTimeout(function () {
        _this2.next();
      }, time === undefined ? this.options.nextStringDelay : time);
    }

    /*
      Convert each string in the array to a sub-array. While happening, search the subarrays for HTML tags.
      When a complete tag is found, slice the subarray to get the complete tag, insert it at the correct index,
      and delete the range of indexes where the indexed tag used to be.
    */

  }, {
    key: "rake",
    value: function rake(array) {
      var _this3 = this;

      return array.map(function (item) {
        //-- Convert string to array.
        item = item.split("");

        //-- If we're parsing HTML, group tags into their own array items.
        if (_this3.options.html) {
          var tPosition = [];
          var tag = void 0;
          var isEntity = false;

          for (var j = 0; j < item.length; j++) {
            if (item[j] === "<" || item[j] === "&") {
              tPosition[0] = j;
              isEntity = item[j] === "&";
            }

            if (item[j] === ">" || item[j] === ";" && isEntity) {
              tPosition[1] = j;
              j = 0;
              tag = item.slice(tPosition[0], tPosition[1] + 1).join("");
              item.splice(tPosition[0], tPosition[1] - tPosition[0] + 1, tag);
              isEntity = false;
            }
          }
        }

        return item;
      });
    }
  }, {
    key: "type",
    value: function type(character) {
      var _this4 = this;

      this.setPace();

      this.timeouts[0] = setTimeout(function () {
        //-- We must have an HTML tag!
        if (typeof character !== "string") {
          character.innerHTML = "";
          _this4.elementContainer.appendChild(character);
          _this4.isInTag = true;
          _this4.next();
          return;
        }

        //-- When we hit the end of the tag, turn it off!
        if (character.startsWith("</")) {
          _this4.isInTag = false;
          _this4.next();
          return;
        }

        _this4.insert(character, _this4.isInTag);

        _this4.next();
      }, this.typePace);
    }

    /**
     * Removes helper elements with certain classes from the TypeIt element.
     */

  }, {
    key: "removeHelperElements",
    value: function removeHelperElements() {
      var _this5 = this;

      var helperElements = this.element.querySelectorAll(".ti-container, .ti-cursor");

      [].forEach.call(helperElements, function (helperElement) {
        _this5.element.removeChild(helperElement);
      });
    }
  }, {
    key: "setOptions",
    value: function setOptions(settings) {
      var defaults$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var autonext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var mergedSettings = {};

      if (defaults$$1 === null) {
        defaults$$1 = this.options;
      }

      for (var attrname in defaults$$1) {
        mergedSettings[attrname] = defaults$$1[attrname];
      }

      for (var _attrname in settings) {
        mergedSettings[_attrname] = settings[_attrname];
      }

      this.options = mergedSettings;

      if (autonext) {
        this.next();
      }
    }
  }, {
    key: "randomInRange",
    value: function randomInRange(value, range) {
      return Math.abs(Math.random() * (value + range - (value - range)) + (value - range));
    }
  }, {
    key: "setPace",
    value: function setPace() {
      var typeSpeed = this.options.speed;
      var deleteSpeed = this.options.deleteSpeed !== undefined ? this.options.deleteSpeed : this.options.speed / 3;
      var typeRange = typeSpeed / 2;
      var deleteRange = deleteSpeed / 2;

      this.typePace = this.options.lifeLike ? this.randomInRange(typeSpeed, typeRange) : typeSpeed;
      this.deletePace = this.options.lifeLike ? this.randomInRange(deleteSpeed, deleteRange) : deleteSpeed;
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this6 = this;

      var chars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.timeouts[1] = setTimeout(function () {
        _this6.setPace();

        var textArray = _this6.elementContainer.innerHTML.split("");

        for (var n = textArray.length - 1; n > -1; n--) {
          if ((textArray[n] === ">" || textArray[n] === ";") && _this6.options.html) {
            for (var o = n; o > -1; o--) {
              if (textArray.slice(o - 3, o + 1).join("") === "<br>") {
                textArray.splice(o - 3, 4);
                break;
              }

              if (textArray[o] === "&") {
                textArray.splice(o, n - o + 1);
                break;
              }

              if (textArray[o] === "<") {
                if (textArray[o - 1] !== ">") {
                  if (textArray[o - 1] === ";") {
                    for (var p = o - 1; p > -1; p--) {
                      if (textArray[p] === "&") {
                        textArray.splice(p, o - p);
                        break;
                      }
                    }
                  }

                  textArray.splice(o - 1, 1);
                  break;
                }
              }
            }
            break;
          } else {
            textArray.pop();
            break;
          }
        }

        //-- If we've found an empty set of HTML tags...
        if (_this6.elementContainer.innerHTML.indexOf("></") > -1) {
          for (var i = _this6.elementContainer.innerHTML.indexOf("></") - 2; i >= 0; i--) {
            if (textArray[i] === "<") {
              textArray.splice(i, textArray.length - i);
              break;
            }
          }
        }

        //-- Make the content a string again, AND strip out any empty HTML tags.
        //-- We want do strip empty tags here and ONLY here because when we're
        //-- typing new content inside an HTML tag, there is momentarily an empty
        //-- tag we want to keep.
        _this6.elementContainer.innerHTML = textArray.join("").replace(/<[^\/>][^>]*><\/[^>]+>/, "");

        //-- Delete again! Don't call directly, to respect possible pauses.
        if (chars === null) {
          _this6.queue.unshift([_this6.delete, textArray.length]);
        }

        if (chars > 1) {
          _this6.queue.unshift([_this6.delete, chars - 1]);
        }

        _this6.next();
      }, this.deletePace);
    }

    /*
      Empty the existing text, clearing it instantly.
    */

  }, {
    key: "empty",
    value: function empty() {
      this.elementContainer.innerHTML = "";
      this.next();
    }
  }, {
    key: "next",
    value: function next() {
      var _this7 = this;

      if (this.isFrozen) {
        return;
      }

      //-- We haven't reached the end of the queue, go again.
      if (this.queue.length > 0) {
        var thisStep = this.queue[0];
        this.queue.shift();
        thisStep[0].call(this, thisStep[1]);
        return;
      }

      this.options.callback();

      if (this.options.loop) {
        this.queueUpDeletions(this.elementContainer.innerHTML);
        this.generateQueue([this.pause, this.options.loopDelay / 2]);

        setTimeout(function () {
          _this7.next();
        }, this.options.loopDelay / 2);
      } else {
        this.isComplete = true;
      }
    }
  }]);
  return Instance;
}();

var TypeIt = function () {
  function TypeIt(element, args) {
    classCallCheck(this, TypeIt);

    this.id = this.generateHash();
    this.instances = [];
    this.elements = [];
    this.args = args;

    if ((typeof element === "undefined" ? "undefined" : _typeof(element)) === "object") {
      //-- There's only one!
      if (element.length === undefined) {
        this.elements.push(element);
      } else {
        //-- It's already an array!
        this.elements = element;
      }
    }

    //-- Convert to array of elements.
    if (typeof element === "string") {
      this.elements = document.querySelectorAll(element);
    }

    this.createInstances();
  }

  createClass(TypeIt, [{
    key: "generateHash",
    value: function generateHash() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
  }, {
    key: "createInstances",
    value: function createInstances() {
      var _this = this;

      [].slice.call(this.elements).forEach(function (element) {
        _this.instances.push(new Instance(element, _this.id, _this.args));
      });
    }
  }, {
    key: "pushAction",
    value: function pushAction(func) {
      var argument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      this.instances.forEach(function (instance) {
        instance.queue.push([instance[func], argument]);

        if (instance.isComplete === true) {
          instance.next();
        }
      });
    }

    /**
     * If used after typing has started, will append strings to the end of the existing queue. If used when typing is paused, will restart it.
     *
     * @param  {string} string The string to be typed.
     * @return {object} TypeIt instance
     */

  }, {
    key: "type",
    value: function type() {
      var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

      this.instances.forEach(function (instance) {
        //-- Queue up a string right off the bat.
        instance.queueUpString(string);

        if (instance.isComplete === true) {
          instance.next();
        }
      });

      return this;
    }

    /**
     * If null is passed, will delete whatever's currently in the element.
     *
     * @param  { number } numCharacters Number of characters to delete.
     * @return { TypeIt }
     */

  }, {
    key: "delete",
    value: function _delete() {
      var numCharacters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.pushAction("delete", numCharacters);
      return this;
    }
  }, {
    key: "freeze",
    value: function freeze() {
      this.instances.forEach(function (instance) {
        instance.isFrozen = true;
      });
    }
  }, {
    key: "unfreeze",
    value: function unfreeze() {
      this.instances.forEach(function (instance) {
        if (!instance.isFrozen) return;

        instance.isFrozen = false;
        instance.next();
      });
    }
  }, {
    key: "pause",
    value: function pause() {
      var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.pushAction("pause", ms);
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var removeCursor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.instances.forEach(function (instance) {
        instance.timeouts.forEach(function (timeout) {
          clearTimeout(timeout);
        });

        if (removeCursor) {
          instance.element.removeChild(instance.element.querySelector(".ti-cursor"));
        }
      });

      this.instances = [];
    }
  }, {
    key: "empty",
    value: function empty() {
      this.pushAction("empty");
      return this;
    }
  }, {
    key: "break",
    value: function _break() {
      this.pushAction("break");
      return this;
    }
  }, {
    key: "options",
    value: function options(_options) {
      this.pushAction("setOptions", _options);
      return this;
    }
  }, {
    key: "isComplete",
    get: function get$$1() {
      return this.instances[0].isComplete;
    }
  }]);
  return TypeIt;
}();

return TypeIt;

})));
